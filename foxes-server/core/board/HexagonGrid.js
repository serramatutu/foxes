const InvalidArgumentError = require('../Errors').InvalidArgumentError;

class HexagonGrid {
    constructor(size, defaultValueFactory) {
        defaultValueFactory = defaultValueFactory || function() {
            return null;
        };

        this._size = size;
        this._diagonal = size * 2 - 1;

        this._tiles = new Array(this.diagonal);
        for (let i=0; i<this.diagonal; i++) {
            var currentSize = i < this.diagonal/2 
                ? size + i 
                : this.diagonal - i + Math.floor(this.diagonal/2);
            this._tiles[i] = new Array(currentSize);

            for (let j=0; j<currentSize; j++)
                this._tiles[i][j] = defaultValueFactory();
        }
    }

    at(x, y) {
        return this._tiles[this._getShiftedX(x, y)][y];
    }

    insert(x, y, value) {
        this._tiles[this._getShiftedX(x, y)][y] = value;
    }

    _getShiftedX(x, y) {
        if (y < this._shift)
            x -= this._shift - y;

        if (x < 0 || y < 0 || 
            y >= this._tiles.length || x >= this._tiles[y].length)
            throw new InvalidArgumentError('invalid board index');

        return x;
    }

    get _shift() {
        return Math.floor(this.diagonal/2);
    }

    get diagonal() {
        return this._diagonal;
    }

    get size() {
        return this._size
    }
}

module.exports = HexagonGrid;