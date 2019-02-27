// Michael Macari
// Entry point
const connection = require("./data/connection")
const animals = require("./data/animals")

// Creates a main function to test animals functions
async function main() {
    // try{
    //     let newAn = await animals.create('Mortimer', 'Giraffe')
    //     //console.log(typeof newAn._id)
    //     console.log(newAn)
    // }
    // catch(e){
    //     console.log(e)
    // }

    // try{
    //     let a = await animals.getAll()
    //     console.log(a)
    // }
    // catch(e){
    //     console.log(e)
    // }

    // try{
    //     let o = await animals.get("DragonMan")
    //     console.log(o)
    // }
    // catch(e){
    //     console.log(e)
    // }

    // try{
    //     let a = await animals.remove("5c75e4c1ce3abf2d84018a95")
    //     console.log(a)
    // }
    // catch(e){
    //     console.log(e)
    // }

    try{
        let a = await animals.rename("5c770eaebc4c743b5c10431d", "John")
        console.log(a)
    }
    catch(e){
        console.log(e)
    }

    const db = await connection()
    await db.serverConfig.close();
    //console.log("Done!")

}

main()