--Table for passport js--  
-- updated to include customer information tied to a specific user login
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "firstName" VARCHAR (40),
	"lastName" VARCHAR (40), 
	"phone" VARCHAR (20),
	"email" VARCHAR (40),
	"accesslvl" INT DEFAULT 0
);


--Each person will be able to add multiple entries to the equipment table
CREATE TABLE "equipment" (
	"id" SERIAL PRIMARY KEY,
	"make" VARCHAR (20) NOT NULL,
	"model" VARCHAR (30) NOT NULL,
	"year" INT,
	"user_id" INT REFERENCES "user"
);

--Dummy info
INSERT INTO "equipment" ("make", "model", "year", "person_id")
VALUES ('Trek', 'Emonda SLR P1', '2018', 2);

--Each piece of equipment can a work order
CREATE TABLE "work_orders" (
	"id" SERIAL PRIMARY KEY,
	"created" timestamp,
	"services" VARCHAR (2000) NOT NULL, 
	"total_price" INT NOT NULL,
	"user_id" INT REFERENCES "user" NOT NULL,
	"bike_id" INT REFERENCES "equipment" NOT NULL,
	"completed" BOOLEAN DEFAULT false,
	"completed_on" timestamp,
	"completed_by" INT REFERENCES "user" 
);

--Dummy info
INSERT INTO "work_orders" ("created", "services", "total_price", "user_id", "bike_id")
VALUES (CURRENT_TIMESTAMP, 'Complete overhaul', 300, 2, 12);

--This command was used to test the completion of the job
UPDATE "work_orders" set "completed" = TRUE, 
"completed_on" = CURRENT_TIMESTAMP,
"completed_by" = 1 
WHERE "id" = 1;

SELECT * FROM "user";
SELECT * FROM "person";
SELECT * FROM "equipment";
SELECT * FROM "work_orders";

DROP TABLE "user";
DROP TABLE "person";
DROP TABLE "equipment";
DROP TABLE "work_orders";
