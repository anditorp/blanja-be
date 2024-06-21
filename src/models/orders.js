const { v4: uuidv4 } = require("uuid");
const db = require("../configs/db");

const createOrder = async (
  customers_id,
  products_id,
  color,
  quantity,
  size
) => {
  const order_id = uuidv4();
  await db.query(
    `INSERT INTO "order" (order_id, customers_id, products_id, color, quantity, size) VALUES ($1, $2, $3, $4, $5, $6)`,
    [order_id, customers_id, products_id, color, quantity, size]
  );
  return order_id;
};

const getOrdersByCustomerId = async (customers_id) => {
  const query = `
    SELECT 
      o.*,
      p.name AS product_name,
      p.image AS product_image,
      p.price AS product_price,
      p.condition AS product_condition,
      p.description AS product_description
    FROM "order" o
    JOIN products p ON o.products_id = p.products_id
    WHERE o.customers_id = $1
  `;
  return await db.query(query, [customers_id]);
};

const getAllOrders = async () => {
  return await db.query('SELECT * FROM "order"');
};

const updateOrder = async (order_id, color, quantity, size) => {
  await db.query(
    `UPDATE "order" SET color = $2, quantity = $3, size = $4 WHERE order_id = $1`,
    [order_id, color, quantity, size]
  );
};

const deleteOrder = async (order_id) => {
  await db.query(`DELETE FROM "order" WHERE order_id = $1`, [order_id]);
};

const getPaymentMethods = async () => {
  return await db.query("SELECT * FROM payment_methods");
};

const addOrderToHistory = async (order) => {
  const {
    history_id,
    order_id,
    customers_id,
    products_id,
    color,
    quantity,
    size,
    product_name,
    product_image,
    product_price,
  } = order;
  await db.query(
    `INSERT INTO order_history (history_id, order_id, customers_id, products_id, color, quantity, size, product_name, product_image, product_price) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [
      history_id,
      order_id,
      customers_id,
      products_id,
      color,
      quantity,
      size,
      product_name,
      product_image,
      product_price,
    ]
  );
};

const deleteOrdersByCustomerId = async (customers_id) => {
  await db.query(`DELETE FROM "order" WHERE customers_id = $1`, [customers_id]);
};

const getOrderHistoryByCustomerId = async (customers_id) => {
  const query = `
    SELECT 
      oh.*,
      p.name AS product_name,
      p.image AS product_image,
      p.price AS product_price
    FROM order_history oh
    JOIN products p ON oh.products_id = p.products_id
    WHERE oh.customers_id = $1
  `;
  return await db.query(query, [customers_id]);
};

module.exports = {
  createOrder,
  getOrdersByCustomerId,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getPaymentMethods,
  addOrderToHistory,
  deleteOrdersByCustomerId,
  getOrderHistoryByCustomerId,
};
