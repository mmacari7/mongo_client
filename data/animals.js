// Michael Macari
// Animals Data

// Sets collections to the collections file
const mongo = require("mongodb")
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
        // Checks if id is undefined
        if(!id){
            throw("Error animals.get: id was not defined")
        }

        // Gets the collection from the database
        const animalCollection = await animals()

        if(typeof id !== 'string' && typeof id !== 'object'){
            throw("Error animals.get: Invalid id type passed in")
        }

        // If the id passed is not already a mongo id object, we attempt to make it one, otherwise throw
        let newId
        if(typeof(id) !== 'object'){
            
            try{
                newId = new mongo.ObjectID(id)
            }
            catch(e){
                throw("Error animals.get: Invalid ID")
            }
        }
        else{
            newId = id
        }
        
        // Try to find the animal in the data base with the ID throw error if not in db
        let animal
        try{
            animal = await animalCollection.findOne({_id: newId})
        }
        catch(e){
            throw("Error animals.get: No animal with that ID")
        }

        // If no animal is returned, then throw
        if(!animal){
            throw("Error animals.get: No animal with that ID")
        }

        return(animal)

    },
    // Function to remove a specific animal
    async remove(id){
        // Check id exists
        if(!id){
            throw("Error animals.remove: id was not defined")
        }
        // Checks that the input id is string
        if(typeof(id) !== 'string' && typeof id !== 'object'){
            throw("Error animals.remove: Invalid ID type")
        }


        // Get the collection
        const animalCollection = await animals()


        // Convert string to mongo ObjectID if not already Object
        let newId
        if(typeof(id) !== 'object'){
            
            try{
                newId = new mongo.ObjectID(id)
            }
            catch(e){
                throw("Error animals.get: Invalid ID")
            }
        }
        else{
            newId = id
        }

        // Get the animal at ID
        const animal = await this.get(newId)

        // Attempt deltion
        const deletionInfo = await animalCollection.removeOne({_id: newId})

        // Throw error if deletion was not possible
        if(deletionInfo.deletedCount === 0){
            throw("Error animals.remove: Could not delete animal")
        }

        return({"deleted": true, "data": animal})

    },

    async rename(id, newName){
        // Check ID definition
        if(!id){
            throw("Error animals.rename: id was not defined")
        }

        if(typeof id !== 'string' && typeof id !== 'object'){
            throw("Error animals.rename: id passed not correct type")
        }

        // Check that a new name was passed
        if(!newName){
            throw("Error animals.rename: No new name was provided")
        }
        if(typeof newName !== 'string'){
            throw("Error animals.rename: The name provided was not of type string")
        }

        // Get the animals
        const animalCollection = await animals()

        // Convert the id string to a mongo ObjectID in try catch if not object
        let newId
        if(typeof(id) !== 'object'){
            
            try{
                newId = new mongo.ObjectID(id)
            }
            catch(e){
                throw("Error animals.get: Invalid ID")
            }
        }
        else{
            newId = id
        }

        // Get the animal at the ID
        let animal = await this.get(newId)

        // Create the new item to insert with the changed name at ID
        let update = {$set: {
            name:newName,
            animalType: animal.animalType
        }};

        // Perform the update
        const updateInfo = await animalCollection.updateOne({_id: newId}, update)

        // If nothing was updated throw
        if(updateInfo.modifiedCount === 0){
            throw("Error animals.rename: Could not update animal, possible duplicate")
        }

        // Return the newly updated animal at the ID
        return(await this.get(newId))
    }
}