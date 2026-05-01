import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import db, { initDb } from './database/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize DB
  initDb();

  app.use(cors());
  app.use(express.json());

  // API ROUTES
  
app.post('/api/onboard', (req, res) => {
  const { business, owner } = req.body;

  const businessId = uuidv4();
  const ownerId = uuidv4();

  try {
    // Create business
    const insertBusiness = db.prepare(`
      INSERT INTO businesses (
        id,
        name,
        owner_name,
        email,
        phone,
        address
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insertBusiness.run(
      businessId,
      business.name,
      business.ownerName,
      business.email,
      business.phone,
      business.address
    );

    // Create owner
    const insertOwner = db.prepare(`
      INSERT INTO users (
        id,
        business_id,
        full_name,
        role,
        email,
        phone,
        pin
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insertOwner.run(
      ownerId,
      businessId,
      owner.fullName,
      'owner',
      owner.email,
      owner.phone,
      owner.pin
    );

    // Fetch newly created records
    const createdBusiness = db
      .prepare('SELECT * FROM businesses WHERE id = ?')
      .get(businessId);

    const createdOwner = db
      .prepare(`
        SELECT
          id,
          business_id,
          full_name,
          role,
          profile_picture_path
        FROM users
        WHERE id = ?
      `)
      .get(ownerId);

    // IMPORTANT FIX
    res.json({
      success: true,
      business: createdBusiness,
      owner: createdOwner,
      token: uuidv4(),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to onboard business',
    });
  }
});

  app.post('/api/login', (req, res) => {
    const { userId, pin } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE id = ? AND pin = ? AND is_active = 1').get(userId, pin);
    if (user) {
      const business = db.prepare('SELECT * FROM businesses WHERE id = ?').get(user.business_id);
      res.json({ success: true, user, business });
    } else {
      res.status(401).json({ error: 'Invalid PIN' });
    }
  });

  app.get('/api/users/:businessId', (req, res) => {
    const users = db.prepare('SELECT id, full_name, role, profile_picture_path FROM users WHERE business_id = ? AND is_active = 1').all(req.params.businessId);
    res.json(users);
  });

  // Products
  app.get('/api/products/:businessId', (req, res) => {
    const products = db.prepare(`
      SELECT p.*, SUM(pb.quantity) as total_stock
      FROM products p
      LEFT JOIN product_batches pb ON p.id = pb.product_id
      WHERE p.business_id = ?
      GROUP BY p.id
    `).all(req.params.businessId);
    res.json(products);
  });

  app.post('/api/products', (req, res) => {
    const { businessId, name, sku, category, unit, costPrice, sellingPrice, lowStockThreshold, initialBatch } = req.body;
    const productId = uuidv4();
    
    try {
      const insertProduct = db.prepare(`
        INSERT INTO products (id, business_id, name, sku, category, unit, cost_price, selling_price, low_stock_threshold)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      insertProduct.run(productId, businessId, name, sku, category, unit, costPrice, sellingPrice, lowStockThreshold);

      if (initialBatch) {
        const batchId = uuidv4();
        const insertBatch = db.prepare(`
          INSERT INTO product_batches (id, product_id, batch_number, quantity, expiry_date, manufactured_date)
          VALUES (?, ?, ?, ?, ?, ?)
        `);
        insertBatch.run(batchId, productId, initialBatch.number, initialBatch.quantity, initialBatch.expiryDate, initialBatch.manufacturedDate);
      }

      res.json({ success: true, productId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add product' });
    }
  });

  // Sales
  app.post('/api/sales', (req, res) => {
    const { businessId, userId, items, totalAmount, discount, tax, paymentMethod } = req.body;
    const saleId = uuidv4();

    try {
      const transaction = db.transaction(() => {
        const insertSale = db.prepare(`
          INSERT INTO sales (id, business_id, user_id, total_amount, discount, tax, payment_method)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        insertSale.run(saleId, businessId, userId, totalAmount, discount, tax, paymentMethod);

        for (const item of items) {
          // FIFO Batch deduction
          let remainingQty = item.quantity;
          const batches = db.prepare('SELECT * FROM product_batches WHERE product_id = ? AND quantity > 0 ORDER BY created_at ASC').all(item.productId);
          
          for (const batch of batches) {
            if (remainingQty <= 0) break;
            const deduct = Math.min(batch.quantity, remainingQty);
            
            db.prepare('UPDATE product_batches SET quantity = quantity - ? WHERE id = ?').run(deduct, batch.id);
            
            db.prepare(`
              INSERT INTO sale_items (id, sale_id, product_id, batch_id, quantity, unit_price, subtotal)
              VALUES (?, ?, ?, ?, ?, ?, ?)
            `).run(uuidv4(), saleId, item.productId, batch.id, deduct, item.unitPrice, deduct * item.unitPrice);
            
            remainingQty -= deduct;
          }
        }
      });

      transaction();
      res.json({ success: true, saleId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to complete sale' });
    }
  });

  // Stats for Dashboard
  app.get('/api/dashboard/:businessId', (req, res) => {
    const businessId = req.params.businessId;
    const today = new Date().toISOString().split('T')[0];
    
    const todaySales = db.prepare("SELECT SUM(total_amount) as total FROM sales WHERE business_id = ? AND date(created_at) = date('now')").get(businessId)?.total || 0;
    const totalTransactions = db.prepare("SELECT COUNT(*) as count FROM sales WHERE business_id = ? AND date(created_at) = date('now')").get(businessId)?.count || 0;
    const lowStockCount = db.prepare(`
      SELECT COUNT(*) as count FROM (
        SELECT p.id FROM products p 
        LEFT JOIN product_batches pb ON p.id = pb.product_id
        WHERE p.business_id = ?
        GROUP BY p.id
        HAVING SUM(pb.quantity) <= p.low_stock_threshold
      )
    `).get(businessId)?.count || 0;

    const salesHistory = db.prepare(`
      SELECT date(created_at) as date, SUM(total_amount) as total
      FROM sales
      WHERE business_id = ?
      GROUP BY date(created_at)
      ORDER BY date DESC
      LIMIT 7
    `).all(businessId);

    const recentSales = db.prepare(`
      SELECT s.*, u.full_name as cashier
      FROM sales s
      JOIN users u ON s.user_id = u.id
      WHERE s.business_id = ?
      ORDER BY s.created_at DESC
      LIMIT 10
    `).all(businessId);

    res.json({
      todaySales,
      totalTransactions,
      lowStockCount,
      salesHistory: salesHistory.reverse(),
      recentSales
    });
  });

  // Business Info
  app.get('/api/business/:id', (req, res) => {
    const business = db.prepare('SELECT * FROM businesses WHERE id = ?').get(req.params.id);
    res.json(business);
  });

  // Vite Middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Clemtrix Server running on http://localhost:${PORT}`);
  });
}

startServer();
