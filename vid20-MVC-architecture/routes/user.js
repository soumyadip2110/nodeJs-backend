import express from 'express';
import { handleCreateUser, handleDeleteUser, handleEditUser, handleGetAllUsers, handleGetUserById } from '../controllers/user.js';

const router = express.Router();

router.get('/', handleGetAllUsers);

router.get('/:id', handleGetUserById);

router.post('/', handleCreateUser);

router.patch('/:id', handleEditUser);

router.delete('/:id', handleDeleteUser);

export default router;