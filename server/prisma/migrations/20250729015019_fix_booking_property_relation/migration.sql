/*
  Warnings:

  - You are about to drop the column `propertyId` on the `Availability` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Availability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "propertyManagerId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    CONSTRAINT "Availability_propertyManagerId_fkey" FOREIGN KEY ("propertyManagerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Availability" ("date", "endTime", "id", "propertyManagerId", "startTime") SELECT "date", "endTime", "id", "propertyManagerId", "startTime" FROM "Availability";
DROP TABLE "Availability";
ALTER TABLE "new_Availability" RENAME TO "Availability";
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "availabilityId" INTEGER NOT NULL,
    "tenantID" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    CONSTRAINT "Booking_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_tenantID_fkey" FOREIGN KEY ("tenantID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("availabilityId", "id", "propertyId", "status", "tenantID") SELECT "availabilityId", "id", "propertyId", "status", "tenantID" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE UNIQUE INDEX "Booking_availabilityId_key" ON "Booking"("availabilityId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
