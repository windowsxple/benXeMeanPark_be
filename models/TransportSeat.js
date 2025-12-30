
export const transportSeatSchema = {
  seatId: {
    type: 'integer',
    primaryKey: true,
    autoIncrement: true
  },
  tripId: {
    type: 'integer',
    required: true,
    foreignKey: 'transport_trips.trip_id',
    default: null
  },
  seatCode: {
    type: 'string',
    required: true,
    maxLength: 10
  },
  seatClass: {
    type: 'enum',
    enum: ['Economy', 'Business', 'VIP', 'Sleeper', 'Cabin'],
    default: 'Economy'
  },
  price: {
    type: 'decimal',
    required: false,
    default: 0
  },
  status: {
    type: 'enum',
    enum: ['Available', 'Reserved', 'Booked'],
    default: 'Available'
  }
};

export const tableName = 'transport_seats';

export default transportSeatSchema;

