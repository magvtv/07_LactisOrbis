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
    db.query('SELECT * FROM Flavors', (err, results) => {
        if (err) {
            console.log(`Error happened: ${err}`)
            return 
        }
        console.log("Flavor Finder\n")
        results.forEach((flavor, index) => {
            console.log(`${index + 1}. ${flavor.name} [${flavor.type}]`)
        })
        console.log("Choose your flavor (based on its number): ")
    })
    // mainMenu()
}

// function locationFinder() {

// }