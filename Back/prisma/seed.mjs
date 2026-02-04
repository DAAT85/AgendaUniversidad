//El registro del admin
//?Para correr el admin, que se registre = npx prisma db seed
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
        name: 'Administrador',
        email: 'admin2@ucol.mx',
        password: 'admin0192', //Quiza cambiar despues la contraseña
        dependence: 'Sistema',
        role: 'ADMIN',
    },
})

    console.log('Admin creado')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())