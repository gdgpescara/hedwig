document.addEventListener("DOMContentLoaded", (event) => {
    const paneParents = document.querySelectorAll(".pane-parent");
    const activePaneIndex = {};

    paneParents.forEach((parent, parentIndex) => {
        const panes = parent.querySelectorAll('.pane');
        const buttonSelector = 'div:first-child>a:first-child';
        activePaneIndex[parentIndex] = 0;
        panes.forEach((pane, index) => {
            panes[0].querySelector(buttonSelector).setAttribute('tabindex', -1);
            pane.addEventListener("click", () => {
                panes[activePaneIndex[parentIndex]].querySelector(buttonSelector).removeAttribute('tabindex');
                panes[activePaneIndex[parentIndex]].classList.remove("active");
                activePaneIndex[parentIndex] = index;
                panes[index].querySelector(buttonSelector).setAttribute('tabindex', -1);
                panes[index].classList.add("active");
            });
        });
    });
})