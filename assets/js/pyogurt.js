// showing menu
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    // Validate that variables exist
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show_menu')
        })
    }
}
showMenu('nav_toggle', 'nav_menu');


// removing mobile menu
const navLink = document.querySelectorAll('.nav_link')

function linkAction() {
    const navMenu = document.getElementById('nav_menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show_menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction));



// scroll section where active according to nav
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


// changing the lower end of header on scroll
function scrollHeader() {
    const nav = document.getElementById('hd_1')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 200) nav.classList.add('scroll_hdr'); else nav.classList.remove('scroll_hdr')
}
window.addEventListener('scroll', scrollHeader);


// show the icon to scroll back to top
function scrollTop() {
    const scrolltop = document.getElementById('scroll_top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrolltop.classList.add('show_scroll'); else scrolltop.classList.remove('show_scroll')
}
window.addEventListener('scroll', scrollTop)
