Table Account {
  accountId int pk
  email varchar [unique, not null]
  password varchar [not null]
  fullName varchar
  phone varchar
  avatar varchar
  role enum("Customer","Admin","Provider","Staff")
  status enum("Active","Inactive")
  isVerified boolean
  createdAt datetime
  updatedAt datetime
}

Table TransportType {
  transportTypeId int pk
  code enum("BUS","FLIGHT","TRAIN","FERRY")
  name varchar
}

Table TransportProvider {
  providerId int pk
  transportTypeId int [ref: > TransportType.transportTypeId]
  name varchar
  email varchar
  hotline varchar
  logo varchar
  description text
  rating float
  status enum("Active","Inactive")
  createdAt datetime
  updatedAt datetime
}

Table TransportProviderBranch {
  providerBranchId int pk
  providerId int [ref: > TransportProvider.providerId]
  name varchar
  address varchar
  phone varchar
  status enum("Active","Inactive")
  createdAt datetime
  updatedAt datetime
}

Table Location {
  locationId int pk
  name varchar
  code varchar
  type enum("Province","City","Airport","TrainStation","BusStation","Port")
  parentId int [ref: > Location.locationId]
}

Table TransportVehicle {
  vehicleId int pk
  providerId int [ref: > TransportProvider.providerId]
  code varchar
  model varchar
  vehicleType varchar
  totalSeats int
  status enum("Active","Inactive")
}

Table Route {
  routeId int pk
  originLocationId int [ref: > Location.locationId]
  destinationLocationId int [ref: > Location.locationId]
  distanceKm int
  estimatedDuration int
  status enum("Active","Inactive")
}

Table TransportTrip {
  tripId int pk
  transportTypeId int [ref: > TransportType.transportTypeId]
  providerId int [ref: > TransportProvider.providerId]
  vehicleId int [ref: > TransportVehicle.vehicleId]
  routeId int [ref: > Route.routeId]
  tripCode varchar
  departureTime datetime
  arrivalTime datetime
  basePrice decimal
  availableSeats int
  status enum("Open","Closed","Cancelled")
  createdAt datetime
  updatedAt datetime
}

Table TransportSeat {
  seatId int pk
  tripId int [ref: > TransportTrip.tripId]
  seatCode varchar
  seatClass enum("Economy","Business","VIP","Sleeper","Cabin")
  price decimal
  status enum("Available","Reserved","Booked")
}

Table Booking {
  bookingId int pk
  accountId int [ref: > Account.accountId]
  transportTypeId int [ref: > TransportType.transportTypeId]
  tripId int [ref: > TransportTrip.tripId]
  totalPrice decimal
  bookingStatus enum("Pending","Confirmed","Cancelled","Refunded")
  paymentMethod enum("Cash","VNPay","Momo","ZaloPay")
  createdAt datetime
  updatedAt datetime
}

Table BookingSeat {
  bookingSeatId int pk
  bookingId int [ref: > Booking.bookingId]
  seatId int [ref: > TransportSeat.seatId]
  passengerName varchar
  passengerPhone varchar
  passengerIdentity varchar
  price decimal
}

Table Payment {
  paymentId int pk
  bookingId int [ref: > Booking.bookingId]
  amount decimal
  paymentGateway enum("VNPay","Momo","ZaloPay","Cash")
  transactionCode varchar
  paymentStatus enum("Pending","Success","Failed","Refunded")
  paidAt datetime
}

Table Promotion {
  promotionId int pk
  code varchar [unique]
  description varchar
  discountType enum("Percent","Fixed")
  discountValue decimal
  startDate datetime
  endDate datetime
  status enum("Active","Inactive")
}

Table Review {
  reviewId int pk
  accountId int [ref: > Account.accountId]
  providerId int [ref: > TransportProvider.providerId]
  tripId int [ref: > TransportTrip.tripId]
  rating int
  comment text
  createdAt datetime
}
