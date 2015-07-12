///<reference path="../babylon.2.1.d.ts"/>
///<reference path="Sphere.ts"/>

module GAME {
    export class Game {
        constructor(canvas :HTMLCanvasElement) {
            var engine = new BABYLON.Engine(canvas, true);

            var scene = this.onSetup(engine, canvas);

            var game :GAME.Game = this;

            engine.runRenderLoop(function () {
                var now: number = game.getTimestamp();
                if (now >= game.lastUpdate + (1000 / 25)){
                    game.onUpdate(now - game.lastUpdate); 
                    game.lastUpdate = now;
                }
                scene.render();
            });

            window.addEventListener("resize", function () {
                engine.resize();
            });
        }

        private lastUpdate : number = 0;

        private getTimestamp() : number{
            var date = new Date();
            return date.getTime();
        }

        private sphere_1: ORBIT_SPHERE.Sphere;
        private sphere_2: ORBIT_SPHERE.Sphere;

        private onSetup(engine:BABYLON.Engine, canvas:HTMLCanvasElement):BABYLON.Scene {

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
        }

        private onUpdate(sinceLastUpdate : number){
            
        }
    }
}