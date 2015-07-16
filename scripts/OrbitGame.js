///<reference path="../babylon.2.1.d.ts"/>
///<reference path="Game.ts"/>
///<reference path="DecayingGeometry.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ORBIT_GAME;
(function (ORBIT_GAME) {
    var OrbitGame = (function (_super) {
        __extends(OrbitGame, _super);
        function OrbitGame() {
            _super.apply(this, arguments);
            this.isGravityCalculationRunning = false;
        }
        OrbitGame.prototype.onSetup = function (engine, canvas, scene) {
            scene.clearColor = new BABYLON.Color3(1, 1, 1);
            // This creates and positions a free camera (non-mesh)
            this.camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, 30), scene);
            // This targets the camera to scene origin
            this.camera.setTarget(BABYLON.Vector3.Zero());
            // This attaches the camera to the canvas
            this.camera.attachControl(canvas, true);
            // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
            // Default intensity is 1.
            light.intensity = 0.7;
            //Create the planets
            this.planets = new Array();
            this.planets.push(new ORBIT_SPHERE.Sphere(6, new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 0), scene));
            //this.planets[0].setIsFixedPosition(); //No gravitational force is effecting this guy :)
            this.planets.push(new ORBIT_SPHERE.Sphere(2, new BABYLON.Vector3(9, 9, 0), new BABYLON.Vector3(0.3, -0.3, 0), scene));
            this.planets.push(new ORBIT_SPHERE.Sphere(2, new BABYLON.Vector3(-9, -9, 0), new BABYLON.Vector3(-0.3, 0.3, 0), scene));
            //this.planets.push(new ORBIT_SPHERE.Sphere(2, new BABYLON.Vector3(0, 9, 9), new BABYLON.Vector3(0, 0.3, -0.3), scene));
            //this.planets.push(new ORBIT_SPHERE.Sphere(2, new BABYLON.Vector3(0, -9, -9), new BABYLON.Vector3(0, -0.3, 0.3), scene));
            this.markerMgr = new DECAYING_GEOMETRY.DecayingGeometryManager(6000, scene);
            this.calculateGravityLoop(this);
            this.spawnMarkersLoop(this);
            return scene;
        };
        OrbitGame.prototype.onUpdate = function (sinceLastUpdate, frameID) {
            if (this.running) {
                //Update every sphere and remove the destroyed ones
                for (var i = 0; i < this.planets.length; i++) {
                    if (this.planets[i].isDestroyed()) {
                        console.log("Removing planet");
                        this.planets.splice(i, 1);
                        i--;
                        console.log(i);
                    }
                    else
                        this.planets[i].update(sinceLastUpdate);
                }
            }
        };
        OrbitGame.prototype.spawnMarkersLoop = function (game) {
            var _this = this;
            setTimeout(function () { game.spawnMarkersLoop(game); }, 1000 / 20);
            this.planets.forEach(function (planet) {
                _this.markerMgr.spawn(planet.getPosition());
            });
        };
        OrbitGame.prototype.calculateGravityLoop = function (game) {
            setTimeout(function () { game.calculateGravityLoop(game); }, 1000 / 10);
            if (game.isGravityCalculationRunning == false) {
                game.isGravityCalculationRunning = true;
                //Iterate throught spheres and interactGravity everything with everything (Do the collision here?)
                game.planets.forEach(function (planet) {
                    game.planets.forEach(function (other_planet) {
                        if (planet != other_planet) {
                            //Calculate the new velocity
                            planet.interactGravity(other_planet);
                            //Collide every sphere with every sphere
                            if (game.frameID != 0 && planet.isColliding(other_planet)) {
                                console.log("Collision!" + game.frameID);
                                (planet.getMass() < other_planet.getMass() ? planet : other_planet).setDestroyed();
                            }
                        }
                    });
                });
                game.isGravityCalculationRunning = false;
            }
            else {
                console.log("Skipped a frame! Too much load?");
            }
        };
        return OrbitGame;
    })(GAME.Game);
    ORBIT_GAME.OrbitGame = OrbitGame;
})(ORBIT_GAME || (ORBIT_GAME = {}));
