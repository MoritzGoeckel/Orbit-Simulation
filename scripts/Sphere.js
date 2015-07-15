///<reference path="../babylon.2.1.d.ts"/>
var ORBIT_SPHERE;
(function (ORBIT_SPHERE) {
    var Sphere = (function () {
        function Sphere(mass, scene) {
            this.mass = mass;
            this.velocity = new BABYLON.Vector3(0, 0, 0);
            // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
            this.mesh = BABYLON.Mesh.CreateSphere("sphere", 8 * this.mass, this.mass, scene);
        }
        Sphere.prototype.getMass = function () {
            return this.mass;
        };
        Sphere.prototype.getVelocity = function () {
            return this.velocity;
        };
        Sphere.prototype.setVelocity = function (value) {
            this.velocity = value;
        };
        Sphere.prototype.addVelocity = function (value) {
            this.velocity = this.velocity.add(value);
        };
        Sphere.prototype.getPosition = function () {
            return this.mesh.position;
        };
        Sphere.prototype.setPosition = function (value) {
            this.mesh.position.x = value.x;
            this.mesh.position.y = value.y;
            this.mesh.position.z = value.z;
        };
        Sphere.prototype.getGravitation = function (other) {
            var distance = (other.getPosition().subtract(this.getPosition())).length();
            var gravity = other.getMass() / (distance * distance);
            return gravity;
        };
        Sphere.prototype.getDirection = function (other) {
            return this.getPosition().subtract(other.getPosition()).normalize();
        };
        Sphere.prototype.interact = function (other) {
            var g = this.getGravitation(other);
            this.addVelocity(this.getDirection(other).multiplyByFloats(g, g, g));
        };
        return Sphere;
    })();
    ORBIT_SPHERE.Sphere = Sphere;
})(ORBIT_SPHERE || (ORBIT_SPHERE = {}));
