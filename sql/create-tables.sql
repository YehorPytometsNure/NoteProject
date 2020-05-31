USE heroku_be2ff38d4e70fc8;

CREATE TABLE IF NOT EXISTS User (
id CHAR(60) NOT NULL PRIMARY KEY,
userName CHAR(60),
userEmail CHAR(60) NOT NULL,
userPassw CHAR(60) NOT NULL,
userBirthDate CHAR(60),
avatar CHAR(60)
);

CREATE TABLE IF NOT EXISTS Tag(
id CHAR(60) NOT NULL PRIMARY KEY,
tagName CHAR(60) NOT NULL,
idUser CHAR(60) NOT NULL,
FOREIGN KEY(idUser) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Note(
id CHAR(60) NOT NULL PRIMARY KEY,
idUser CHAR(60) NOT NULL,
noteName CHAR(60) NOT NULL,
tagId CHAR(60) NOT NULL,
notePassword CHAR(60),
FOREIGN KEY(tagId) REFERENCES Tag(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(idUser) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS NoteContent(
id CHAR(60) NOT NULL PRIMARY KEY,
noteId CHAR(60) NOT NULL,
noteText CHAR(60) NOT NULL,
contentType CHAR(60) NOT NULL,
FOREIGN KEY(noteId) REFERENCES Note(id) ON DELETE CASCADE ON UPDATE CASCADE
);
