///<reference path="../babylon.2.1.d.ts"/>
///<reference path='Game.ts'/>
///<reference path='OrbitGame.ts'/>

console.log("Starte script!");

var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("thecanvas");
var game = new ORBIT_GAME.OrbitGame(canvas);