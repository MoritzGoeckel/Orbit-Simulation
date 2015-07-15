///<reference path="../babylon.2.1.d.ts"/>

module ORBIT_SPHERE {
    export class Sphere {
        private mass :number;
        private velocity :BABYLON.Vector3;

        private mesh :BABYLON.Mesh;
        
        private destroyed :boolean = false;
        
        private fixedPosition :boolean = false;
        
        constructor(mass :number, position :BABYLON.Vector3, velocity :BABYLON.Vector3, scene :BABYLON.Scene) {
            this.mass = mass;
            this.setVelocity(velocity);

            // Built-in 'sphere' shape. Params: name, subdivs, size, scene
            this.mesh = BABYLON.Mesh.CreateSphere("sphere", 16, this.mass / 2, scene);
            this.setPosition(position);
        }
        
        public setIsFixedPosition(){
            this.fixedPosition = true;
        }
        
        public isDestroyed() :boolean{
            return this.destroyed;
        }
        
        public setDestroyed() :void{
            this.destroyed = true;
        }
        
        public isColliding(other :Sphere) :boolean{
            //Do my own collision algorythm? Maybe faster and more percise...
            return other.mesh.intersectsMesh(this.mesh); //But for now I use the stock algo
        }
        
        public getMass() :number{
            return this.mass;
        }

        public getVelocity():BABYLON.Vector3 {
            return this.velocity;
        }

        public setVelocity(value :BABYLON.Vector3) :void{
            this.velocity = value;
        }

        public addVelocity(value :BABYLON.Vector3) :void{
            this.velocity = this.velocity.add(value);
        }

        public getPosition():BABYLON.Vector3 {
            return this.mesh.position;
        }
        
        public addPosition(value :BABYLON.Vector3) :void{
            this.mesh.position = this.mesh.position.add(value);
        }

        public setPosition(value :BABYLON.Vector3) :void{
            this.mesh.position.x = value.x;
            this.mesh.position.y = value.y;
            this.mesh.position.z = value.z;
        }

        public getAccelerationDueGravitation(other :Sphere) :number{
            var distance :number = (other.getPosition().subtract(this.getPosition())).length();
            var gravity :number = other.getMass() / (distance * distance);
            
            return gravity;
        }

        private getDirection(other :Sphere) : BABYLON.Vector3{
            return other.getPosition().subtract(this.getPosition()).normalize();
        }

        public interactGravity(other :Sphere) :void{
            if(this.fixedPosition == false){
                var acceleration :number = this.getAccelerationDueGravitation(other);
                this.addVelocity(this.getDirection(other).multiplyByFloats(acceleration, acceleration, acceleration));
            }
        }
        
        public update(deltaTime :number) :void{
            var movement :number = deltaTime / 70;
            this.addPosition(this.getVelocity().multiplyByFloats(movement, movement, movement));
        }
    }
}