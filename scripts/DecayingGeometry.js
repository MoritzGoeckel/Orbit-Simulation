///<reference path="../babylon.2.1.d.ts"/>
var DECAYING_GEOMETRY;
(function (DECAYING_GEOMETRY) {
    var DecayingGeometry = (function () {
        function DecayingGeometry(position, lifeTime, scene) {
            this.destroyed = false;
            this.lifeTime = 0;
            this.createdTime = 0;
            this.lifeTime = lifeTime;
            this.createdTime = this.getTimestamp();
            this.mesh = BABYLON.Mesh.CreateSphere("sphere", 1, 0.1, scene);
            this.mesh.material = new BABYLON.StandardMaterial("", scene);
            this.setPosition(position);
        }
        DecayingGeometry.prototype.getTimestamp = function () {
            var date = new Date();
            return date.getTime();
        };
        DecayingGeometry.prototype.isDestroyed = function () {
            return this.destroyed;
        };
        DecayingGeometry.prototype.setDestroyed = function () {
            this.destroyed = true;
            this.mesh.getScene().removeMesh(this.mesh); //Todo: more to dispose?
        };
        DecayingGeometry.prototype.getPosition = function () {
            return this.mesh.position;
        };
        DecayingGeometry.prototype.setPosition = function (value) {
            this.mesh.position.x = value.x;
            this.mesh.position.y = value.y;
            this.mesh.position.z = value.z;
        };
        DecayingGeometry.prototype.update = function () {
            var elapsedTime = this.getTimestamp() - this.createdTime;
            if (elapsedTime >= this.lifeTime)
                this.setDestroyed();
            else {
                var quotient = Math.pow(elapsedTime / this.lifeTime, 2);
                quotient = 1 - quotient;
                this.mesh.material.alpha = quotient;
            }
        };
        return DecayingGeometry;
    })();
    var DecayingGeometryManager = (function () {
        function DecayingGeometryManager(lifeTime, scene) {
            this.lifeTime = 0;
            this.isUpdateing = false;
            this.lifeTime = lifeTime;
            this.geometry = new Array();
            this.updateLoop(this);
            this.scene = scene;
        }
        DecayingGeometryManager.prototype.spawn = function (position) {
            this.geometry.push(new DecayingGeometry(position, this.lifeTime, this.scene));
        };
        DecayingGeometryManager.prototype.updateLoop = function (mgr) {
            setTimeout(function () { mgr.updateLoop(mgr); }, 1000 / 10);
            if (mgr.isUpdateing == false) {
                mgr.isUpdateing = true;
                for (var i = 0; i < mgr.geometry.length; i++) {
                    var element = mgr.geometry[i];
                    if (element.isDestroyed()) {
                        mgr.geometry.splice(i, 1);
                        i--;
                    }
                    else {
                        element.update();
                    }
                }
                mgr.isUpdateing = false;
            }
            else {
                console.log("DecayingGeometryManager: Skipped a frame! Too much load?");
            }
        };
        return DecayingGeometryManager;
    })();
    DECAYING_GEOMETRY.DecayingGeometryManager = DecayingGeometryManager;
})(DECAYING_GEOMETRY || (DECAYING_GEOMETRY = {}));
