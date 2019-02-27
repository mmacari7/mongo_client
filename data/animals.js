// Michael Macari
// Animals Data

// Sets collections to the collections file
const collections = require("./collections.js")
// Stores the animals collection function in animals
const animals = collections.animals;

// Exports all the functions for animals colleciton
module.exports = {
    // Function to create and insert new item into animals collection
    async create(name, animalType){
        // Checks that name and animal type aren't undefined
        if(!name || !animalType){
            throw("Error animals.create: One or both parameters passed are not defined")
        }
        if(typeof name !== 'string' || !name instanceof String || typeof animalType !== 'string' || !animalType instanceof String){
            throw("Error animals.create: One or both parameters are not of type string")
        }
        // Gets the animal collection
        const animalCollection = await animals()
        // Creates a new animal object for insertion
        let newAnimal = {
            name: name,
            animalType: animalType
        };
        // Gets the insertion info
        const insertInfo = await animalCollection.insertOne(newAnimal)
        // If nothing was inserted throw an error
        if(insertInfo.insertedCount === 0){
            throw("Error animals.create: Could not add the animal to collection")
        }

        const newId = insertInfo.insertedId

        const animal = await this.get(newId)
        return(animal)

    },

    // Function that gets all items in collection animals
    async getAll(){
        // Get the collection
        const animalCollection = await animals()
        // Get all from collection
        const allAnimals = await animalCollection.find({}).toArray()

        return(allAnimals)

    },
    // Function to get a specific item in animal collections by id
    async get(id){
        if(!id){
            throw("Error animals.get: id was not defined")
        }
        const animalCollection = await animals()

        const animal = await animalCollection.findOne({_id: id})
        if(!animal){
            throw("Error animals.get: No animal with that ID")
        }

        return(animal)

    },
    // Function to remove a specific animal
    async remove(id){

    },

    async rename(id, newName){

    }
}