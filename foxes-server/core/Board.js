class Board {
    constructor(size) {
        this._size = size;
        this._diagonal = size * 2 - 1;

        this._array = new Array(this.diagonal);
        for (let i=0; i<this.diagonal; i++) {
            var currentSize = Math.min(size + i, this.diagonal- i);
            this._array[i] = new Array(currentSize);

            for (let j=0; j<currentSize; j++)
                this._array[i][j] = 0;
        }
    }

    at(x, y) {
        return this._array[x - Math.floor(this.diagonal/2)][y];
    }

    get diagonal() {
        return this._diagonal;
    }

    get size() {
        return this._size
    }
}

module.exports = Board;