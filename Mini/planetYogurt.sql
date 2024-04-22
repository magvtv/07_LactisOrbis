-- FLAVORS

CREATE TABLE Flavors (
    id VARCHAR (255) PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(255)
);

INSERT INTO Flavors (id, name, type) VALUES
("BP005", "Blackberry Passion", "Sorbet"),
("SM010", "Strawberry Mango", "Sorbet"),
("GB015", "Grape Banana", "Sorbet"),
("PC025", "Pinaeapple Coconut", "Sorbet");


INSERT INTO Flavors (id, name, type) VALUES
("CC150", "Cookie Cream", "Plain"),
("VL125", "Vanilla", "Plain"),
("PT105", "Pistachio", "Plain"),
("CH185", "Chocolate", "Plain");

INSERT INTO Flavors (id, name, type) VALUES
("MH390", "Milk & Honey", "Limited"),
("AM385", "Almond Mocha", "Limited"),
("PT345", "Banana x Peanut Butter ", "Limited"),
("CM3155", "Candy Marshmello", "Limited");



-- LOCATION

CREATE TABLE Locations (
    id INT PRIMARY KEY,
    county VARCHAR(255),
    place VARCHAR(255)
);

INSERT INTO Locations (id, county, place) VALUES
(001, "Nairobi", "Junction Mall Parking Hall"),
(002, "Nairobi", "The Sarit Center"),
(003, "Nairobi", "Galleria"),
(004, "Nairobi", "Garden City"),
(005, "Nairobi", "United Natiions Avenue"),
(011, "Mombasa", "Nyali Center, Mkomani"),
(024, "Kisumu", "Mwalimu Junction, Lolwe Drive");