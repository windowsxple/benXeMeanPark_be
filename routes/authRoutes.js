import express from 'express';
import { register, login } from '../controllers/authController.js';

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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Authentication]
 *     description: Authenticate user with email/phone and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           examples:
 *             email:
 *               summary: Login with email
 *               value:
 *                 emailOrPhone: "user@example.com"
 *                 password: "password123"
 *             phone:
 *               summary: Login with phone
 *               value:
 *                 emailOrPhone: "0123456789"
 *                 password: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             example:
 *               success: true
 *               message: "Login successful"
 *               data:
 *                 account:
 *                   account_id: 1
 *                   email: "user@example.com"
 *                   full_name: "Nguyen Van A"
 *                   phone: "0123456789"
 *                   date_of_birth: "2000-01-01T00:00:00.000Z"
 *                   avatar: null
 *                   role: "Customer"
 *                   status: "Active"
 *                   is_verified: false
 *                   created_at: "2024-12-30T15:00:00.000Z"
 *                   updated_at: "2024-12-30T15:00:00.000Z"
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Email/Phone and password are required"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Invalid email/phone or password"
 *       403:
 *         description: Account is inactive
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Account is inactive. Please contact support."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/login', login);

export default router;

