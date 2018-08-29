/**
 * Stores the stats for a tile
 */
class TileStats {
    /**
     * Constructs a TileStats instance
     * @param {number} damage the damage dealt by that tile per turn
     * @param {number} healing the healing dealt by the tile per turn
     * @param {number} viscosity the difficulty for an entity to move in and out of the tile
     */
    constructor(damage, healing, viscosity) {
        this.damage = damage || 0;
        this.healing = healing || 0;
        this.viscosity = viscosity || 0;
    }

    /**
     * Adds all attributes of other into this
     * @param {TileStats} other the other instance
     */
    add(other) {
        this.damage += other.damage;
        this.healing += other.healing;
        this.viscosity += other.viscosity;
    }

    /**
     * Substracts all attributes of other into this
     * @param {TileStats} other the other instance
     */
    subtract(other) {
        this.damage -= other.damage;
        this.healing -= other.healing;
        this.viscosity -= other.viscosity;
    }
}

module.exports = TileStats;