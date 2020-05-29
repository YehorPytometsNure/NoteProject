package ua.nure.sealthenote.models.user;

public class User {

    private String id;
    private String name;
    private String email;
    private String password;
    private String birthDate;

    //reference to file in upload folder.
    private String avatar;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
        id = null;
        birthDate = null;
        name = null;
        avatar = null;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
