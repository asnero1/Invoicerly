import { Router } from 'express';
import { signupUser, loginUser, deleteUser, reactivateUser } from '../controllers/authController';

const router = Router();

// ✅ Middleware to handle async errors properly
const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ✅ Use asyncHandler to wrap the async functions
router.post('/signup', asyncHandler(signupUser));
router.post('/login', asyncHandler(loginUser));
router.delete('/delete/:id', asyncHandler(deleteUser));
router.put('/reactivate/:id', asyncHandler(reactivateUser));

export default router;
