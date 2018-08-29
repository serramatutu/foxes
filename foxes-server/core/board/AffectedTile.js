const Tile = require('./Tile');
const TileStats = require('./TileStats');

/**
 * Represents a Tile affected by a BoardEffect
 */
class AffectedTile {
    /**
     * Constructs an AffectedTile instance
     * @param {Tile} tile the tile affected
     * @param {TileStats} tileStats how it was affected
     */
    constructor(tile, tileStats) {
        this.tile = tile;
        this.tileEffects = tileStats;
    }

    toString() {
        return this.tile.toString();
    }
}

module.exports = AffectedTile;