import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type Availability = {
  propertyManagerId: number;
  date: string;
  startTime: string;
  endTime: string;
  username?: string;
  contactNumber?: string;
};

export async function createAvailabilitiy(newAvailability: Availability) {
  return prisma.availability.create({ data: { ...newAvailability } });
}

export async function deleteAvailibility(availabilityId: number) {
  return prisma.availability.delete({
    where: {
      id: availabilityId,
    },
  });
}

export async function getAllAvailabilities() {
  return prisma.availability.findMany();
}

export async function getPMAvailabilities(propertyManagerID: number) {
  const results = await prisma.availability.findMany({
    where: {
      propertyManagerId: propertyManagerID,
    },
    include: {
      Booking: {
        include: {
          tenant: {
            select: {
              username: true,
              contactNumber: true,
            },
          },
          property: {
            select: {
              id: true,
              address: true,
            },
          },
        },
      },
    },
  });

  return results.map((result) => ({
    id: result.id,
    date: result.date,
    startTime: result.startTime,
    endTime: result.endTime,
    username: result.Booking?.tenant?.username ?? null,
    contactNumber: result.Booking?.tenant?.contactNumber ?? null,
    propertyId: result.Booking?.property?.id ?? null,
    propertyAddress: result.Booking?.property?.address ?? null,
  }));
}

export async function getUnbookedAvailabilitiesByProperty(propertyId: number) {
  const results = await prisma.availability.findMany({
    where: {
      propertyManager: {
        pmProperties: {
          some: {
            propertyId: propertyId,
          },
        },
      },
      Booking: {
        is: null, // no booking
      },
    },
    select: {
      id: true,
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
  });
  return results.map((result) => ({
    id: result.id,
    date: result.date,
    startTime: result.startTime,
    endTime: result.endTime,
    username: result.propertyManager.username,
    contactNumber: result.propertyManager.contactNumber,
  }));
}
