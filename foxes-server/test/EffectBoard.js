const assert = require('assert');
const EffectBoard = require('./../core/board/EffectBoard');
const BoardEffect = require('../core/board/effect/BoardEffect');
const Tile = require('../core/board/Tile');
const UniqueIdGenerator = require('../core/indexing/UniqueIdGenerator');
const TileStats = require('../core/board/TileStats');
const errors = require('../core/Errors');

class TestEffect extends BoardEffect {
    static get TILE_EFFECTS() {
        return new TileStats();
    }
}

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
            var effect = new TestEffect(new UniqueIdGenerator());
            board.insert(6, 0, effect);
            board.insert(5, 1, effect);

            var mapper = function(elem) {
                return [elem.tile.x, elem.tile.y];
            }
            var mapped = effect.affectedTiles.toArray().map(mapper);
            assert.deepStrictEqual(new Set([[6, 0], [5, 1]]), new Set(mapped));

            board.remove(6, 0, effect);
            mapped = effect.affectedTiles.toArray().map(mapper);
            assert.deepStrictEqual(new Set([[5, 1]]), new Set(mapped));
        });
    });
});