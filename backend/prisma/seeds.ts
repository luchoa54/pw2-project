import { PrismaClient } from "@prisma/client";
import { UserTypes } from "../src/resources/user/userType/userType.constants";

const prisma = new PrismaClient();

async function main() {
  await prisma.userType.createMany({
    data: [
      { id: UserTypes.ADMIN, label: "admin" },
      { id: UserTypes.CLIENT, label: "client" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Tipos de usuário criados.");

  await prisma.product.createMany({
    data: [
      {
        name: "Notebook Gamer Alien",
        description: "Processador i9, 32GB RAM, SSD 1TB, RTX 4080.",
        price: 12500.00,
        stock: 5,
        status: 1
      },
      {
        name: "Mouse Sem Fio Logitech",
        description: "Ergonômico, bateria de longa duração e precisão óptica.",
        price: 150.90,
        stock: 50,
        status: 1
      },
      {
        name: "Teclado Mecânico RGB",
        description: "Switches Blue, iluminação LED customizável e anti-ghosting.",
        price: 320.50,
        stock: 30,
        status: 1
      },
      {
        name: "Monitor Ultrawide 29",
        description: "Monitor LG Full HD IPS, ideal para multitarefas.",
        price: 1200.00,
        stock: 15,
        status: 1
      },
      {
        name: "Cadeira Gamer Confort",
        description: "Reclinável, com almofadas para lombar e pescoço.",
        price: 899.00,
        stock: 10,
        status: 1
      },
      {
        name: "Headset Noise Cancelling",
        description: "Fone de ouvido com cancelamento de ruído ativo.",
        price: 450.00,
        stock: 25,
        status: 1
      }
    ],
    skipDuplicates: true,
  });

  console.log("✅ Produtos criados com sucesso.");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })