import {
  _decorator,
  Component,
  Node,
  RigidBody2D,
  input,
  Input,
  EventKeyboard,
  KeyCode,
  Vec2,
  Camera,
  EventMouse,
  Vec3,
  math,
  Sprite,
  SpriteFrame,
  resources,
  Texture2D
} from "cc";

const { ccclass, property } = _decorator;

@ccclass("PlayerMovement")
export class PlayerMovement extends Component {
    @property moveSpeed = 200;
    rigidbody: RigidBody2D;
    movement: Vec2 = new Vec2(0, 0);

    camera: Camera;


    //r1 = this.node.getChildByName('Right1');
    //d1 = this.node.getChildByName('Down1');   

    //d2 = this.node.getChildByName('Down2');
    stt = 0;
    down = ["Down1", "Down2", "Down3", "Down4", "Down5"];
    up = ["Up1", "Up2", "Up1", "Up2", "Up1"];
    right = ["Right1", "Right2", "Right1", "Right2", "Right1"];
    left = ["Left1", "Left2", "Left1", "Left2", "Left1"];

    i_d = 0
    i_u = 0
    i_r = 0
    i_l = 0


    isMovingUp = false;
    isMovingDown = false;
    isMovingLeft = false;
    isMovingRight = false;
    isFiring = false;



    start() {
        this.camera = this.node.scene.getComponentInChildren(Camera);
        this.rigidbody = this.getComponent(RigidBody2D);
        this.node.angle = (this.node.angle + 180) % 360;

        for (let i = 0; i <= 4; i++) {
            this.node.getChildByName(this.down[i]).active = false;
            this.node.getChildByName(this.up[i]).active = false;
            this.node.getChildByName(this.left[i]).active = false;
            this.node.getChildByName(this.right[i]).active = false;
        }
        this.node.getChildByName(this.down[this.i_d]).active = true;
        this.i_d = (this.i_d + 1) % 5;
        //this.r1.active = true;
        //this.d1.active = this.d2.active = false;

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.isMovingLeft = true;
                break;
            case KeyCode.KEY_D:
                this.isMovingRight = true;
                break;
            case KeyCode.KEY_W:
                this.isMovingUp = true;
                break;
            case KeyCode.KEY_S:
                this.isMovingDown = true;
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.isMovingLeft = false;
                break;
            case KeyCode.KEY_D:
                this.isMovingRight = false;
                break;
            case KeyCode.KEY_W:
                this.isMovingUp = false;
                break;
            case KeyCode.KEY_S:
                this.isMovingDown = false;
                break;
        }
    }

    onMouseMove(event: EventMouse) {
        const mousePos = new Vec3(event.getLocationX(), event.getLocationY());
        const worldPos = new Vec3();
        this.camera.screenToWorld(mousePos, worldPos);
        const lookDir = worldPos.subtract(this.node.worldPosition);
        const angleInRadians = Math.atan2(lookDir.y, lookDir.x);
        const angleInDegrees = math.toDegree(angleInRadians);
        //this.node.angle = angleInDegrees - 90;
    }

    move(deltaTime: number) {
        if (this.isMovingLeft) {
            this.movement.x = -1;
            for (let i = 0; i <= 4; i++) {
                this.node.getChildByName(this.down[i]).active = false;
                this.node.getChildByName(this.up[i]).active = false;
                this.node.getChildByName(this.left[i]).active = false;
                this.node.getChildByName(this.right[i]).active = false;
            }
            this.node.getChildByName(this.left[this.i_l]).active = true;
            this.i_l = (this.i_l + 1) % 5;
        } else if (this.isMovingRight) {
            this.movement.x = 1;
            for (let i = 0; i <= 4; i++) {
                this.node.getChildByName(this.down[i]).active = false;
                this.node.getChildByName(this.up[i]).active = false;
                this.node.getChildByName(this.left[i]).active = false;
                this.node.getChildByName(this.right[i]).active = false;
            }
            this.node.getChildByName(this.right[this.i_r]).active = true;
            this.i_r = (this.i_r + 1) % 5;
        } else {
            this.movement.x = 0;
        }

        if (this.isMovingUp) {
            this.movement.y = 1;
            for (let i = 0; i <= 4; i++) {
                this.node.getChildByName(this.down[i]).active = false;
                this.node.getChildByName(this.up[i]).active = false;
                this.node.getChildByName(this.left[i]).active = false;
                this.node.getChildByName(this.right[i]).active = false;
            }
            this.node.getChildByName(this.up[this.i_u]).active = true;
            this.i_u = (this.i_u + 1) % 5;
        } else if (this.isMovingDown) {
            this.movement.y = -1;
            for (let i = 0; i <= 4; i++) {
                this.node.getChildByName(this.down[i]).active = false;
                this.node.getChildByName(this.up[i]).active = false;
                this.node.getChildByName(this.left[i]).active = false;
                this.node.getChildByName(this.right[i]).active = false;
            }
            this.node.getChildByName(this.down[this.i_d]).active = true;
            this.i_d = (this.i_d + 1) % 5;
        } else {
            this.movement.y = 0;
        }

        this.rigidbody.linearVelocity = new Vec2(
            this.movement.x * deltaTime * this.moveSpeed,
            this.movement.y * deltaTime * this.moveSpeed
        );

        // Tính toán vị trí mới cho camera dựa trên vị trí của nhân vật
        const playerPos = this.node.worldPosition;
        const cameraPos = this.camera.node.worldPosition;
        const newPos = new Vec3(playerPos.x, playerPos.y, cameraPos.z);
        this.camera.node.worldPosition = newPos;

    }

    update(deltaTime: number) {
        this.move(deltaTime)

    }
}
