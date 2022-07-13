const db = require('../db');

class SneakersController {
  async getItems(req, res) {
    try {
      const allItems = await db.query('SELECT * FROM items');
      res.json(allItems.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async addToCart(req, res) {
    try {
      const {id, title, image, price} = req.body;
      const cartItem = await db.query('INSERT INTO cart (id, title, image, price) VALUES($1, $2, $3, $4) RETURNING *', [id, title, image, price]);
      res.json(cartItem.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async getCart(req, res) {
    try {
      const cartItems = await db.query('SELECT * FROM cart');
      res.json(cartItems.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart(req, res) {
    try {
      const {id} = req.params;
      const deleteItem = await db.query('DELETE FROM cart WHERE id = $1', [id]);
      res.json('The product has been removed!');
    } catch (error) {
      console.log(error);
    }
  }

  async addToFavorites(req, res) {
    try {
      const {id, title, image, price} = req.body;
      const favoritesItem = await db.query('INSERT INTO favorites (id, title, image, price) VALUES($1, $2, $3, $4) RETURNING *', [id, title, image, price]);
      res.json(favoritesItem.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async getFavorites(req, res) {
    try {
      const favoritesItems = await db.query('SELECT * FROM favorites');
      res.json(favoritesItems.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFavorite(req, res) {
    try {
      const {id} = req.params;
      const deleteItem = await db.query('DELETE FROM favorites WHERE id = $1', [id]);
      res.json('The product has been removed!');
    } catch (error) {
      console.log(error);
    }
  }

  async addToOrders(req, res) {
    try {
      const {items} = req.body;
      const ordersItem = await db.query('INSERT INTO orders (items, transaction_date) VALUES($1, $2) RETURNING *', [items, new Date().toLocaleDateString()]);
      res.json(ordersItem.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async getOrders(req, res) {
    try {
      const itemOrders = await db.query('SELECT * FROM orders');
      res.json(itemOrders.rows);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new SneakersController();