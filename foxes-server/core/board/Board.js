const Tile = require('./Tile');

class Board {
    constructor(size) {
        this._size = size;
        this._diagonal = size * 2 - 1;

        this._array = new Array(this.diagonal);
        for (let i=0; i<this.diagonal; i++) {
            var currentSize = i < this.diagonal/2 
                ? size + i 
                : this.diagonal - i + Math.floor(this.diagonal/2);
            this._array[i] = new Array(currentSize);

            for (let j=0; j<currentSize; j++)
                this._array[i][j] = 0;
        }
    }

    at(x, y) {
        return this._array[this._getShiftedX(x, y)][y];
    }

    insert(x, y, elem) {
        this._array[this._getShiftedX(x, y)][y] = elem;
    }

    _getShiftedX(x, y) {
        if (y < this.shift)
            return x - (this.shift - y);

        return x;
    }

    get shift() {
        return Math.floor(this.diagonal/2);
    }

    get diagonal() {
        return this._diagonal;
    }

    get size() {
        return this._size
    }
}

module.exports = Board;