const Router = require('express');
const router = new Router();

const sneakersController = require('../controllers/sneakersController');

router.get('/sneakers', sneakersController.getItems);

router.post('/cart', sneakersController.addToCart);
router.get('/cart', sneakersController.getCart);
router.delete('/cart/:id', sneakersController.deleteCart);

router.post('/favorites', sneakersController.addToFavorites);
router.get('/favorites', sneakersController.getFavorites);
router.delete('/favorites/:id', sneakersController.deleteFavorite);

router.post('/orders', sneakersController.addToOrders);
router.get('/orders', sneakersController.getOrders);

module.exports = router;