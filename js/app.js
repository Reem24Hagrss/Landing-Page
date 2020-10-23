/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navBar = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
const pageHeader = document.getElementsByClassName('navbar__menu')[0]
const hero = document.getElementsByClassName('main__hero')[0]

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function activeSection(params) {
    for(let section of sections){
        const rect = section.getBoundingClientRect()
        if(rect.top >= -5.8125 && rect.bottom <=window.innerHeight){
            return section;
        }
        
    }
}

const button = "<button class='top-button hidden'> <img src='img/arrow.jpg' /> </button>"
pageHeader.insertAdjacentHTML('afterend', button);
const showBut = document.getElementsByClassName('top-button')[0];

showBut.addEventListener('click', function(){
    hero.scrollIntoView({behavior : "smooth"});
    showNav(false)
})

function showTop(disp){
    if(disp == true){
        showBut.classList.remove('hidden')
    }else{
        showBut.classList.add('hidden')
    }
}

function showNav(disp) {
    if(disp == true){
        pageHeader.classList.add('show')
    }else{
        pageHeader.classList.remove('show')
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function createNav() {
    const fragement = document.createDocumentFragment();
    const logo = document.createElement('li');
    logo.textContent = "Landing Page"
    logo.className = "logo"
    fragement.appendChild(logo);
    for (let section of sections ){
        const nav = document.createElement('li');
        nav.className = "menu__link";
        nav.dataset.nav = section.id ;
        nav.textContent = section.dataset.nav;
        fragement.appendChild(nav);
    }
    navBar.appendChild(fragement);
    const links = document.getElementsByClassName('menu__link')
    links[0].classList.add('active')
}

// Add class 'active' to section when near top of viewport
function setActive() {
    const active = activeSection()  // active element
    if (active != null){
        const prev = document.getElementsByClassName('your-active-class')[0];
        prev.classList.remove('your-active-class');
        active.classList.add('your-active-class');
        const links = document.getElementsByClassName('menu__link')
        for(let link of links){
            if(link.dataset.nav === active.id){
                link.classList.add('active')
            }else{
                link.classList.remove('active')
            }
        }
    }    
}

// Scroll to anchor ID using scrollTO event
function ScrollTo() {
    navBar.addEventListener('click', function (evt) {
        const sec = document.getElementById(evt.target.dataset.nav)
        sec.scrollIntoView({behavior : "smooth"});
        setTimeout(() => {
            setActive()
        }, 1000 );
    })
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
createNav()
// Scroll to section on link click
ScrollTo()
// Set sections as active
window.addEventListener('scroll', function () {
        setActive()
        const herorect = hero.getBoundingClientRect()
        if(herorect.bottom > 0){
            showTop(false)
            showNav(false)
        }else{
            showTop(true)
        }
        showNav(true)
        setTimeout(() => {
            showNav(false)
        }, 5000);
    }
)


// collapsible script

const colls = document.getElementsByClassName("collapsible");

for ( let coll of colls) {
    coll.addEventListener("click", function() {
        this.classList.toggle("activebtn");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}