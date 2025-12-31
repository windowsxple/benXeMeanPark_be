/**
 * Booking API Request/Response Schemas
 */

export const CreateBookingRequest = {
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
};

export const BookingResponse = {
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
};

