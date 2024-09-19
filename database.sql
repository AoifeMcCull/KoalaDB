create table "koalas" ("id" SERIAL primary KEY, "name" varchar, "favorite_color" varchar, "age" integer, "ready_to_transfer" boolean, "notes" varchar)

INSERT INTO "koalas" 
	("name", "favorite_color", "age", "ready_to_transfer", notes)
	values
	('Scotty', 'Red', 4, true, 'Born in Guatemala'),
	('Jean', 'Green', 5, true, 'Allergic to lots of lava'),
	('Ororo', 'Yellow', 7, false, 'Loves listening to Paula (Abdul)'),
	('K''Leaf', 'Purple', 15, false, 'Never refuses a treat.'),
	('Charlie', 'Orange', 9, true, 'Favorite band is Nirvana'),
	('Betsy', 'Blue', 4, true, 'Has a pet iguana')
	
	select * from koalas