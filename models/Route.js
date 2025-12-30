
export const routeSchema = {
  routeId: {
    type: 'integer',
    primaryKey: true,
    autoIncrement: true
  },
  originLocationId: {
    type: 'integer',
    required: true,
    foreignKey: 'locations.location_id',
    default: null
  },
  destinationLocationId: {
    type: 'integer',
    required: true,
    foreignKey: 'locations.location_id',
    default: null
  },
  distanceKm: {
    type: 'integer',
    required: false,
    default: 0
  },
  estimatedDuration: {
    type: 'integer',
    required: false,
    default: 0
  },
  status: {
    type: 'enum',
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
};

export const tableName = 'routes';

export default routeSchema;

