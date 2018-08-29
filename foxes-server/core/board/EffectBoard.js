const buckets = require('buckets-js')
const BoardEffect = require('./effect/BoardEffect');
const InvalidArgumentError = require('../Errors').InvalidArgumentError;
const HexagonGrid = require('./HexagonGrid');

function setFactory() {
    return new buckets.Set();
}

class EffectBoard {
    constructor(gridsize) {
        this._grid = new HexagonGrid(gridsize, setFactory);
        this._activeEffects = new buckets.Set();
    }

    /**
     * Inserts an effect at the specified board position
     * @param {number} x the tile X coordinate
     * @param {number} y the tile Y coordinate
     * @param {BoardEffect} effect the inserted effect
     */
    insert(x, y, effect) {
        if (!(effect instanceof BoardEffect))
            throw new InvalidArgumentError('object inserted into EffectBoard should be BoardEffect instance');

        this._grid.at(x, y).add(effect);
        this._activeEffects.add(effect);
        effect.bind(x, y);
    }

    /**
     * Removes an effect from a specific tile of the board
     * @param {number} x the tile X coordinate
     * @param {number} y the tile Y coordinate
     * @param {BoardEffect} effect the effect to be removed
     * @returns {boolean} whether the effect was removed from the board
     */
    remove(x, y, effect) {        
        if (!this._activeEffects.contains(effect))
            return false;

        this._grid.at(x, y).remove(effect);
        effect.unbind(x, y);
        if (!effect.active)
            this._activeEffects.remove(effect);

        return true;
    }

    /**
     * Clears a specific tile from all effects
     * @param {number} x the tile X coordinate
     * @param {number} y the tile Y coordinate
     */
    clear(x, y) {
        this.at(x, y).forEach((effect) => {
            effect.unbind(shiftedX, y);
            if (!effect.active)
                this._activeEffects.remove(effect);
        });

        this.at(x, y).clear();
    }

    get size() {
        return this._grid.size
    }
}

module.exports = EffectBoard;