const InvalidArgumentError = require('../Errors').InvalidArgumentError;

/**
 * Represents a hexagon grid full of items of any type
 */
class HexagonGrid {
    /**
     * Constructs a HexagonGrid instance
     * @param {number} size the size of the side of the grid
     * @param {function} defaultValueFactory the value factory to populate the grid at first. Should receive
     * x and y as arguments, in grid coordinates
     */
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
                this._tiles[i][j] = defaultValueFactory(this._getGridX(i, j), j);
        }
    }

    /**
     * Accesses the specified grid position
     * @param {number} x the X grid coordinate
     * @param {number} y the Y grid coordinate
     */
    at(x, y) {
        return this._tiles[this._getArrayX(x, y)][y];
    }

    /**
     * Inserts a value at the specified grid position
     * @param {number} x the X grid coordinate
     * @param {number} y the Y grid coordinate
     * @param {*} value the value to be inserted
     */
    insert(x, y, value) {
        this._tiles[this._getArrayX(x, y)][y] = value;
    }

    /**
     * @private
     * Get underlying array coordinates based on grid coordinates
     * @param {number} x the X grid coordinate
     * @param {number} y the Y grid coordinate
     */
    _getArrayX(x, y) {
        if (y < this._shift)
            x -= this._shift - y;

        if (x < 0 || y < 0 || y >= this._tiles.length || x >= this._tiles[y].length)
            throw new InvalidArgumentError('invalid board index');

        return x;
    }

    /**
     * @private
     * Get grid coordinates based on underlying array coordinates
     * @param {number} x the X array coordinate
     * @param {number} y the Y array coordinate
     */
    _getGridX(x, y) {
        if (y < this._shift)
            x += this._shift - y;

        return x;
    }

    /**
     * @private
     * The underlying array's shift
     */
    get _shift() {
        return Math.floor(this.diagonal/2);
    }

    /**
     * The grid's diagonal length
     */
    get diagonal() {
        return this._diagonal;
    }

    /**
     * The grid's side length
     */
    get size() {
        return this._size
    }
}

module.exports = HexagonGrid;