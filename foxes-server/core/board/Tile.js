const buckets = require('buckets-js');
const TileStats = require('./TileStats');

class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this._effects = new buckets.Set();
        this.stats = new TileStats();
    }

    toString() {
        return `(${this.x},${this.y})`;
    }

    /**
     * Adds an effect to this tile
     * This method only adds the reference but does not change TileStats.
     * @see {@link BoardEffect.bind}
     * @param {BoardEffect} effect the effect to be added
     */
    add(effect) {
        this._effects.add(effect);
    }

    /**
     * Removes an effect from this tile
     * This method only removes the reference but does not undo effect TileStats changes.
     * @see {@link BoardEffect.unbind}
     * @param {BoardEffect} effect the effect to be removed
     */
    remove(effect) {
        this._effects.remove(effect);
    }
}

module.exports = Tile;