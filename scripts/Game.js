///<reference path="../babylon.2.1.d.ts"/>
///<reference path="Sphere.ts"/>
var GAME;
(function (GAME) {
    var Game = (function () {
        function Game(canvas) {
            this.lastUpdate = 0;
            var engine = new BABYLON.Engine(canvas, true);
            var scene = this.onSetup(engine, canvas);
            var game = this;
            engine.runRenderLoop(function () {
                var now = game.getTimestamp();
                if (now >= game.lastUpdate + (1000 / 25)) {
                    game.onUpdate(now - game.lastUpdate);
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
        Game.prototype.onSetup = function (engine, canvas) {
            var scene = new BABYLON.Scene(engine);
            // This creates and positions a free camera (non-mesh)
            var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
            // This targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());
            // This attaches the camera to the canvas
            camera.attachControl(canvas, true);
            // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
            // Default intensity is 1. Let's dim the light a small amount
            light.intensity = 0.7;
            this.sphere_1 = new ORBIT_SPHERE.Sphere(1, scene);
            this.sphere_2 = new ORBIT_SPHERE.Sphere(3, scene);
            this.sphere_2.setPosition(new BABYLON.Vector3(0, 0, 10));
            return scene;
        };
        Game.prototype.onUpdate = function (sinceLastUpdate) {
        };
        return Game;
    })();
    GAME.Game = Game;
})(GAME || (GAME = {}));
//# sourceMappingURL=Game.js.map