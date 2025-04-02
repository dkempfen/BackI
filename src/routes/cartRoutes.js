import express from 'express';
import cartController from '../controllers/cartController.js';

const router = express.Router();

router.get('/:cid', cartController.getCartById);
router.post('/:cid/products/:pid', cartController.addProductToCart);
router.delete('/:cid/products/:pid', cartController.removeProductFromCart);
router.delete('/:cid', cartController.clearCart);

export default router;
