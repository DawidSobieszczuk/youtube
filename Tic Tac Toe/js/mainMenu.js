var MainMenu = {
    casheDOM: function() {
        MainMenu.DOM = document.getElementById("mainMenu");
        MainMenu.DOMButtons = MainMenu.DOM.getElementsByTagName("div");
    },
    init: function() {
        MainMenu.casheDOM();

        for(let i = 0; i < MainMenu.DOMButtons.length; i++)
            MainMenu.DOMButtons[i].addEventListener("click", MainMenu.clickButton);
    },
    clickButton: function() {
        MainMenu.DOM.style.display = "none";
        Game.ai = this.dataset.index == 1;
    }
}