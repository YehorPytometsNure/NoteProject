USE heroku_be2ff38d4e70fc8;
DELETE FROM notecontent WHERE notecontent.id = (SELECT noteContentId FROM note);
DELETE FROM tag WHERE idUser = (SELECT id FROM USER);
DELETE FROM user;
DELETE FROM note;