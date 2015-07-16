///<reference path="../babylon.2.1.d.ts"/>
///<reference path="Sphere.ts"/>
var GAME;
(function (GAME) {
    var Game = (function () {
        function Game(canvas) {
            this.lastUpdate = 0;
            this.running = true;
            this.frameID = 0;
            var engine = new BABYLON.Engine(canvas, true);
            var scene = new BABYLON.Scene(engine);
            this.onSetup(engine, canvas, scene);
            var game = this;
            engine.runRenderLoop(function () {
                var now = game.getTimestamp();
                if (now >= game.lastUpdate + (1000 / 50)) {
                    if (game.lastUpdate == 0)
                        game.lastUpdate = game.getTimestamp() - 30;
                    game.onUpdate(now - game.lastUpdate, game.frameID);
                    game.frameID++;
                    game.lastUpdate = now;
                }
                scene.render();
            });
            window.addEventListener("resize", function () {
                engine.resize();
            });
        }
        Game.prototype.getTimestamp = function () {
            var date = new Date();
            return date.getTime();
        };
        Game.prototype.onSetup = function (engine, canvas, scene) {
            throw new Error('onSetup is abstract');
        };
        Game.prototype.onUpdate = function (sinceLastUpdate, frameID) {
            throw new Error('onUpdate is abstract');
        };
        return Game;
    })();
    GAME.Game = Game;
})(GAME || (GAME = {}));
