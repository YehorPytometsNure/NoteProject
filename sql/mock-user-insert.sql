USE sealthenote;

DELETE FROM User WHERE id LIKE "mock-id%";

INSERT INTO User(id, userEmail, userPassw, userName, userBirthDate, avatar)
VALUES("mock-id", "yehor.pytomets@nure.ua", "qwerty123A", "Denis", "2001-01-12", "avatar-mock-id.jpg");

INSERT INTO User(id, userEmail, userPassw)
VALUES("mock-id-2", "yehor.pytomets@nure.ua", "qwerty123AB");
