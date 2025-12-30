
export const locationSchema = {
  locationId: {
    type: 'integer',
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: 'string',
    required: true,
    maxLength: 255
  },
  code: {
    type: 'string',
    required: false,
    maxLength: 50,
    default: null
  },
  type: {
    type: 'enum',
    enum: ['Province', 'City', 'Airport', 'TrainStation', 'BusStation', 'Port'],
    required: true
  },
  parentId: {
    type: 'integer',
    required: false,
    foreignKey: 'locations.location_id',
    default: null
  }
};

export const tableName = 'locations';

export default locationSchema;

