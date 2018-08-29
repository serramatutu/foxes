const buckets = require('buckets-js');
const Point = require('../../util/Point');

/**
 * Describes an effect that took/is taking place in the board
 */
class BoardEffect {
    /**
     * Constructs this object
     * @param {UniqueIdGenerator} idGenerator the idGenerator used to make this Object's unique ID
     */
    constructor(idGenerator) {
        this._id = idGenerator.generate([this.constructor.name]);
        this._affectedTiles = new buckets.Set();
    }

    toString() {
        return this._id;
    }

    /**
     * Whether this effect is currently affecting any tiles
     * @returns {boolean}
     */
    get active() {
        return !this._affectedTiles.isEmpty();
    }

    /**
     * Binds this effect to a tile
     * @param {number} x the X position
     * @param {number} y the Y position
     */
    bind(x, y) {
        this._affectedTiles.add(new Point(x, y));
    }

    /**
     * Unbinds this effect from a tile
     * @param {number} x the X position
     * @param {number} y the Y position
     */
    unbind(x, y) {
        this._affectedTiles.remove(new Point(x, y));
    }

    /**
     * The set of tiles currently affected by this effect
     */
    get affectedTiles() {
        return this._affectedTiles;
    }

    /**
     * Whether the tile is affected by this effect
     * @param {number} x the X position
     * @param {number} y the Y position
     * @returns {boolean}
     */
    affectsTile(x, y) {
        return this._affectedTiles.contains(new Point(x, y));
    }
}

module.exports = BoardEffect;