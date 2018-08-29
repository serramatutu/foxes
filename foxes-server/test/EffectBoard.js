// required tests
require('./HexagonGrid');

const assert = require('assert');
const EffectBoard = require('./../core/board/EffectBoard');
const BoardEffect = require('../core/board/effect/BoardEffect');
const Point = require('../core/util/Point');
const UniqueIdGenerator = require('../core/indexing/UniqueIdGenerator');
const errors = require('../core/Errors');

describe('EffectBoard', function() {
    describe('insertion', function() {
        var board = new EffectBoard(7);
        it('should throw an InvalidArgumentError when inserting non-effect type', function() {
            assert.throws(() => {
                board.insert(6, 0, "i'm supposedly an effect...");
            },
            errors.InvalidArgumentError);
        });

        it('should insert and remove effects in the correct tile', function() {
            var effect = new BoardEffect(new UniqueIdGenerator());
            board.insert(6, 0, effect);
            board.insert(5, 1, effect);

            assert.deepStrictEqual(new Set([new Point(6, 0), new Point(5, 1)]), new Set(effect.affectedTiles.toArray()));

            board.remove(6, 0, effect);
            assert.deepStrictEqual(new Set([new Point(5, 1)]), new Set(effect.affectedTiles.toArray()));
        });
    });
});