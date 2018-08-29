/**
 * Generates unique IDs for shared object references across multiple other objects
 */
class UniqueIdGenerator {
    constructor() {
        this._index = 0;
    }

    /**
     * Generates a new ID based on the prefix
     */
    generate(tags) {
        var id = "";
        tags.forEach((tag) => {
            id += tag + ':';
        });

        return id + this._index;
    }
}

module.exports = UniqueIdGenerator;