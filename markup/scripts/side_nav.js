/*window.addEventListener('click', function(e){   
  if (!document.getElementById('module_window').contains(e.target) && IsNoteOpened){
    closeNote();
  }
});

window.addEventListener('click', function(e){   
  if (!document.getElementById('mySidenav').contains(e.target) && isNavOpened){
    closeNav();
  }
});

window.addEventListener('click', function(e){   
  if (!document.getElementById('profile_menu').contains(e.target) && isProfileMenuOpened){
    openNavProfile();
  }
});
*/
var isNavOpened = false;
function openNav() {
  document.getElementById("mySidenav").style.transform = "translateX(0)";
  document.getElementById("mySidenav").style.pointerEvents = "auto";
  
  document.getElementById("mySidenav").style.opacity = "1";
  //document.getElementById("blur").style.opacity = "0.5";
  isNavOpened = true;
  //document.getElementById("body").style.background = "darken";
}

function closeNav() {
  document.getElementById("mySidenav").style.transform = "translateX(-166px)";
  setTimeout(() => {
	document.getElementById("mySidenav").style.opacity = "0";
  }, 500);
  document.getElementById("mySidenav").style.pointerEvents = "none";
 // document.getElementById("blur").style.opacity = "1";
  isNavOpened = false;
}

var isProfileMenuOpened = false;
function openNavProfile() {
  if(isProfileMenuOpened == false){
  document.getElementById("profile_menu").style.transform = "translateY(0px)";
  document.getElementById("profile_menu").style.pointerEvents = "auto";
  document.getElementById("profile_menu").style.opacity = "1";
  document.getElementById("arrow_down").style.opacity = "0";
  setTimeout(() => {
  document.getElementById("arrow_down").src = "./pictures/arrow_up.png";
}, 1000);
  setTimeout(() => {
  document.getElementById("arrow_down").style.opacity = "1";
}, 1000);
  isProfileMenuOpened = true;
  //document.getElementById("blur").style.opacity = "0.5";
  }
  else{
  document.getElementById("profile_menu").style.transform = "translateY(-100px)";
  //setTimeout(() => {
  document.getElementById("profile_menu").style.opacity = "0";
  //}, 1000);
  document.getElementById("profile_menu").style.pointerEvents = "none";
  document.getElementById("arrow_down").style.opacity = "0";
  setTimeout(() => {
  document.getElementById("arrow_down").src = "./pictures/arrow_down.png";
}, 1000);
  setTimeout(() => {
  document.getElementById("arrow_down").style.opacity = "1";
}, 1000);
    //document.getElementById("arrow_down").src = "./pictures/arrow_down.png";
  isProfileMenuOpened = false;
 // document.getElementById("blur").style.opacity = "1";
  }
    
}


var isHidden = false;
function hideHelper() {
  if(isHidden == false){
    document.getElementById("mascot-container").style.opacity = "0";
    document.getElementById("hide_helper").innerHTML = "Show Helper";
    isHidden = true;
  }
  else{
    document.getElementById("mascot-container").style.opacity = "1";
    document.getElementById("hide_helper").innerHTML = "Hide Helper";
    isHidden = false;
  } 
}


var IsNoteOpened = false;
function openNote(){
  document.getElementById("module_window").style.opacity = "1";
  document.getElementById("blur").style.opacity = "0.5";
  IsNoteOpened = true;
}

function closeNote(){
  //document.getElementById("pop_window").style.display = "";
   setTimeout(() => {
  document.getElementById("module_window").style.opacity = "0";
 }, 500);
  document.getElementById("blur").style.opacity = "1";
  IsNoteOpened = false;
  //document.getElementById("module_window").style.display = "none";
}

function SaveNote(){
  setTimeout(() => {
  document.getElementById("module_window").style.opacity = "0";
 }, 500);
  document.getElementById("blur").style.opacity = "1";
  IsNoteOpened = false;
}

var tutorialMessages = 0;
function tutorial(){
  if(tutorialMessages < 10){
    switch(tutorialMessages){
      case 0:
          document.getElementById("message").innerHTML = "Here will be your notes. You can open and edit them";
          tutorialMessages++;
        break;
      case 1:
          document.getElementById("message").innerHTML = "To create a new note, press on the '+' or choose any sample from the side menu";
          tutorialMessages++;
          break;
      case 2:
          document.getElementById("message").innerHTML = "To delete your note, hover it and press on the X";
          tutorialMessages++;
          break;
      case 3:
          document.getElementById("message").innerHTML = "To seal your note, hover it and press on the lock";
          tutorialMessages++;
          break;
      case 4:
          document.getElementById("message").innerHTML = "To create a new tag, choose 'Create new' from the side menu";
          tutorialMessages++;
          break;
      case 5:
          document.getElementById("message").innerHTML = "Choose a tag, which is suitable for your note when you're creating it";
          tutorialMessages++;
          break;
      case 6:
          document.getElementById("message").innerHTML = "There's a bin in the side menu";
          tutorialMessages++;
          break;
      case 7:
          document.getElementById("message").innerHTML = "Your deleted notes will be stored there for 30 days";
          tutorialMessages++;
          break;
      case 8:
          document.getElementById("message").innerHTML = "To edit your profile information, choose it in the top right menu";
          tutorialMessages++;
          break;
      case 9:
          tutorialMessages++;
          document.getElementById('bubble').style.opacity = '0';
          break;
    }
  }
  
}

function mouseOverNote(){
  document.getElementById('padlock').style.opacity = '1';
  document.getElementById('delete-note').style.opacity = '1';
}

function mouseLeftNote(){
/*  window.addEventListener('click', function(e){   
  if (!document.getElementById('mySidenav').contains(e.target) && isNavOpened){
    closeNav();
  }
});*/  document.getElementById('padlock').style.opacity = '0';
  document.getElementById('delete-note').style.opacity = '0';
}

function OpenProfile(){
  document.getElementById('profile_window').style.opacity = '1'
}
/*function mouseOverLock(){
  var length = document.getElementsByClassName('note_tag').length;
  for(let i = 0; i < length; i++){
  document.getElementsByClassName('note_tag')[i].style.opacity = '0.5';
}
}*/

function sealNote(){

}

function deleteNote(){

}