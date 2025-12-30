
export const paymentSchema = {
  paymentId: {
    type: 'integer',
    primaryKey: true,
    autoIncrement: true
  },
  bookingId: {
    type: 'integer',
    required: true,
    foreignKey: 'bookings.booking_id',
    default: null
  },
  amount: {
    type: 'decimal',
    required: true
  },
  paymentGateway: {
    type: 'enum',
    enum: ['VNPay', 'Momo', 'ZaloPay', 'Cash'],
    required: true
  },
  transactionCode: {
    type: 'string',
    required: false,
    maxLength: 255,
    default: null
  },
  paymentStatus: {
    type: 'enum',
    enum: ['Pending', 'Success', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  paidAt: {
    type: 'datetime',
    required: false,
    default: null
  }
};

export const tableName = 'payments';

export default paymentSchema;

