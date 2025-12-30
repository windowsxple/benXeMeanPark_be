
export const transportTripSchema = {
  tripId: {
    type: 'integer',
    primaryKey: true,
    autoIncrement: true
  },
  transportTypeId: {
    type: 'integer',
    required: true,
    foreignKey: 'transport_types.transport_type_id',
    default: null
  },
  providerId: {
    type: 'integer',
    required: true,
    foreignKey: 'transport_providers.provider_id',
    default: null
  },
  vehicleId: {
    type: 'integer',
    required: true,
    foreignKey: 'transport_vehicles.vehicle_id',
    default: null
  },
  routeId: {
    type: 'integer',
    required: true,
    foreignKey: 'routes.route_id',
    default: null
  },
  tripCode: {
    type: 'string',
    required: false,
    maxLength: 50,
    default: null
  },
  departureTime: {
    type: 'datetime',
    required: true
  },
  arrivalTime: {
    type: 'datetime',
    required: true
  },
  basePrice: {
    type: 'decimal',
    required: false,
    default: 0
  },
  availableSeats: {
    type: 'integer',
    required: false,
    default: 0
  },
  status: {
    type: 'enum',
    enum: ['Open', 'Closed', 'Cancelled'],
    default: 'Open'
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

export const tableName = 'transport_trips';

export default transportTripSchema;

