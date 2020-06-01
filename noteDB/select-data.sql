USE heroku_be2ff38d4e70fc8;
SELECT * FROM tag WHERE idUser = (SELECT id FROM user);
SELECT * FROM note
WHERE noteName = "" AND idUser = (SELECT id FROM user);
SELECT * FROM note
WHERE idUser = (SELECT id FROM user);
SELECT * FROM user WHERE userEmail = “*” AND userPassw = “*”;