import { Router } from 'express';
import { register, login, getAllUsers, getUserById, updateUser, deleteUserById } from '../controllers/authController';
import { userRegistrationValidator, userLoginValidator } from '../middleware/validators';
import { authenticateToken } from '../middleware/auth';
import { isAdmin, isAInsructor } from '../middleware/checkRole';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getAllUsers', authenticateToken, isAdmin,isAInsructor,getAllUsers);
router.get('/getUserById/:id', authenticateToken,  getUserById);
router.patch('/updateUser/:id', authenticateToken,  updateUser);
router.delete('/deleteUserById/:id', authenticateToken,  deleteUserById);

export default router;
 