
export const bookingSeatSchema = {
  bookingSeatId: {
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
  seatId: {
    type: 'integer',
    required: true,
    foreignKey: 'transport_seats.seat_id',
    default: null
  },
  passengerName: {
    type: 'string',
    required: true,
    maxLength: 255
  },
  passengerPhone: {
    type: 'string',
    required: false,
    maxLength: 20,
    default: null
  },
  passengerIdentity: {
    type: 'string',
    required: false,
    maxLength: 50,
    default: null
  },
  price: {
    type: 'decimal',
    required: false,
    default: 0
  }
};

export const tableName = 'booking_seats';

export default bookingSeatSchema;

