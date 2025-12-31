/**
 * Authentication API Request/Response Schemas
 */

export const RegisterRequest = {
  type: 'object',
  required: ['email', 'password', 'fullName'],
  properties: {
    phone: {
      type: 'string',
      example: '0123456789',
      description: 'Phone number (optional)'
    },
    fullName: {
      type: 'string',
      example: 'Nguyen Van A',
      description: 'Full name (required)'
    },
    email: {
      type: 'string',
      format: 'email',
      example: 'user@example.com',
      description: 'Email address (required)'
    },
    dateOfBirth: {
      type: 'string',
      format: 'date',
      example: '2000-01-01',
      description: 'Date of birth in YYYY-MM-DD format (optional, must be 18+)'
    },
    password: {
      type: 'string',
      minLength: 6,
      example: 'password123',
      description: 'Password (required, minimum 6 characters)'
    }
  }
};

export const RegisterResponse = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    message: {
      type: 'string',
      example: 'Account created successfully'
    },
    data: {
      type: 'object',
      properties: {
        account_id: {
          type: 'integer',
          example: 1
        },
        email: {
          type: 'string',
          example: 'user@example.com'
        },
        full_name: {
          type: 'string',
          example: 'Nguyen Van A'
        },
        phone: {
          type: 'string',
          example: '0123456789'
        },
        date_of_birth: {
          type: 'string',
          format: 'date-time',
          example: '2000-01-01T00:00:00.000Z'
        },
        role: {
          type: 'string',
          enum: ['Customer', 'Admin', 'Provider', 'Staff'],
          example: 'Customer'
        },
        status: {
          type: 'string',
          enum: ['Active', 'Inactive'],
          example: 'Active'
        },
        is_verified: {
          type: 'boolean',
          example: false
        },
        created_at: {
          type: 'string',
          format: 'date-time',
          example: '2024-12-30T15:00:00.000Z'
        }
      }
    }
  }
};

export const LoginRequest = {
  type: 'object',
  required: ['emailOrPhone', 'password'],
  properties: {
    emailOrPhone: {
      type: 'string',
      example: 'user@example.com',
      description: 'Email address or phone number (required)'
    },
    password: {
      type: 'string',
      example: 'password123',
      description: 'Password (required)'
    }
  }
};

export const LoginResponse = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    message: {
      type: 'string',
      example: 'Login successful'
    },
    data: {
      type: 'object',
      properties: {
        account: {
          type: 'object',
          properties: {
            account_id: {
              type: 'integer',
              example: 1
            },
            email: {
              type: 'string',
              example: 'user@example.com'
            },
            full_name: {
              type: 'string',
              example: 'Nguyen Van A'
            },
            phone: {
              type: 'string',
              example: '0123456789'
            },
            date_of_birth: {
              type: 'string',
              format: 'date-time',
              example: '2000-01-01T00:00:00.000Z'
            },
            avatar: {
              type: 'string',
              example: null
            },
            role: {
              type: 'string',
              enum: ['Customer', 'Admin', 'Provider', 'Staff'],
              example: 'Customer'
            },
            status: {
              type: 'string',
              enum: ['Active', 'Inactive'],
              example: 'Active'
            },
            is_verified: {
              type: 'boolean',
              example: false
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              example: '2024-12-30T15:00:00.000Z'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              example: '2024-12-30T15:00:00.000Z'
            }
          }
        },
        token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          description: 'JWT token for authentication'
        }
      }
    }
  }
};

export const ErrorResponse = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    message: {
      type: 'string',
      example: 'Error message'
    },
    error: {
      type: 'string',
      example: 'Detailed error message (only in development)'
    }
  }
};

