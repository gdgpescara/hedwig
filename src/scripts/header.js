document.addEventListener('DOMContentLoaded', () => {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('header');

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


    const sections = document.querySelectorAll("section");
    const menu_links = document.querySelectorAll(".menu-horizontal a");
    const sectionMargin = 200;
    let currentActive = 0;

    function scrollSpy() {
        const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin) - 1;
        const makeActive = (link) => menu_links[link].classList.add("active");
        const removeActive = (link) => menu_links[link].classList.remove("active");
        const removeAllActive = () => [...Array(sections.length).keys()].forEach((link) => removeActive(link));
        if (current !== currentActive) {
            removeAllActive();
            currentActive = current;
            makeActive(current);
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
