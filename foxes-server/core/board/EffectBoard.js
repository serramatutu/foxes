const buckets = require('buckets-js')
const BoardEffect = require('./effect/BoardEffect');
const InvalidArgumentError = require('../Errors').InvalidArgumentError;
const Point = require('../util/Point');

class ActiveBoardEffect {
    constructor(effect) {
        this._effectObject = effect;
        this._affectedTiles = new buckets.Set(ActiveBoardEffect._generateString);
    }

    bind(x, y) {
        this._affectedTiles.add(new Point(x, y));
    }

    unbind(x, y) {
        this._affectedTiles.remove(new Point(x, y));
    }

    affectsTile(x, y) {
        return this._affectedTiles.contains(new Point(x, y));
    }

    static _generateString(point) {
        return point.x+','+point.y;
    }

    get affectedTiles() {
        return this._affectedTiles;
    }

    get id() {
        return this._effectObject.id;
    }

    get active() {
        return !this._affectedTiles.isEmpty();
    }
}


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

        this._activeEffects = new buckets.Dictionary();
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

        if (!this._activeEffects.containsKey(effect))
            this._activeEffects.set(effect, new ActiveBoardEffect(effect));
        
        this._activeEffects.get(effect).bind(x, y);

        this.at(x, y).add(effect.toString());
    }

    getTilesAffected(effect) {
        if (!this._activeEffects.containsKey(effect))
            return [];

        return this._activeEffects.get(effect).affectedTiles.toArray();
    }

    remove(x, y, effect) {        
        if (!this._activeEffects.containsKey(effect))
            return false;

        this._activeEffects.get(effect).unbind(x, y);
        if (!this._activeEffects.get(effect).active)
            this._activeEffects.remove(effect);

        this.at(x, y).remove(effect.toString());
        return true;
    }

    clear(x, y) {
        this.at(x, y).forEach((effectId) => {
            this._activeEffects.get(effectId).unbind(shiftedX, y);
            if (!this._activeEffects.get(effectId).active)
                this._activeEffects.remove(effectId);
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