
export const transportProviderBranchSchema = {
  providerBranchId: {
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
  name: {
    type: 'string',
    required: true,
    maxLength: 255
  },
  address: {
    type: 'string',
    required: false,
    maxLength: 500,
    default: null
  },
  phone: {
    type: 'string',
    required: false,
    maxLength: 20,
    default: null
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

export const tableName = 'transport_provider_branches';

export default transportProviderBranchSchema;

