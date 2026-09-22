import "dotenv/config";
import prisma from "../src/database/prismaClient.js";

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const shoes = await prisma.category.create({
    data: {
      name: "Schuhe",
    },
  });

  const clothing = await prisma.category.create({
    data: {
      name: "Kleidung",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Sneaker",
        price: 89.99,
        stock: 10,
        categoryId: shoes.id,
      },
      {
        name: "Stiefel",
        price: 129.99,
        stock: 5,
        categoryId: shoes.id,
      },
      {
        name: "T-Shirt",
        price: 29.99,
        stock: 20,
        categoryId: clothing.id,
      },
    ],
  });

  console.log("Seed complete");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
