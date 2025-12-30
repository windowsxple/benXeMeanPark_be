
export const transportProviderSchema = {
  providerId: {
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
  name: {
    type: 'string',
    required: true,
    maxLength: 255
  },
  email: {
    type: 'string',
    required: false,
    maxLength: 255,
    default: null
  },
  hotline: {
    type: 'string',
    required: false,
    maxLength: 20,
    default: null
  },
  logo: {
    type: 'string',
    required: false,
    maxLength: 500,
    default: null
  },
  description: {
    type: 'text',
    required: false,
    default: null
  },
  rating: {
    type: 'float',
    required: false,
    default: 0
  },
  status: {
    type: 'enum',
    enum: ['Active', 'Inactive'],
    default: 'Active'
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

export const tableName = 'transport_providers';

export default transportProviderSchema;

