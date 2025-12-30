
export const bookingSchema = {
  bookingId: {
    type: 'integer',
    primaryKey: true,
    autoIncrement: true
  },
  accountId: {
    type: 'integer',
    required: true,
    foreignKey: 'accounts.account_id',
    default: null
  },
  transportTypeId: {
    type: 'integer',
    required: true,
    foreignKey: 'transport_types.transport_type_id',
    default: null
  },
  tripId: {
    type: 'integer',
    required: true,
    foreignKey: 'transport_trips.trip_id',
    default: null
  },
  totalPrice: {
    type: 'decimal',
    required: false,
    default: 0
  },
  bookingStatus: {
    type: 'enum',
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Refunded'],
    default: 'Pending'
  },
  paymentMethod: {
    type: 'enum',
    enum: ['Cash', 'VNPay', 'Momo', 'ZaloPay'],
    default: 'Cash'
  },
  createdAt: {
    type: 'datetime',
    default: 'NOW()'
  },
  updatedAt: {
    type: 'datetime',
    default: 'NOW()'
  }
};

export const tableName = 'bookings';

export default bookingSchema;

