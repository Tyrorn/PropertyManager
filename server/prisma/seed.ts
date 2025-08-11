import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

//Set up mock data
async function main() {
  await prisma.booking.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.pMProperties.deleteMany();

  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

  //Set up mock user data
  const data = [
    {
      id: 1,
      username: "PM - Dennis",
      password: await bcrypt.hash("DENNIS", 10),
      role: "Property Manager",
      contactNumber: "0211234567",
    },
    {
      id: 2,
      username: "PM - Mac",
      password: await bcrypt.hash("karate", 10),
      role: "Property Manager",
      contactNumber: "0217654321",
    },
    {
      id: 3,
      username: "Tenant - Charlie",
      password: await bcrypt.hash("milkSteak", 10),
      role: "Tenant",
      contactNumber: "021148677",
    },
    {
      id: 4,
      username: "Tenant - Frank",
      password: await bcrypt.hash("password1", 10),
      role: "Tenant",
      contactNumber: "021876587",
    },
  ];
  await prisma.user.createMany({
    data,
  });

  await prisma.property.createMany({
    data: [
      {
        id: 1,
        name: "Sunny Apartment",
        address: "123 Main Street",
        imageUrl: "/property1.jpg",
      },
      {
        id: 2,
        name: "illow Heights",
        address: "123 Hook Street",
        imageUrl: "/property2.jpg",
      },
      {
        id: 3,
        name: "Oceanview Retreat",
        address: "78 Victoria Street",
        imageUrl: "/property3.jpg",
      },
      // {
      //   id: 4,
      //   name: "Maple Grove Villa",
      //   address: "32 Te Aro Street",
      //   imageUrl: "/property4.jpg",
      // },
      // {
      //   id: 5,
      //   name: "Sunset Ridge Estate",
      //   address: "98 Whare Street",
      //   imageUrl: "/property5.jpg",
      // },
    ],
  });

  await prisma.pMProperties.createMany({
    data: [
      {
        userId: 1,
        propertyId: 1,
      },
      {
        userId: 1,
        propertyId: 2,
      },

      {
        userId: 2,
        propertyId: 2,
      },
      {
        userId: 2,
        propertyId: 3,
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
