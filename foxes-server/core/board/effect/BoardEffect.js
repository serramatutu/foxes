const buckets = require('buckets-js');
const Tile = require('../Tile');
const AffectedTile = require('../AffectedTile');
const NotImplementedError = require('../../Errors').NotImplementedError;
const HexagonGrid = require('../HexagonGrid');

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
     * @param {Tile} tile the tile to be bound to this effect
     */
    bind(tile) {
        tile.stats.add(this.constructor.TILE_EFFECTS);
        this._affectedTiles.add(new AffectedTile(tile, this.constructor.TILE_EFFECTS));
    }

    /**
     * Unbinds this effect from a tile
     * @param {Tile} tile the tile to be unbound from this effect
     */
    unbind(tile) {
        tile.stats.subtract(this.constructor.TILE_EFFECTS);
        this._affectedTiles.remove(tile.toString());
    }

    /**
     * Ticks the effect so that it progresses
     * @param {HexagonGrid} grid the Tile grid where this effect was placed
     */
    tick(grid) {
        throw new NotImplementedError("BoardEffect superclass' tick method should not be used without derivation");
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

    static get TILE_EFFECTS() {
        throw new NotImplementedError("BoardEffect superclass' TILE_EFFECTS property should not be used without derivation");
    }
}

module.exports = BoardEffect;