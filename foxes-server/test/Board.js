var assert = require('assert');
var Board = require('./../core/Board');

describe('Board', function() {
    var board = new Board(4);

    describe('#at()', function() {
        it('should make correct usage of the internal array indexes', function() {
            board.insert(1, 2, 1);
            assert.equal(1, board.at(2, 1));
        });
    });
});