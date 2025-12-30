
export const promotionSchema = {
  promotionId: {
    type: 'integer',
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: 'string',
    required: true,
    unique: true,
    maxLength: 50
  },
  description: {
    type: 'string',
    required: false,
    maxLength: 500,
    default: null
  },
  discountType: {
    type: 'enum',
    enum: ['Percent', 'Fixed'],
    required: true
  },
  discountValue: {
    type: 'decimal',
    required: true
  },
  startDate: {
    type: 'datetime',
    required: true
  },
  endDate: {
    type: 'datetime',
    required: true
  },
  status: {
    type: 'enum',
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
};

export const tableName = 'promotions';

export default promotionSchema;

