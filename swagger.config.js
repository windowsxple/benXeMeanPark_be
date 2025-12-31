import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ben Xe Mien API',
      version: '1.0.0',
      description: 'API documentation for Ben Xe Mien - Transportation Booking System',
      contact: {
        name: 'API Support',
        email: 'support@benxemien.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server'
      },
      {
        url: 'https://api.benxemien.com/api',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token'
        }
      },
      schemas: {
        // Common Response Schemas
        Error: {
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
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Success message'
            }
          }
        },
        
        // Authentication Schemas
        RegisterRequest: {
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
        },
        RegisterResponse: {
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
        },
        LoginRequest: {
          type: 'object',
          required: ['emailOrPhone', 'password'],
          properties: {
            emailOrPhone: {
              type: 'string',
              example: 'user@example.com',
              description: 'Email address or phone number (required). Examples: user@example.com or 0123456789'
            },
            password: {
              type: 'string',
              example: 'password123',
              description: 'Password (required)'
            }
          }
        },
        LoginResponse: {
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
        },
        
        // Booking Schemas
        CreateBookingRequest: {
          type: 'object',
          required: ['tripId', 'seats'],
          properties: {
            tripId: {
              type: 'integer',
              example: 1,
              description: 'Transport trip ID'
            },
            seats: {
              type: 'array',
              items: {
                type: 'object',
                required: ['seatId', 'passengerName'],
                properties: {
                  seatId: {
                    type: 'integer',
                    example: 1
                  },
                  passengerName: {
                    type: 'string',
                    example: 'Nguyen Van A'
                  },
                  passengerPhone: {
                    type: 'string',
                    example: '0123456789'
                  },
                  passengerIdentity: {
                    type: 'string',
                    example: '001234567890'
                  }
                }
              }
            },
            paymentMethod: {
              type: 'string',
              enum: ['Cash', 'VNPay', 'Momo', 'ZaloPay'],
              example: 'VNPay'
            }
          }
        },
        BookingResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Booking created successfully'
            },
            data: {
              type: 'object',
              properties: {
                booking_id: {
                  type: 'integer',
                  example: 1
                },
                account_id: {
                  type: 'integer',
                  example: 1
                },
                trip_id: {
                  type: 'integer',
                  example: 1
                },
                total_price: {
                  type: 'number',
                  example: 500000
                },
                booking_status: {
                  type: 'string',
                  enum: ['Pending', 'Confirmed', 'Cancelled', 'Refunded'],
                  example: 'Pending'
                },
                payment_method: {
                  type: 'string',
                  example: 'VNPay'
                },
                created_at: {
                  type: 'string',
                  format: 'date-time',
                  example: '2024-12-30T15:00:00.000Z'
                }
              }
            }
          }
        },
        
        // Trip Schemas
        SearchTripsRequest: {
          type: 'object',
          properties: {
            originLocationId: {
              type: 'integer',
              example: 1,
              description: 'Origin location ID'
            },
            destinationLocationId: {
              type: 'integer',
              example: 2,
              description: 'Destination location ID'
            },
            transportTypeId: {
              type: 'integer',
              example: 1,
              description: 'Transport type ID'
            },
            departureDate: {
              type: 'string',
              format: 'date',
              example: '2024-12-31',
              description: 'Departure date in YYYY-MM-DD format'
            },
            page: {
              type: 'integer',
              example: 1,
              default: 1
            },
            limit: {
              type: 'integer',
              example: 10,
              default: 10
            }
          }
        },
        TripResponse: {
          type: 'object',
          properties: {
            trip_id: {
              type: 'integer',
              example: 1
            },
            trip_code: {
              type: 'string',
              example: 'TRIP001'
            },
            departure_time: {
              type: 'string',
              format: 'date-time',
              example: '2024-12-31T08:00:00.000Z'
            },
            arrival_time: {
              type: 'string',
              format: 'date-time',
              example: '2024-12-31T12:00:00.000Z'
            },
            base_price: {
              type: 'number',
              example: 200000
            },
            available_seats: {
              type: 'integer',
              example: 30
            },
            status: {
              type: 'string',
              enum: ['Open', 'Closed', 'Cancelled'],
              example: 'Open'
            }
          }
        },
        
        // Account Schemas
        Account: {
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
              format: 'date',
              example: '2000-01-01'
            },
            avatar: {
              type: 'string',
              example: 'https://example.com/avatar.jpg'
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
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'Authentication endpoints (Register, Login, etc.)'
      },
      {
        name: 'Accounts',
        description: 'Account management endpoints'
      },
      {
        name: 'Bookings',
        description: 'Booking management endpoints'
      },
      {
        name: 'Trips',
        description: 'Transport trip endpoints'
      },
      {
        name: 'Locations',
        description: 'Location endpoints'
      },
      {
        name: 'Providers',
        description: 'Transport provider endpoints'
      }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js', './server.js']
};

export const swaggerSpec = swaggerJsdoc(options);

