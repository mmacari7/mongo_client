// Michael Macari
// Module for Mongo collections

const dbConnection = require("./connection.js")

// Function to get collection if exist 
const getCollectionFn = collection => {
    let _col = undefined

    return async () => {
        if(!_col){
            // Waits for the data base connection and stores in db variable
            const db = await dbConnection()
            // Calls the collection and sets to _col
            _col = await db.collection(collection)
        }
        // Returns the collection
        return _col
    };
};

// Exports the collection "animals" and sets to animals
module.exports = {
    animals: getCollectionFn("animals")
}
