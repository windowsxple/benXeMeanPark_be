
export const transportTypeSchema = {
  transportTypeId: {
    type: 'integer',
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: 'enum',
    enum: ['BUS', 'FLIGHT', 'TRAIN', 'FERRY'],
    required: true
  },
  name: {
    type: 'string',
    required: false,
    maxLength: 255,
    default: null
  }
};

export const tableName = 'transport_types';

export default transportTypeSchema;

