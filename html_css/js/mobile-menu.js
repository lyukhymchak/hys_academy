let hamburger = document.getElementsByClassName("hamburger-menu-logo")[0];
console.log(hamburger);
hamburger.onclick = function (){
    let navbar = document.getElementsByClassName("navbar")[0];
    console.log(navbar);
    navbar.classList.add("hamburger-menu");
    let closeBtn = document.getElementsByClassName("close-svg")[0];
    closeBtn.onclick = function () {
       navbar.classList.remove("hamburger-menu"); 
    }
};


