const buckets = require('buckets-js')
const BoardEffect = require('./effect/BoardEffect');
const InvalidArgumentError = require('../Errors').InvalidArgumentError;
const Point = require('../util/Point');

class EffectBoard {
    constructor(size) {
        this._size = size;
        this._diagonal = size * 2 - 1;

        this._tiles = new Array(this.diagonal);
        for (let i=0; i<this.diagonal; i++) {
            var currentSize = i < this.diagonal/2 
                ? size + i 
                : this.diagonal - i + Math.floor(this.diagonal/2);
            this._tiles[i] = new Array(currentSize);

            for (let j=0; j<currentSize; j++)
                this._tiles[i][j] = new buckets.Set();
        }

        this._activeEffects = new buckets.Set();
    }

    at(x, y) {
        var shiftedX = this._getShiftedX(x, y);
        if (shiftedX < 0 || y < 0 || 
            y >= this._tiles.length || shiftedX >= this._tiles[y].length)
            throw new InvalidArgumentError('invalid board index');

        return this._tiles[shiftedX][y];
    }

    insert(x, y, effect) {
        if (!(effect instanceof BoardEffect))
            throw new InvalidArgumentError('object inserted in board must be an effect');

        this._activeEffects.add(effect);
        effect.bind(x, y);
        this.at(x, y).add(effect);
    }

    remove(x, y, effect) {        
        if (!this._activeEffects.contains(effect))
            return false;

        effect.unbind(x, y);
        if (!effect.active)
            this._activeEffects.remove(effect);

        this.at(x, y).remove(effect);
        return true;
    }

    clear(x, y) {
        this.at(x, y).forEach((effect) => {
            effect.unbind(shiftedX, y);
            if (!effect.active)
                this._activeEffects.remove(effect);
        });

        this.at(x, y).clear();
    }

    _getShiftedX(x, y) {
        if (y < this._shift)
            return x - (this._shift - y);

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

module.exports = EffectBoard;