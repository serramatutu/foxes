const InvalidArgumentError = require('../Errors.js').InvalidArgumentError;

class Tile {
    constructor() {
        this._objects = new Set();
    }

    add(objectId) {
        if (objectId !== 'number')
            throw new InvalidArgumentError('invalid object id');
        this._objects.add(objectId);
    }

    remove(objectId) {
        if (objectId !== 'number')
            throw new InvalidArgumentError('invalid object id');
        this._objects.delete(objectId);
    }

    get empty() {
        return this._objects.length == 0;
    }
}

module.exports = Tile;