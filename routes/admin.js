const path = require('path');

const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', [
    body('title')
        .isString()
        .isLength({ min: 3 })
        .trim()
        .withMessage('Please enter a valid title of at least 3 characters!'),
    body('imageUrl')
        .isURL()
        .withMessage('Please enter a valid URL'),
    body('price')
        .isFloat()
        .withMessage('Please enter a valid price with decimal values!'),
    body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
        .withMessage('Please enter a valid description of at least 5 and max 500 characters!'),
], isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', [
    body('title')
        .isString()
        .isLength({ min: 3 })
        .trim()
        .withMessage('Please enter a valid title of at least 3 characters!'),
    body('imageUrl')
        .isURL()
        .withMessage('Please enter a valid URL'),
    body('price')
        .isFloat()
        .withMessage('Please enter a valid price with decimal values!'),
    body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
        .withMessage('Please enter a valid description of at least 5 and max 500 characters!'),
], isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
