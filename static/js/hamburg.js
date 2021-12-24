window.onload=function(){
    const hamburger = document.querySelector(".hamburger");
    const menuLinks = document.querySelector(".nav-link");
    const navLinks = document.querySelectorAll("#nav-list");

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menuLinks.classList.toggle('active');
    })

    navLinks.forEach(n => n.addEventListener("click", closeMenu));
    function closeMenu() {
        hamburger.classList.remove("active");
        menuLinks.classList.remove("active");
    }
}