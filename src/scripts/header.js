document.addEventListener('DOMContentLoaded', () => {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('header');

    /**
     * function used to toggle scrolled class on body
     */
    function toggleScrolled() {
        const height = selectHeader.offsetHeight;
        if (window.scrollY > height) {
            selectHeader.classList.remove('bg-transparent');
            selectHeader.classList.add('bg-neutral');
            selectBody.classList.add('scrolled');
        } else {
            selectHeader.classList.remove('bg-neutral');
            selectHeader.classList.add('bg-transparent');
            selectBody.classList.remove('scrolled');
        }
    }

    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);

    // if we click on hamburger on page start the header background need to be changed 
    const menuCheckbox = document.getElementById('drawer-toggle');
    menuCheckbox.addEventListener("change", () => {
        if (menuCheckbox.checked) {
            selectHeader.classList.remove('bg-transparent');
            selectHeader.classList.add('bg-neutral');
            selectBody.classList.add('scrolled');
        } else {
            const height = selectHeader.offsetHeight;
            if (window.scrollY < height) {
                selectHeader.classList.remove('bg-neutral');
                selectHeader.classList.add('bg-transparent');
                selectBody.classList.remove('scrolled');
            }
        }
    });

    // we need to close the menu on menu item click
    const menuItems = document.querySelectorAll('ul.menu a');
    for(const menuItem of menuItems) {
        menuItem.addEventListener("click", () => {
            if (menuCheckbox.checked) {
                menuCheckbox.click();
            }
        });
    }


    const sections = document.querySelectorAll("section");
    const menu_links = document.querySelectorAll(".menu-horizontal a");
    const menu_links_mobile = document.querySelectorAll("aside.drawer-side ul.menu a");
    const sectionMargin = 200;
    let currentActive = 0;

    function scrollSpy() {
        const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin) - 1;
        const makeActive = (link) => menu_links[link].classList.add("active");
        const removeActive = (link) => menu_links[link].classList.remove("active");
        const removeAllActive = () => [...Array(sections.length).keys()].forEach((link) => removeActive(link));
        const makeActiveMobile = (link) => menu_links_mobile[link].classList.add("active");
        const removeActiveMobile = (link) => menu_links_mobile[link].classList.remove("active");
        const removeAllActiveMobile = () => [...Array(sections.length).keys()].forEach((link) => removeActiveMobile(link));
        if (current !== currentActive) {
            removeAllActive();
            removeAllActiveMobile();
            currentActive = current;
            makeActive(current);
            makeActiveMobile(current);
        }
    }

    document.addEventListener('scroll', scrollSpy);
    window.addEventListener('load', scrollSpy);
});

function changeSvgFillColor(elements, color) {
    for (let element of elements) {
        element.setAttribute('fill', color);
    }
}
