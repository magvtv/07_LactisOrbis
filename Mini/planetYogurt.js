const readline = require('readline')
const mysql = require('mysql')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function mainMenu() {
    console.log('Welcome to Planet Yogurt!')
    console.log('1. Flavor Finder')
    console.log('2. Location Finder')
    console.log('3. Exit')

    rl.question("Choose an option: ", (choice) => {
        switch(choice) {
            case '1':
                flavorFinder()
                break
            case '2':
                locationFinder()
                break
            case '3':
                rl.close()
                break
            default:
                console.log("Invalid choice. try again")
                mainMenu()
        }
    })
}

mainMenu()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'pharoh',
    password: 'phar0h',
    database: 'PlanetYogurtDB'
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    } 
    // console.log(`Connected to PlanetYogurtDB as ID ${db.threadId}`)
    // db.end();
})



function flavorFinder() {
    db.query('SELECT f.id, f.name, f.type, d.more_info, d.allergens FROM Flavors f JOIN FlavorDetails d ON f.id = d.flavor_id', (err, results) => {
        if (err) {
            console.log(`Error happened: ${err}`)
            return 
        }
        console.log("Flavor Finder")
        results.forEach((flavor, index) => {
            console.log(`${index + 1}. ${flavor.name} [${flavor.type}]`)
        })

        rl.question("Choose flavor based on its number: ", (choice) => {
            const selectedFlavor = results[choice - 1]
            if (selectedFlavor) {
                console.log(`Flavor details for ${selectedFlavor.name}`)
                console.log(`Description:\n${selectedFlavor.more_info}`)
                console.log(`Allergens for ${selectedFlavor.allergens}`)
            }
            else {
                console.log("Invalid choice, try again!")
            }
        })
        
    })
    // mainMenu()
}

// function locationFinder() {

// }