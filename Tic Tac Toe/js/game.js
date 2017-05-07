var CellState = {
    B: 0,
    X: 1,
    O: 2
}

var winMatrix = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]    
];

var Game = {
    board: [],
    tour: CellState.X,
    ai: false,

    casheDOM: function() {
        Game.DOM = document.getElementById("game");
        Game.DOMCells = Game.DOM.getElementsByClassName("cell");
        Game.DOMEndLine = Game.DOM.getElementsByClassName("line")[0];
        Game.DOMTour = Game.DOM.getElementsByClassName("tour")[0];
    },
    init: function() {
        Game.casheDOM();
        Game.initBoard();

        for(let i = 0; i < Game.board.length; i++)
            Game.DOMCells[i].addEventListener("click", Game.clickCell);
        
        Game.DOMTour.innerHTML = Game.cellStateToText(Game.tour) + " Tour";
    },
    clickCell: function() {
        this.removeEventListener("click", Game.clickCell);
        Game.setCell(this.dataset.index, Game.tour);

        Game.tour = (Game.tour%2)+1;
        Game.DOMTour.innerHTML = Game.cellStateToText(Game.tour) + " Tour";
        
        if(Game.checkWin(Game.board, CellState.X) || Game.checkWin(Game.board, CellState.O) || Game.checkFull(Game.board)) {
            OverMenu.DOM.style.display = "flex";
        }

        if(Game.ai && Game.tour == CellState.O) Game.callAI();
    },
    initBoard: function() {
        for(let i = 0; i < 9; i++)
            Game.board[i] = CellState.B;
    },
    setCell: function(index, state) {
        Game.board[index] = state;
        Game.DOMCells[index].className += " " + Game.cellStateToText(state);
        if(state == CellState.B) 
            Game.DOMCells[index].className = "cell";
    },
    cellStateToText: function(state) {
        if(state == CellState.X) return "X";
        return "O";
    },

    // AI
    callAI: function() {
        Game.moveAI(Game.board, 0, CellState.O);
    },
    moveAI: function(board, depth, player) {
        let opponent = (player%2)+1;

        if(Game.checkWin(board, opponent, false))
            return -10 + depth;

        if(Game.checkFull(board))
            return 0;

        let max = -Infinity;
        let index = 0;
        for(let i = 0; i < 9; i++) {
            if(board[i] == CellState.B) {
                let newBoard = board.slice();
                newBoard[i] = player;

                let moveVal = -Game.moveAI(newBoard, depth+1, opponent);

                if(moveVal > max) {
                    max = moveVal;
                    index = i;
                }
            }
        }

        if(depth == 0)
            Game.DOMCells[index].click();

        return max;
    },

    // Game Logic
    reset: function() {
        for(let i = 0; i < Game.board.length; i++) {
            Game.setCell(i, CellState.B);
            Game.DOMCells[i].addEventListener("click", Game.clickCell);;
        }
        Game.DOMEndLine.className = "line";

        if(Game.tour == CellState.O && Game.ai) Game.callAI();
    },
    checkFull: function(board) {
        for(let i = 0; i < board.length; i++) {
            if(board[i] == CellState.B) return false;
        }
        return true;
    },
    checkWin: function(board, player, drawEndLine = true) {
        for(let x = 0; x < 8; x++) {
            let win = true;

            for(let y = 0; y < 3; y++) {
                if(board[winMatrix[x][y]] != player) {
                    win = false;
                    break;
                }
            }

            if(win) {
                if(drawEndLine) Game.drawEndLine(x);
                return true;
            }
        }
        return false;
    },
    drawEndLine: function(index) {
        if(index < 3)
            Game.DOMEndLine.className += " endH"+index;
        else if(index < 6)
            Game.DOMEndLine.className += " endV"+(index-3);
        else 
            Game.DOMEndLine.className += " endD"+(index-6);
    } 
}