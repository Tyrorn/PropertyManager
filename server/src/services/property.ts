import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllProperties() {
  return prisma.property.findMany();
}

export async function getPropertyManagersProperties(propertyManagerID: number) {
  return prisma.property.findMany({
    where: {
      pmProperties: {
        some: {
          userId: propertyManagerID,
        },
      },
    },
  });
}
