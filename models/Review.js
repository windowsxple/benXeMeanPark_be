
export const reviewSchema = {
  reviewId: {
    type: 'integer',
    primaryKey: true,
    autoIncrement: true
  },
  accountId: {
    type: 'integer',
    required: true,
    foreignKey: 'accounts.account_id',
    default: null
  },
  providerId: {
    type: 'integer',
    required: true,
    foreignKey: 'transport_providers.provider_id',
    default: null
  },
  tripId: {
    type: 'integer',
    required: true,
    foreignKey: 'transport_trips.trip_id',
    default: null
  },
  rating: {
    type: 'integer',
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: 'text',
    required: false,
    default: null
  },
  createdAt: {
    type: 'datetime',
    default: 'NOW()'
  }
};

export const tableName = 'reviews';

export default reviewSchema;

