///<reference path="../babylon.2.1.d.ts"/>
var ORBIT_SPHERE;
(function (ORBIT_SPHERE) {
    var Sphere = (function () {
        function Sphere(mass, position, velocity, scene) {
            this.destroyed = false;
            this.mass = mass;
            this.setVelocity(velocity);
            // Built-in 'sphere' shape. Params: name, subdivs, size, scene
            this.mesh = BABYLON.Mesh.CreateSphere("sphere", 16, this.mass / 2, scene);
            this.setPosition(position);
        }
        Sphere.prototype.isDestroyed = function () {
            return this.destroyed;
        };
        Sphere.prototype.setDestroyed = function () {
            this.destroyed = true;
        };
        Sphere.prototype.isColliding = function (other) {
            //Do my own collision algorythm? Maybe faster and more percise...
            return other.mesh.intersectsMesh(this.mesh); //But for now I use the stock algo
        };
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
        Sphere.prototype.addPosition = function (value) {
            this.mesh.position = this.mesh.position.add(value);
        };
        Sphere.prototype.setPosition = function (value) {
            this.mesh.position.x = value.x;
            this.mesh.position.y = value.y;
            this.mesh.position.z = value.z;
        };
        Sphere.prototype.getAccelerationDueGravitation = function (other) {
            var distance = (other.getPosition().subtract(this.getPosition())).length();
            var gravity = other.getMass() / (distance * distance);
            return gravity;
        };
        Sphere.prototype.getDirection = function (other) {
            return other.getPosition().subtract(this.getPosition()).normalize();
        };
        Sphere.prototype.interactGravity = function (other) {
            var acceleration = this.getAccelerationDueGravitation(other);
            this.addVelocity(this.getDirection(other).multiplyByFloats(acceleration, acceleration, acceleration));
        };
        Sphere.prototype.update = function (deltaTime) {
            var movement = deltaTime / 70;
            this.addPosition(this.getVelocity().multiplyByFloats(movement, movement, movement));
        };
        return Sphere;
    })();
    ORBIT_SPHERE.Sphere = Sphere;
})(ORBIT_SPHERE || (ORBIT_SPHERE = {}));
