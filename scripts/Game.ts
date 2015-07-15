///<reference path="../babylon.2.1.d.ts"/>
///<reference path="Sphere.ts"/>

module GAME {
    export class Game {
        
        protected lastUpdate :number = 0;
        protected running :boolean = true;
        
        protected camera :BABYLON.FreeCamera;
        protected frameID :number = 0;
        
        constructor(canvas :HTMLCanvasElement) {
            var engine = new BABYLON.Engine(canvas, true);
            var scene = new BABYLON.Scene(engine);
            this.onSetup(engine, canvas, scene);
            var game :GAME.Game = this;

            engine.runRenderLoop(function () {
                var now: number = game.getTimestamp();
                if (now >= game.lastUpdate + (1000 / 50)){
                    if(game.lastUpdate == 0)
                        game.lastUpdate = game.getTimestamp() - 30;
                    
                    game.onUpdate(now - game.lastUpdate);
                    game.frameID++;
                    game.lastUpdate = now;
                }
                scene.render();
            });

            window.addEventListener("resize", function () {
                engine.resize();
            });
        }
        
        protected getTimestamp() : number{
            var date = new Date();
            return date.getTime();
        }
        
        protected onSetup(engine:BABYLON.Engine, canvas:HTMLCanvasElement, scene :BABYLON.Scene):BABYLON.Scene{
            throw new Error('onSetup is abstract');
        }
        
        protected onUpdate(sinceLastUpdate : number) :void{
            throw new Error('onUpdate is abstract');
        }
    }
}