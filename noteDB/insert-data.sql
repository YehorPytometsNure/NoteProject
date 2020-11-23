USE heroku_be2ff38d4e70fc8;
INSERT INTO user(id, userEmail, userPassw)
VALUES("12", "hello@gmail.com", "123P");
INSERT INTO user(userName, userBirthDate, avatar)
VALUES("Denis", "12.01.2001", "?");
INSERT INTO notecontent(id, noteText, noteType)
VALUES("1902", "HHHHHHDSDSD", "Text");
INSERT INTO tag VALUES("99900", "Ok", "12");
UPDATE tag SET id = "999012", tagName = "Ok" WHERE idUser = (SELECT id FROM user);
INSERT INTO note(id, idUser, noteName, tagId, noteContentId, notePassword) VALUES("012", "12", "NewNote", "999012", "1902", "qwerty"); 
UPDATE note SET noteName ="Trips", notePassword = "qwerty00" 
WHERE idUser = (SELECT id FROM user) AND tagId = (SELECT id FROM tag) AND noteContentId = (SELECT id FROM notecontent);
