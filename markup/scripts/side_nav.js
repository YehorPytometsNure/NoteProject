// function openNav() {
//   document.getElementById("mySidenav").style.width = "250px";
// }

function openNav() {
  document.getElementById("mySidenav").style.transform = "translateX(0)";
  document.getElementById("mySidenav").style.pointerEvents = "auto";
  document.getElementById("mySidenav").style.opacity = "1";
}

// function closeNav() {
//   document.getElementById("mySidenav").style.width = "0";
// }

function closeNav() {
  document.getElementById("mySidenav").style.transform = "translateX(-166px)";
  setTimeout(() => {
    document.getElementById("mySidenav").style.opacity = "0";
  }, 500);
  document.getElementById("mySidenav").style.pointerEvents = "none";
}
