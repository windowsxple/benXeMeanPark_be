import { prisma } from '../libs/prisma.js';

/**
 * Get current user profile
 * GET /api/profile/me
 * Requires: Authentication (JWT token)
 */
export const getProfile = async (req, res) => {
  try {
    // req.user is set by authenticate middleware
    const accountId = req.user.accountId;

    const account = await prisma.accounts.findUnique({
      where: { account_id: accountId },
      select: {
        account_id: true,
        email: true,
        full_name: true,
        phone: true,
        date_of_birth: true,
        avatar: true,
        role: true,
        status: true,
        is_verified: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found',
      });
    }

    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      data: account,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

