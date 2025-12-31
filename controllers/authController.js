import bcrypt from 'bcryptjs';
import { prisma } from '../libs/prisma.js';
import { generateToken } from '../libs/jwtService.js';

/**
 * Register a new account
 * POST /api/auth/register
 * Body: { phone, fullName, email, dateOfBirth, password }
 */
export const register = async (req, res) => {
  try {
    const { phone, fullName, email, dateOfBirth, password } = req.body;

    // Validation
    if (!email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and fullName are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // Validate date of birth if provided
    if (dateOfBirth) {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      if (age < 18) {
        return res.status(400).json({
          success: false,
          message: 'You must be at least 18 years old to register',
        });
      }

      if (dob > today) {
        return res.status(400).json({
          success: false,
          message: 'Date of birth cannot be in the future',
        });
      }
    }

    // Check if email already exists
    const existingAccount = await prisma.accounts.findUnique({
      where: { email },
    });

    if (existingAccount) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
      });
    }

    // Check if phone already exists (if provided)
    if (phone) {
      const existingPhone = await prisma.accounts.findFirst({
        where: { phone },
      });

      if (existingPhone) {
        return res.status(409).json({
          success: false,
          message: 'Phone number already exists',
        });
      }
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create account
    const account = await prisma.accounts.create({
      data: {
        email,
        password: hashedPassword,
        full_name: fullName,
        phone: phone || null,
        date_of_birth: dateOfBirth ? new Date(dateOfBirth) : null,
        role: 'Customer',
        status: 'Active',
        is_verified: false,
      },
      select: {
        account_id: true,
        email: true,
        full_name: true,
        phone: true,
        date_of_birth: true,
        role: true,
        status: true,
        is_verified: true,
        created_at: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: account,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

/**
 * Login with email/phone and password
 * POST /api/auth/login
 * Body: { emailOrPhone, password }
 */
export const login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    // Validation - check if emailOrPhone and password exist
    // Handle both string and number types for emailOrPhone
    const emailOrPhoneValue = emailOrPhone?.toString().trim() || '';
    const passwordValue = password?.toString().trim() || '';

    if (!emailOrPhoneValue || !passwordValue) {
      return res.status(400).json({
        success: false,
        message: 'Email/Phone and password are required',
      });
    }

    // Determine if input is email or phone
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(emailOrPhoneValue);
    const cleanPhone = emailOrPhoneValue.replace(/[\s\-\(\)]/g, '');
    const isPhone = /^[0-9]{10,20}$/.test(cleanPhone);

    if (!isEmail && !isPhone) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or phone format',
      });
    }

    // Find account by email or phone
    let account;
    if (isEmail) {
      account = await prisma.accounts.findUnique({
        where: { email: emailOrPhoneValue },
      });
    } else {
      account = await prisma.accounts.findFirst({
        where: { phone: cleanPhone },
      });
    }

    if (!account) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email/phone or password',
      });
    }

    // Check account status
    if (account.status !== 'Active') {
      return res.status(403).json({
        success: false,
        message: 'Account is inactive. Please contact support.',
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, account.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email/phone or password',
      });
    }

    // Return account info (without password)
    const accountInfo = {
      account_id: account.account_id,
      email: account.email,
      full_name: account.full_name,
      phone: account.phone,
      date_of_birth: account.date_of_birth,
      avatar: account.avatar,
      role: account.role,
      status: account.status,
      is_verified: account.is_verified,
      created_at: account.created_at,
      updated_at: account.updated_at,
    };

    // Generate JWT token
    const tokenPayload = {
      accountId: account.account_id,
      email: account.email,
      role: account.role
    };
    const token = generateToken(tokenPayload);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        account: accountInfo,
        token: token
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

