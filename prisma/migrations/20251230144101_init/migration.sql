-- CreateTable
CREATE TABLE "accounts" (
    "account_id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(255),
    "phone" VARCHAR(20),
    "avatar" VARCHAR(500),
    "role" VARCHAR(50) DEFAULT 'Customer',
    "status" VARCHAR(50) DEFAULT 'Active',
    "is_verified" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "transport_types" (
    "transport_type_id" SERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "transport_types_pkey" PRIMARY KEY ("transport_type_id")
);

-- CreateTable
CREATE TABLE "transport_providers" (
    "provider_id" SERIAL NOT NULL,
    "transport_type_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "hotline" VARCHAR(20),
    "logo" VARCHAR(500),
    "description" TEXT,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "status" VARCHAR(50) DEFAULT 'Active',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transport_providers_pkey" PRIMARY KEY ("provider_id")
);

-- CreateTable
CREATE TABLE "transport_provider_branches" (
    "provider_branch_id" SERIAL NOT NULL,
    "provider_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(500),
    "phone" VARCHAR(20),
    "status" VARCHAR(50) DEFAULT 'Active',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transport_provider_branches_pkey" PRIMARY KEY ("provider_branch_id")
);

-- CreateTable
CREATE TABLE "locations" (
    "location_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(50),
    "type" VARCHAR(50) NOT NULL,
    "parent_id" INTEGER,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "transport_vehicles" (
    "vehicle_id" SERIAL NOT NULL,
    "provider_id" INTEGER NOT NULL,
    "code" VARCHAR(50),
    "model" VARCHAR(255),
    "vehicle_type" VARCHAR(255),
    "total_seats" INTEGER DEFAULT 0,
    "status" VARCHAR(50) DEFAULT 'Active',

    CONSTRAINT "transport_vehicles_pkey" PRIMARY KEY ("vehicle_id")
);

-- CreateTable
CREATE TABLE "routes" (
    "route_id" SERIAL NOT NULL,
    "origin_location_id" INTEGER NOT NULL,
    "destination_location_id" INTEGER NOT NULL,
    "distance_km" INTEGER DEFAULT 0,
    "estimated_duration" INTEGER DEFAULT 0,
    "status" VARCHAR(50) DEFAULT 'Active',

    CONSTRAINT "routes_pkey" PRIMARY KEY ("route_id")
);

-- CreateTable
CREATE TABLE "transport_trips" (
    "trip_id" SERIAL NOT NULL,
    "transport_type_id" INTEGER NOT NULL,
    "provider_id" INTEGER NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "route_id" INTEGER NOT NULL,
    "trip_code" VARCHAR(50),
    "departure_time" TIMESTAMP(6) NOT NULL,
    "arrival_time" TIMESTAMP(6) NOT NULL,
    "base_price" DECIMAL(10,2) DEFAULT 0,
    "available_seats" INTEGER DEFAULT 0,
    "status" VARCHAR(50) DEFAULT 'Open',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transport_trips_pkey" PRIMARY KEY ("trip_id")
);

-- CreateTable
CREATE TABLE "transport_seats" (
    "seat_id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "seat_code" VARCHAR(10) NOT NULL,
    "seat_class" VARCHAR(50) DEFAULT 'Economy',
    "price" DECIMAL(10,2) DEFAULT 0,
    "status" VARCHAR(50) DEFAULT 'Available',

    CONSTRAINT "transport_seats_pkey" PRIMARY KEY ("seat_id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "booking_id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "transport_type_id" INTEGER NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "total_price" DECIMAL(10,2) DEFAULT 0,
    "booking_status" VARCHAR(50) DEFAULT 'Pending',
    "payment_method" VARCHAR(50) DEFAULT 'Cash',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "booking_seats" (
    "booking_seat_id" SERIAL NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "seat_id" INTEGER NOT NULL,
    "passenger_name" VARCHAR(255) NOT NULL,
    "passenger_phone" VARCHAR(20),
    "passenger_identity" VARCHAR(50),
    "price" DECIMAL(10,2) DEFAULT 0,

    CONSTRAINT "booking_seats_pkey" PRIMARY KEY ("booking_seat_id")
);

-- CreateTable
CREATE TABLE "payments" (
    "payment_id" SERIAL NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "payment_gateway" VARCHAR(50) NOT NULL,
    "transaction_code" VARCHAR(255),
    "payment_status" VARCHAR(50) DEFAULT 'Pending',
    "paid_at" TIMESTAMP(6),

    CONSTRAINT "payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "promotions" (
    "promotion_id" SERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "description" VARCHAR(500),
    "discount_type" VARCHAR(50) NOT NULL,
    "discount_value" DECIMAL(10,2) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,
    "status" VARCHAR(50) DEFAULT 'Active',

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("promotion_id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "review_id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "provider_id" INTEGER NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- CreateIndex
CREATE INDEX "idx_accounts_email" ON "accounts"("email");

-- CreateIndex
CREATE INDEX "idx_accounts_status" ON "accounts"("status");

-- CreateIndex
CREATE INDEX "idx_accounts_role" ON "accounts"("role");

-- CreateIndex
CREATE INDEX "idx_transport_types_code" ON "transport_types"("code");

-- CreateIndex
CREATE UNIQUE INDEX "uk_transport_types_code" ON "transport_types"("code");

-- CreateIndex
CREATE INDEX "idx_transport_providers_transport_type_id" ON "transport_providers"("transport_type_id");

-- CreateIndex
CREATE INDEX "idx_transport_providers_status" ON "transport_providers"("status");

-- CreateIndex
CREATE INDEX "idx_transport_provider_branches_provider_id" ON "transport_provider_branches"("provider_id");

-- CreateIndex
CREATE INDEX "idx_transport_provider_branches_status" ON "transport_provider_branches"("status");

-- CreateIndex
CREATE INDEX "idx_locations_type" ON "locations"("type");

-- CreateIndex
CREATE INDEX "idx_locations_parent_id" ON "locations"("parent_id");

-- CreateIndex
CREATE INDEX "idx_locations_code" ON "locations"("code");

-- CreateIndex
CREATE INDEX "idx_transport_vehicles_provider_id" ON "transport_vehicles"("provider_id");

-- CreateIndex
CREATE INDEX "idx_transport_vehicles_status" ON "transport_vehicles"("status");

-- CreateIndex
CREATE INDEX "idx_routes_origin_location_id" ON "routes"("origin_location_id");

-- CreateIndex
CREATE INDEX "idx_routes_destination_location_id" ON "routes"("destination_location_id");

-- CreateIndex
CREATE INDEX "idx_routes_status" ON "routes"("status");

-- CreateIndex
CREATE INDEX "idx_transport_trips_transport_type_id" ON "transport_trips"("transport_type_id");

-- CreateIndex
CREATE INDEX "idx_transport_trips_provider_id" ON "transport_trips"("provider_id");

-- CreateIndex
CREATE INDEX "idx_transport_trips_route_id" ON "transport_trips"("route_id");

-- CreateIndex
CREATE INDEX "idx_transport_trips_departure_time" ON "transport_trips"("departure_time");

-- CreateIndex
CREATE INDEX "idx_transport_trips_status" ON "transport_trips"("status");

-- CreateIndex
CREATE INDEX "idx_transport_seats_trip_id" ON "transport_seats"("trip_id");

-- CreateIndex
CREATE INDEX "idx_transport_seats_status" ON "transport_seats"("status");

-- CreateIndex
CREATE UNIQUE INDEX "uk_transport_seats_trip_seat" ON "transport_seats"("trip_id", "seat_code");

-- CreateIndex
CREATE INDEX "idx_bookings_account_id" ON "bookings"("account_id");

-- CreateIndex
CREATE INDEX "idx_bookings_trip_id" ON "bookings"("trip_id");

-- CreateIndex
CREATE INDEX "idx_bookings_booking_status" ON "bookings"("booking_status");

-- CreateIndex
CREATE INDEX "idx_bookings_created_at" ON "bookings"("created_at");

-- CreateIndex
CREATE INDEX "idx_booking_seats_booking_id" ON "booking_seats"("booking_id");

-- CreateIndex
CREATE INDEX "idx_booking_seats_seat_id" ON "booking_seats"("seat_id");

-- CreateIndex
CREATE INDEX "idx_payments_booking_id" ON "payments"("booking_id");

-- CreateIndex
CREATE INDEX "idx_payments_payment_status" ON "payments"("payment_status");

-- CreateIndex
CREATE INDEX "idx_payments_transaction_code" ON "payments"("transaction_code");

-- CreateIndex
CREATE UNIQUE INDEX "promotions_code_key" ON "promotions"("code");

-- CreateIndex
CREATE INDEX "idx_promotions_code" ON "promotions"("code");

-- CreateIndex
CREATE INDEX "idx_promotions_status" ON "promotions"("status");

-- CreateIndex
CREATE INDEX "idx_promotions_dates" ON "promotions"("start_date", "end_date");

-- CreateIndex
CREATE INDEX "idx_reviews_account_id" ON "reviews"("account_id");

-- CreateIndex
CREATE INDEX "idx_reviews_provider_id" ON "reviews"("provider_id");

-- CreateIndex
CREATE INDEX "idx_reviews_trip_id" ON "reviews"("trip_id");

-- CreateIndex
CREATE INDEX "idx_reviews_rating" ON "reviews"("rating");

-- AddForeignKey
ALTER TABLE "transport_providers" ADD CONSTRAINT "transport_providers_transport_type_id_fkey" FOREIGN KEY ("transport_type_id") REFERENCES "transport_types"("transport_type_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transport_provider_branches" ADD CONSTRAINT "transport_provider_branches_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "transport_providers"("provider_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "locations"("location_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transport_vehicles" ADD CONSTRAINT "transport_vehicles_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "transport_providers"("provider_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_origin_location_id_fkey" FOREIGN KEY ("origin_location_id") REFERENCES "locations"("location_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_destination_location_id_fkey" FOREIGN KEY ("destination_location_id") REFERENCES "locations"("location_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transport_trips" ADD CONSTRAINT "transport_trips_transport_type_id_fkey" FOREIGN KEY ("transport_type_id") REFERENCES "transport_types"("transport_type_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transport_trips" ADD CONSTRAINT "transport_trips_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "transport_providers"("provider_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transport_trips" ADD CONSTRAINT "transport_trips_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "transport_vehicles"("vehicle_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transport_trips" ADD CONSTRAINT "transport_trips_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes"("route_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transport_seats" ADD CONSTRAINT "transport_seats_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "transport_trips"("trip_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_transport_type_id_fkey" FOREIGN KEY ("transport_type_id") REFERENCES "transport_types"("transport_type_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "transport_trips"("trip_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "booking_seats" ADD CONSTRAINT "booking_seats_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("booking_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "booking_seats" ADD CONSTRAINT "booking_seats_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "transport_seats"("seat_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("booking_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "transport_providers"("provider_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "transport_trips"("trip_id") ON DELETE CASCADE ON UPDATE NO ACTION;
