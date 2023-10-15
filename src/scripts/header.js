document.addEventListener('DOMContentLoaded', () => {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('header');
    
    const firstSection = document.querySelector('header + section');

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
            if (!firstSection || !firstSection.classList.contains('section-white')) {
                selectHeader.classList.add('black');
            }
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
});

function changeSvgFillColor(elements, color) {
    for (let element of elements) {
        element.setAttribute('fill', color);
    }
}
