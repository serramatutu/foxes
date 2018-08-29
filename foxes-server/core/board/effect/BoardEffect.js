class BoardEffect {
    constructor(idGenerator) {
        this._id = idGenerator.generate([this.constructor.name]);
    }

    toString() {
        return this._id;
    }
}

module.exports = BoardEffect;