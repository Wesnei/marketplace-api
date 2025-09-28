import { PrismaClient } from "@prisma/client";
import { hash } from 'bcryptjs';

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await hash('123456', 10);

  const user = await prisma.user.upsert({
    where: { email: 'john@doe.com' }, 
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@doe.com',
      password: hashedPassword,
      phone: '1234567890',
      cpf: '1234567890',
      role: 'ADMIN'
    }
  });

  console.log('User created or already exists:', user); 
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