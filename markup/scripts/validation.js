function formValidationLogin()
{
var passid = document.registration.password;
var uemail = document.registration.email;
if(ValidatePassword(passid,7,12))
{
		if(ValidateEmail(uemail))
		{
		} 
}
return false;
}

function formValidationSignUp()
{
var passid = document.registration.password;
var passid2 = document.registration.password2;
var uname = document.registration.username;
var uemail = document.registration.email;
var birth = document.registration.dateofbirth;
if(ValidatePassword(passid,7,12))
{
	if(passid.value == passid2.value){
		if(ValidateUsername(uname))
		{
			if(ValidateEmail(uemail))
			{
				
			} 
		} 
	}
}
return false;
}

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

function ValidatePassword(passid,mx,my)
{
var passid_len = passid.value.length;
if (passid_len == 0 ||passid_len >= my || passid_len < mx)
{
alert("Password should not be empty / length be between "+mx+" to "+my);
passid.focus();
return false;
}
return true;
}

function ValidateUsername(uname)
{ 
var letters = /^[A-Za-z]+$/;
if(uname.value.match(letters))
{
return true;
}
else
{
alert('Username must have alphabet characters only');
uname.focus();
return false;
}
}

function ValidateBirth(birth){
	
}