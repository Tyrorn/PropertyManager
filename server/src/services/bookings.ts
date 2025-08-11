import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type Booking = {
  availabilityId: number;
  tenantID: number;
  propertyId: number;
};

export async function createBooking(newBooking: Booking) {
  console.log(newBooking);
  await prisma.booking.create({ data: { ...newBooking, status: "Booked" } });
}

export async function getUserBookings(id: number) {
  const results = await prisma.booking.findMany({
    where: {
      tenantID: id,
    },
    select: {
      id: true,
      availability: {
        select: {
          date: true,
          startTime: true,
          endTime: true,
          propertyManager: {
            select: {
              username: true,
              contactNumber: true,
            },
          },
        },
      },
      property: {
        select: {
          id: true,
          address: true,
        },
      },
      status: true,
    },
  });
  console.log(results);

  return results.map((result) => ({
    id: result.id,
    date: result.availability.date,
    startTime: result.availability.startTime,
    endTime: result.availability.endTime,
    username: result.availability.propertyManager.username,
    contactNumber: result.availability.propertyManager.contactNumber,
    propertyName: result.property.id,
    propertyAddress: result.property.address,
    status: result.status,
  }));
}
