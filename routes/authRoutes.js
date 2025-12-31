import express from 'express';
import { register } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new account
 *     tags: [Authentication]
 *     description: Create a new customer account with email, password, and personal information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *           example:
 *             phone: "0123456789"
 *             fullName: "Nguyen Van A"
 *             email: "user@example.com"
 *             dateOfBirth: "2000-01-01"
 *             password: "password123"
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *             example:
 *               success: true
 *               message: "Account created successfully"
 *               data:
 *                 account_id: 1
 *                 email: "user@example.com"
 *                 full_name: "Nguyen Van A"
 *                 phone: "0123456789"
 *                 date_of_birth: "2000-01-01T00:00:00.000Z"
 *                 role: "Customer"
 *                 status: "Active"
 *                 is_verified: false
 *                 created_at: "2024-12-30T15:00:00.000Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Email, password, and fullName are required"
 *       409:
 *         description: Conflict - Email or phone already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Email already exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/register', register);

export default router;

