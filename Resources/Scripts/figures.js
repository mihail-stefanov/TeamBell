var figures = [
    // L-figure
    [[1, 0],
        [1, 0],
        [1, 1]],
    // J-figure
    [[0, 1],
        [0, 1],
        [1, 1]],
    // O-figure
    [[1, 1],
        [1, 1]],
    // I-figure
    [[1],
        [1],
        [1],
        [1]],
    // T-figure
    [[1, 0],
        [1, 1],
        [1, 0]],
    // Z-figure
    [[1, 1, 0],
        [0, 1, 1]],
    // S-figure
    [[0, 1, 1],
        [1, 1, 0]]
];

function Figure(index) {
    this.color = 0;
    this.y = -4;
    this.x = 4;
    this.matrix = figures[index];
}

Figure.prototype.rotate = function() {
    var temp = [];

    for (var i = 0; i < this.matrix[0].length; i++) {
        temp[i] = [];
        for (var j = 0; j < this.matrix.length; j++) {
            temp[i][this.matrix.length - j - 1] = this.matrix[j][i];
        }
    }

    return temp;
}


function generateFigure() {
    var piece;
    var figureTypeIndex = Math.floor(Math.random() * 7);
    var pieceColor = Math.floor(Math.random());

    piece = new Figure(figureTypeIndex);
    piece.color = pieceColor;
    return piece;
}