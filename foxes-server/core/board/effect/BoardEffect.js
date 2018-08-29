const buckets = require('buckets-js');
const Point = require('../../util/Point');

class BoardEffect {
    constructor(idGenerator) {
        this._id = idGenerator.generate([this.constructor.name]);
        this._affectedTiles = new buckets.Set();
    }

    toString() {
        return this._id;
    }

    get active() {
        return !this._affectedTiles.isEmpty();
    }

    bind(x, y) {
        this._affectedTiles.add(new Point(x, y));
    }

    unbind(x, y) {
        this._affectedTiles.remove(new Point(x, y));
    }

    get affectedTiles() {
        return this._affectedTiles;
    }

    affectsTile(x, y) {
        return this._affectedTiles.contains(new Point(x, y));
    }
}

module.exports = BoardEffect;