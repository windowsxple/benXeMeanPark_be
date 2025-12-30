
export const transportVehicleSchema = {
  vehicleId: {
    type: 'integer',
    primaryKey: true,
    autoIncrement: true
  },
  providerId: {
    type: 'integer',
    required: true,
    foreignKey: 'transport_providers.provider_id',
    default: null
  },
  code: {
    type: 'string',
    required: false,
    maxLength: 50,
    default: null
  },
  model: {
    type: 'string',
    required: false,
    maxLength: 255,
    default: null
  },
  vehicleType: {
    type: 'string',
    required: false,
    maxLength: 255,
    default: null
  },
  totalSeats: {
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

export const tableName = 'transport_vehicles';

export default transportVehicleSchema;

