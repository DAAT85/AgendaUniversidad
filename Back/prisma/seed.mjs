//El registro del admin
//?Para correr el admin, que se registre = npx prisma db seed
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    await prisma.user.createMany({
        data: [
            {
                name: 'Administrador',
                email: 'admin2@ucol.mx',
                password: 'admin0192',
                dependence: 'Sistema',
                role: 'ADMIN'
            },
            {
                name: 'Moderador',
                email: 'moderador@ucol.mx',
                password: 'mod0192',
                dependence: 'Sistema',
                role: 'MOD'
            },
            {
                name: 'Profesor',
                email: 'profesor@ucol.mx',
                password: 'teacher0192',
                dependence: 'Sistema',
                role: 'TEACHER'
            }
        ],
        skipDuplicates: true 
    })

    console.log('Admin creado')
}



main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())