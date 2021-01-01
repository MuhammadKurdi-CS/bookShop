 -- The data belown is required to create the homepage for the Book Shop assignment
CREATE TABLE IF NOT EXISTS books(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    customerID INTEGER, 
    bookName TEXT,
    authorName TEXT,
    price INTEGER,
    images TEXT,
    description TEXT,
    EAN INTEGER
    );

INSERT INTO books (customerId, bookName, authorName, price, images, description, EAN)
    VALUES (1, "Bob the Builder story", "Brenda Apsley", 5, "bobthebuilder.jpg", "Join in the fun with Bob the Builder and his team of building machines in this extra special collection of stories.", 0934852674234);
INSERT INTO books (customerId, bookName, authorName, price, images, description, EAN)
    VALUES (2, "Cracking the Coding Interview", "Gayle Laakmann McDowell", 10, "cracking.jpg", "I am not a recruiter. I am a software engineer. And as such, I know what it's like to be asked to whip up brilliant algorithms on the spot and then write flawless code on a whiteboard.", 8367912736347);
INSERT INTO books (customerId, bookName, authorName, price, images, description, EAN)
    VALUES (3, "Harry Hill's Whopping great joke box", "Harry Hill", 7, "harryhill.jpg", "A treat for Harry Hill fans! Britain's favourite comedian, Harry Hill, loves jokes so much that he has put together a side-splitting joke book for all the family", 0196773546723);