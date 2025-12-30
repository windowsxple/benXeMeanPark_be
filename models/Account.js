
export const accountSchema = {
  accountId: {
    type: 'integer',
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: 'string',
    required: true,
    unique: true,
    maxLength: 255
  },
  password: {
    type: 'string',
    required: true,
    minLength: 6
  },
  fullName: {
    type: 'string',
    required: false,
    maxLength: 255,
    default: null
  },
  phone: {
    type: 'string',
    required: false,
    maxLength: 20,
    default: null
  },
  avatar: {
    type: 'string',
    required: false,
    maxLength: 500,
    default: null
  },
  role: {
    type: 'enum',
    enum: ['Customer', 'Admin', 'Provider', 'Staff'],
    default: 'Customer'
  },
  status: {
    type: 'enum',
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  isVerified: {
    type: 'boolean',
    default: false
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

export const tableName = 'accounts';

export default accountSchema;

