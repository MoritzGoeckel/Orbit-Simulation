var SCENARIOS;
(function (SCENARIOS) {
    var Scenarios = (function () {
        function Scenarios() {
        }
        Scenarios.prototype.getDefaultSzenario = function (scene) {
            return this.getTwoStarSymetric(scene);
        };
        Scenarios.prototype.getFourStarSymetric = function (scene) {
            var planets = new Array();
            planets.push(new ORBIT_SPHERE.Sphere(6, new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 0), scene));
            planets.push(new ORBIT_SPHERE.Sphere(2, new BABYLON.Vector3(9, 9, 0), new BABYLON.Vector3(0.3, -0.3, 0), scene));
            planets.push(new ORBIT_SPHERE.Sphere(2, new BABYLON.Vector3(-9, -9, 0), new BABYLON.Vector3(-0.3, 0.3, 0), scene));
            planets.push(new ORBIT_SPHERE.Sphere(2, new BABYLON.Vector3(0, 9, 9), new BABYLON.Vector3(0, 0.3, -0.3), scene));
            planets.push(new ORBIT_SPHERE.Sphere(2, new BABYLON.Vector3(0, -9, -9), new BABYLON.Vector3(0, -0.3, 0.3), scene));
            return planets;
        };
        Scenarios.prototype.getTwoStarSymetric = function (scene) {
            var planets = new Array();
            planets.push(new ORBIT_SPHERE.Sphere(6, new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 0), scene));
            planets.push(new ORBIT_SPHERE.Sphere(2, new BABYLON.Vector3(9, 9, 0), new BABYLON.Vector3(0.3, -0.3, 0), scene));
            planets.push(new ORBIT_SPHERE.Sphere(2, new BABYLON.Vector3(-9, -9, 0), new BABYLON.Vector3(-0.3, 0.3, 0), scene));
            return planets;
        };
        Scenarios.prototype.getTwoStar = function (scene) {
            var planets = new Array();
            planets.push(new ORBIT_SPHERE.Sphere(6, new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 0), scene));
            //this.planets[0].setIsFixedPosition(); //No gravitational force is effecting this guy :)
            planets.push(new ORBIT_SPHERE.Sphere(2, new BABYLON.Vector3(9, 9, 0), new BABYLON.Vector3(0.5, -0.5, 0), scene));
            return planets;
        };
        return Scenarios;
    })();
    SCENARIOS.Scenarios = Scenarios;
})(SCENARIOS || (SCENARIOS = {}));
