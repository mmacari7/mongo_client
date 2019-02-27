// Michael Macari
// Entry point
const connection = require("./data/connection")
const animals = require("./data/animals")

// Creates a main function to test animals functions
async function main() {
    try{
        let newAn = await animals.create('taco', 'salad')
        //console.log(newAn)
    }
    catch(e){
        console.log(e)
    }

    try{
        let a = await animals.getAll()
        console.log(a)
    }
    catch(e){
        console.log(e)
    }


    const db = await connection()
    await db.serverConfig.close();
    console.log("Done!")

}

main()