///<reference path="../babylon.2.1.d.ts"/>
///<reference path="Game.ts"/>
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
        }
        OrbitGame.prototype.onSetup = function (engine, canvas) {
            var scene = new BABYLON.Scene(engine);
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
            //Create the spheres
            this.planets = new Array();
            this.planets.push(new ORBIT_SPHERE.Sphere(6, new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 0), scene));
            //this.planets[0].setIsFixedPosition(); //No gravitational force is effecting this guy :)
            this.planets.push(new ORBIT_SPHERE.Sphere(2, new BABYLON.Vector3(9, 9, 0), new BABYLON.Vector3(0.5, -0.5, 0), scene));
            this.planets.push(new ORBIT_SPHERE.Sphere(2, new BABYLON.Vector3(-9, -9, 0), new BABYLON.Vector3(-0.5, 0.5, 0), scene));
            return scene;
        };
        OrbitGame.prototype.onUpdate = function (sinceLastUpdate) {
            var _this = this;
            if (this.running) {
                //Iterate throught spheres and interactGravity everything with everything (Do the collision here?)
                this.planets.forEach(function (planet) {
                    _this.planets.forEach(function (other_planet) {
                        if (planet != other_planet) {
                            //Calculate the new velocity
                            planet.interactGravity(other_planet);
                            //Collide every sphere with every sphere
                            if (_this.frameID != 0 && planet.isColliding(other_planet)) {
                                console.log("Collision!" + _this.frameID);
                                (planet.getMass() < other_planet.getMass() ? planet : other_planet).setDestroyed();
                            }
                        }
                    });
                });
                //Update every sphere and remove the destroyed ones
                for (var i = 0; i < this.planets.length; i++) {
                    if (this.planets[i].isDestroyed()) {
                        console.log("Removing planet");
                        this.planets.splice(i);
                        i--;
                    }
                    else
                        this.planets[i].update(sinceLastUpdate);
                }
                //Stick Camera to sphere_1
                //this.camera.setTarget(this.sphere_1.getPosition());
                this.frameID++;
            }
        };
        return OrbitGame;
    })(GAME.Game);
    ORBIT_GAME.OrbitGame = OrbitGame;
})(ORBIT_GAME || (ORBIT_GAME = {}));
