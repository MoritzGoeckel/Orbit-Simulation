///<reference path="../babylon.2.1.d.ts"/>

module ORBIT_SPHERE {
    export class Sphere {
        private mass: number;
        private velocity: BABYLON.Vector3;

        private mesh: BABYLON.Mesh;

        constructor(mass: number, scene :BABYLON.Scene) {
            this.mass = mass;
            this.velocity = new BABYLON.Vector3(0,0,0);

            // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
            this.mesh = BABYLON.Mesh.CreateSphere("sphere", 8 * this.mass, this.mass, scene);
        }

        public getMass() : number{
            return this.mass;
        }

        public getVelocity():BABYLON.Vector3 {
            return this.velocity;
        }

        public setVelocity(value:BABYLON.Vector3) {
            this.velocity = value;
        }

        public addVelocity(value: BABYLON.Vector3){
            this.velocity = this.velocity.add(value);
        }

        public getPosition():BABYLON.Vector3 {
            return  this.mesh.position;
        }

        public setPosition(value:BABYLON.Vector3) {
            this.mesh.position.x = value.x;
            this.mesh.position.y = value.y;
            this.mesh.position.z = value.z;

        }

        private getGravitation(other: Sphere) : number{
            var distance: number = (other.getPosition().subtract(this.getPosition())).length();
            var gravity:number = other.getMass() / (distance * distance);

            return gravity;
        }

        private getDirection(other: Sphere) : BABYLON.Vector3{
            return this.getPosition().subtract(other.getPosition()).normalize();
        }

        public interact(other: Sphere){
            var g : number = this.getGravitation(other);
            this.addVelocity(this.getDirection(other).multiplyByFloats(g, g, g));
        }
    }
}