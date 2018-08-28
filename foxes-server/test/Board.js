var assert = require('assert');
var Board = require('./../core/board/Board');

describe('Board', function() {
    describe('#at()', function() {
        it('should make correct usage of the internal array indexes', function() {
            var board = new Board(7);

            // inserts 1 at origin
            board.insert(6, 0, 1);
            assert.equal(1, board.at(6, 0));

            // inserts 3 at (4, 2)
            board.insert(4, 2, 3);
            assert.equal(3, board.at(4, 2));
        });
    });
});