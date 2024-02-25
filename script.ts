import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({log: ["query"]})

async function main() {
    await prisma.user.deleteMany()
    const user = await prisma.user.create({data: {
        name: "Johnny",
        email: "JohhnyAppleSeed@yahoo.com", 
        age: 3320,
        userPreference: {
            create: {
                emailUpdates:true, 
            }
        },
        role: "ADMIN"
    },
    select: {
        name: true,
        userPreference: {
            select: { id: true}
        },
        id: true
    }

})

    const createdUsers = await prisma.user.createMany({
        data: [{
            name: "Johnny",
            email: "Shining@yahoo.com",
            age: 50
        },
        {
            name: "Johnny",
            email: "JohnSmithy@yaahoo.com",
            age: 56
        }, 
        {
            name: "AlexSnows",
            email: "AlexSnows@yahoo.com",
            age: 29
        }, 
         
    ]
    })

    // console.log("CREATED USERS", createdUsers)

    const foundUser = await prisma.user.findUnique({
        where:{
            email: 'JohhnyAppleSeed@yahoo.com'
        },
        select:{
            name: true,
            id: true,
            preferences: true
        }
    })
    const preferences = await prisma.userPreference.findMany()
    console.log(user, preferences)
    const {id} = user
    const createdPost = await prisma.post.create({data: {
        title: "The Lion the Witch and the Wardrobe",
        authorId: id,
        averageRating: 3,
        userId: id
    }})

    console.log("CREATEED POST,", createdPost)

    const foundPost = await prisma.post.findMany({
        where:{
            authorId: id
        }
    })
    console.log("Found POST", foundPost)

    const userByName_Age = await prisma.user.findUnique({
        where: {
            age_name: {name: 'Johnny', age: 3320 }
        }
    })
    console.log("USER BY NAME_AGE",userByName_Age)


    const distinctUser = await prisma.user.findMany({
        where:{
            name: "Johnny"
        }, 
        distinct: ["role"]
    })
    console.log("DISTINCT USER", distinctUser)


    const paginatedUserList = await prisma.user.findMany({
        where: {
            name: { in: ["AlexSnows", "Johnny"]},
            age: {lt: 30},
            email: {contains: "@yahoo.com"}
        },
        take: 2,
        orderBy: {
            age: "desc"
        }
    })

    console.log("Paginated Users", paginatedUserList)

}


main()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

