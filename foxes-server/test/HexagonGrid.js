const assert = require('assert');
const HexagonGrid = require('../core/board/HexagonGrid');
const errors = require('../core/Errors');

describe('HexagonGrid', function() {
    describe('indexing', function() {
        var grid = new HexagonGrid(7);
        it('should make correct usage of the internal array indexes', function() {
            // inserts 1 at origin
            grid.insert(6, 0, 1);
            assert.strictEqual(1, grid.at(6, 0));
        });

        it('should throw an InvalidArgumentError when indexing is wrong', function() {
            assert.throws(() => {
                grid.at(3, 0);
            },
            errors.InvalidArgumentError);

            assert.throws(() => {
                grid.at(15, 3);
            },
            errors.InvalidArgumentError);
        });
    });
});