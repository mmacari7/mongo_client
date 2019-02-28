// Michael Macari
// Entry point
const connection = require("./data/connection")
const animals = require("./data/animals")
const mongo = require("mongodb")

// Creates a main function to test animals functions
async function main() {
    // 1. Create an animal named Sasha with the type of Dog
    let sasha = await animals.create('Sasha', 'Dog')

    // 2. Log the newly created animal
    console.log(sasha)

    // 3. Create an animal named Lucy, with the type of Dog
    let lucy = await animals.create('Lucy', 'Dog')

    // 4. Query all animals, and log them all
    let allAnimals = await animals.getAll()
    console.log(allAnimals)

    // 5. Create an animal named Duke, with a type of Walrus
    let duke = await animals.create('Duke', 'Walrus')

    // 6. Log the newly created Duke
    console.log(duke)
    
    // 7. Rename Sasha to Sashita
    let sashita = await animals.rename(sasha._id, "Sashita")

    // 8. Log the newly named Sashita
    console.log(sashita)

    // 9. Remove Lucy
    let remLucy = await animals.remove(lucy._id)

    // 10. Query all animals, log them all
    allAnimals = await animals.getAll()
    console.log(allAnimals)

    const db = await connection()
    await db.serverConfig.close();
    

}

main()