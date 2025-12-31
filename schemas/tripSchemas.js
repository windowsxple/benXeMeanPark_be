/**
 * Trip API Request/Response Schemas
 */

export const SearchTripsRequest = {
  type: 'object',
  properties: {
    originLocationId: {
      type: 'integer',
      example: 1,
      description: 'Origin location ID'
    },
    destinationLocationId: {
      type: 'integer',
      example: 2,
      description: 'Destination location ID'
    },
    transportTypeId: {
      type: 'integer',
      example: 1,
      description: 'Transport type ID (1=BUS, 2=FLIGHT, 3=TRAIN, 4=FERRY)'
    },
    departureDate: {
      type: 'string',
      format: 'date',
      example: '2024-12-31',
      description: 'Departure date in YYYY-MM-DD format'
    },
    page: {
      type: 'integer',
      example: 1,
      default: 1,
      description: 'Page number'
    },
    limit: {
      type: 'integer',
      example: 10,
      default: 10,
      description: 'Items per page'
    }
  }
};

export const TripResponse = {
  type: 'object',
  properties: {
    trip_id: {
      type: 'integer',
      example: 1
    },
    trip_code: {
      type: 'string',
      example: 'TRIP001'
    },
    transport_type_id: {
      type: 'integer',
      example: 1
    },
    provider_id: {
      type: 'integer',
      example: 1
    },
    route_id: {
      type: 'integer',
      example: 1
    },
    departure_time: {
      type: 'string',
      format: 'date-time',
      example: '2024-12-31T08:00:00.000Z'
    },
    arrival_time: {
      type: 'string',
      format: 'date-time',
      example: '2024-12-31T12:00:00.000Z'
    },
    base_price: {
      type: 'number',
      example: 200000
    },
    available_seats: {
      type: 'integer',
      example: 30
    },
    status: {
      type: 'string',
      enum: ['Open', 'Closed', 'Cancelled'],
      example: 'Open'
    }
  }
};

