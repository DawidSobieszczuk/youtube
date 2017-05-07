var OverMenu = {
    casheDOM: function() {
        OverMenu.DOM = document.getElementById("overMenu");
        OverMenu.DOMButtons = OverMenu.DOM.getElementsByTagName("div");
    },
    init: function() {
        OverMenu.casheDOM();

        for(let i = 0; i < OverMenu.DOMButtons.length; i++)
            OverMenu.DOMButtons[i].addEventListener("click", OverMenu.clickButton);
    },
    clickButton: function() {
        OverMenu.DOM.style.display = "none";
        Game.reset();
        if(this.dataset.index == 1) 
            MainMenu.DOM.style.display = "flex";
    }
}