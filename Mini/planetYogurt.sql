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


-- FLAVOR DETAILS
CREATE TABLE FlavorDetails (
    flavor_id VARCHAR(255) PRIMARY KEY,
    more_info TEXT,
    allergens VARCHAR(255)
);


INSERT INTO FlavorDetails(flavor_id, more_info, allergens) VALUES
("AM385", 
"Delightful blend of nutty almond and rich mocha flavors, offering a creamy and indulgent taste with a hint of coffee",
"contains dairy and nuts"),
("BP005", 
"Tangy and sweet combination featuring the bold flavor of blackberries with a touch of tropical passion fruit, creating a refreshing and vibrant taste experience",
"none"),
("CC150", 
"Classic favorite featuring the irresistible taste of cookie cream, infused with crumbled Oreo cookies for a satisfying crunch and creamy texture",
"contains dairy, gluten"),
("CH185", 
"Timeless and decadent flavor that delivers the smooth and velvety richness of premium chocolate, perfect for chocolate lovers",
"contains dairy"),
("CM815", 
"Playful and whimsical flavor inspired by marshmallows and candy, offering a sweet and fluffy taste reminiscent of childhood treats",
"none"),
("GB015", 
"Unique fusion of sweet grape and creamy banana, creating a harmonious blend of fruity flavors with a creamy finish",
"none"),
("MH390", 
"Comforting and soothing flavor combination that pairs the creamy essence of milk with the delicate sweetness of honey, offering a smooth and mellow taste",
"contains dairy"),
("PC025", 
"Tropical delight featuring the juicy and tangy essence of pineapple combined with the creamy, tropical notes of coconut, evoking a refreshing island getaway",
"none"),
("PT105", 
"Nutty and sophisticated flavor with the distinctive taste of pistachios, delivering a rich and creamy texture with a hint of saltiness",
"contains nuts"),
("PB345", 
"Delightful marriage of creamy banana and rich peanut butter, offering a luscious and nutty flavor profile with a hint of sweetness",
"contains nuts"),
("SM010", 
"Vibrant and fruity combination of ripe strawberries and juicy mangoes, delivering a burst of sweet and tangy flavors with a tropical twist",
"none"),
("VL125", 
"Classic and timeless flavor that embodies the rich and creamy taste of pure vanilla, offering a smooth and comforting indulgence",
"none");

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