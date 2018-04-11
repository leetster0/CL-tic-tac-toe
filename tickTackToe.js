var Game = function(n, playerSymbols) {
  this.ongoing = true;
  this.currentPlayer = 0;
  this.playerSymbols = playerSymbols;
  this.board = [];
  this.n = n;
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row.push('.');
    }
    this.board.push(row);
  }
  console.log('\nWelcome to Tick-Tack-Toe!');
  console.log('To place a token, enter coordinates like so:');
  console.log('0,0');
  console.log('This will put a token in the upper left corner.');
  console.log('To quit, press Ctrl + C');
  console.log('Enjoy!\n');
};

Game.prototype.renderBoard = function() {
  for (var i = 0; i < this.board.length; i++) {
    var row = [];
    for (var j = 0; j < this.board[0].length; j++) {
      row.push(this.board[i][j]);
    }
    console.log(row.join('  '));
  }
  var symbol = this.playerSymbols[this.currentPlayer];
  console.log('\nPlayer', symbol + '\'s Turn');
};

Game.prototype.checkForDiagWin = function() {
  var temp1 = this.board[0][0];
  var temp2 = this.board[0][this.n - 1];
  var isWin1 = true;
  var isWin2 = true;
  for (var i = 0; i < this.n; i++) {
    var j1 = i;
    var j2 = this.n - 1 - i;
    if (this.board[i][j1] === '.' || this.board[i][j1] !== temp1) {
      isWin1 = false;
    }
    if (this.board[i][j2] === '.' || this.board[i][j2] !== temp2) {
      isWin2 = false;
    }
  }
  return isWin1 || isWin2;
}

Game.prototype.checkForRowColWin = function() {
  for (var i = 0; i < this.n; i++) {
    var isWinRow = true;
    var isWinCol = true;
    var tempRow = this.board[i][0];
    var tempCol = this.board[0][i];
    for (var j = 0; j < this.n; j++) {
      if (this.board[i][j] === '.' || this.board[i][j] !== tempRow) {
        isWinRow = false;
      }
      if (this.board[j][i] === '.' || this.board[j][i] !== tempCol) {
        isWinCol = false;
      }
    }
    if (isWinRow || isWinCol) {
      return true;
    }
  }
  return false;
}

Game.prototype.placeSymbol = function(i, j) {
  if (this.ongoing && this.board[i][j] === '.') {
    var symbol = this.playerSymbols[this.currentPlayer];
    this.board[i][j] = symbol;
    if (this.checkForDiagWin() || this.checkForRowColWin()) {
      console.log('Victory for Player', symbol);
      this.ongoing = false;
      return;
    }
    this.currentPlayer = (this.currentPlayer + 1) % this.playerSymbols.length;
    this.renderBoard();
  }
  
}

var game = new Game(3, ['X', 'O']);
game.renderBoard();


process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  var input = process.stdin.read();
  if (input !== null) {
    var coordinates = input.split('\n')[0].split(',');
    game.placeSymbol(coordinates[0], coordinates[1]);
  }
});