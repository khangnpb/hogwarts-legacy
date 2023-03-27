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
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("CameraMovement")
export class CameraMovement extends Component {
    @property moveSpeed = 200;
    rigidbody: RigidBody2D;
    movement: Vec2 = new Vec2(0, 0);


    isMovingUp = false;
    isMovingDown = false;
    isMovingLeft = false;
    isMovingRight = false;
    isFiring = false;

    start() {
        this.rigidbody = this.getComponent(RigidBody2D);

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.ARROW_LEFT:
                this.isMovingLeft = true;
                break;
            case KeyCode.ARROW_RIGHT:
                this.isMovingRight = true;
                break;
            case KeyCode.ARROW_UP:
                this.isMovingUp = true;
                break;
            case KeyCode.ARROW_DOWN:
                this.isMovingDown = true;
                break; 
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
            case KeyCode.ARROW_LEFT:
                this.isMovingLeft = false;
                break;
            case KeyCode.ARROW_RIGHT:
                this.isMovingRight = false;
                break;
            case KeyCode.ARROW_UP:
                this.isMovingUp = false;
                break;
            case KeyCode.ARROW_DOWN:
                this.isMovingDown = false;
                break;
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
    move(deltaTime: number) {
        if (this.isMovingLeft) {
            this.movement.x = -1;
        } else if (this.isMovingRight) {
            this.movement.x = 1;
        } else {
            this.movement.x = 0;
        }

        if (this.isMovingUp) {
            this.movement.y = 1;
        } else if (this.isMovingDown) {
            this.movement.y = -1;
        } else {
            this.movement.y = 0;
        }

        this.rigidbody.linearVelocity = new Vec2(
            this.movement.x * deltaTime * this.moveSpeed,
            this.movement.y * deltaTime * this.moveSpeed
        );
    }

    update(deltaTime: number) {
        this.move(deltaTime)

    }
}
