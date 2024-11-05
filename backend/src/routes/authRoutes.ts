import { Router } from 'express';
import { register, login, getAllUsers, getUserById, updateUser, deleteUserById } from '../controllers/authController';
import { userRegistrationValidator, userLoginValidator } from '../middleware/validators';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/register', authenticateToken,  userRegistrationValidator, register);
router.post('/login', authenticateToken, userLoginValidator, login);
router.get('/getAllUsers', authenticateToken, getAllUsers);
router.get('/getUserById/:id', authenticateToken,  getUserById);
router.patch('/updateUser/:id', authenticateToken,  updateUser);
router.delete('/deleteUserById/:id', authenticateToken,  deleteUserById);

export default router;
 