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

@ccclass("PlayerMovement")
export class PlayerMovement extends Component {
    @property moveSpeed = 200;
    rigidbody: RigidBody2D;
    movement: Vec2 = new Vec2(0, 0);

    camera: Camera;

    isMovingUp = false;
    isMovingDown = false;
    isMovingLeft = false;
    isMovingRight = false;
    isFiring = false;

    //Sprite
    down = ["Down1", "Down2", "Down3", "Down4", "Down5"];
    up = ["Up1", "Up2", "Up3", "Up4", "Up5"];
    right = ["Right1", "Right2", "Right3", "Right4", "Right5"];
    left = ["Left1", "Left2", "Left3", "Left4", "Left5"];

    downLeft = ["DownLeft1", "DownLeft2", "DownLeft3", "DownLeft4", "DownLeft5"];
    downRight = ["DownRight1", "DownRight2", "DownRight3", "DownRight4", "DownRight5"];
    upLeft = ["UpLeft1", "UpLeft2", "UpLeft3", "UpLeft4", "UpLeft5"];
    upRight = ["UpRight1", "UpRight2", "UpRight3", "UpRight4", "UpRight5"];
    i_d = 0
    i_u = 0
    i_r = 0
    i_l = 0
    i_dl = 0
    i_dr = 0
    i_ul = 0
    i_ur = 0
    temp = 0;

    start() {
        this.camera = this.node.scene.getComponentInChildren(Camera);
        this.rigidbody = this.getComponent(RigidBody2D);
        this.node.angle = (this.node.angle + 180) % 360;

        for (let i = 0; i <= 4; i++) {
            this.node.getChildByName(this.down[i]).active = false;
            this.node.getChildByName(this.up[i]).active = false;
            this.node.getChildByName(this.left[i]).active = false;
            this.node.getChildByName(this.right[i]).active = false;
            this.node.getChildByName(this.downLeft[i]).active = false;
            this.node.getChildByName(this.upLeft[i]).active = false;
            this.node.getChildByName(this.downRight[i]).active = false;
            this.node.getChildByName(this.upRight[i]).active = false;
        }
        this.node.getChildByName(this.down[this.i_d]).active = true;
        this.i_d = (this.i_d + 1) % 5;

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
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
        let val = 0;
        if (this.temp == 0) val = 1;


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

        //Load Sprite
        if (this.isMovingLeft || this.isMovingDown || this.isMovingRight || this.isMovingUp) {
            for (let i = 0; i <= 4; i++) {
                this.node.getChildByName(this.down[i]).active = false;
                this.node.getChildByName(this.up[i]).active = false;
                this.node.getChildByName(this.left[i]).active = false;
                this.node.getChildByName(this.right[i]).active = false;
                this.node.getChildByName(this.downLeft[i]).active = false;
                this.node.getChildByName(this.upLeft[i]).active = false;
                this.node.getChildByName(this.downRight[i]).active = false;
                this.node.getChildByName(this.upRight[i]).active = false;
            }
        }

        if (this.isMovingLeft) {
            if (this.isMovingUp) {
                //ul
                this.node.getChildByName(this.upLeft[this.i_ul]).active = true;
                this.i_ul = (this.i_ul + val) % 5;
            } else if (this.isMovingDown) {
                //dl
                this.node.getChildByName(this.downLeft[this.i_dl]).active = true;
                this.i_dl = (this.i_dl + val) % 5;
            } else {
                //l
                this.node.getChildByName(this.left[this.i_l]).active = true;
                this.i_l = (this.i_l + val) % 5;
            }
        } else if (this.isMovingRight) {
            if (this.isMovingUp) {
                //ur
                this.node.getChildByName(this.upRight[this.i_ur]).active = true;
                this.i_ur = (this.i_ur + val) % 5;
            } else if (this.isMovingDown) {
                //dr
                this.node.getChildByName(this.downRight[this.i_dr]).active = true;
                this.i_dr = (this.i_dr + val) % 5;
            } else {
                //r
                this.node.getChildByName(this.right[this.i_r]).active = true;
                this.i_r = (this.i_r + val) % 5;
            }
        } else {
            if (this.isMovingUp) {
                //u
                this.node.getChildByName(this.up[this.i_u]).active = true;
                this.i_u = (this.i_u + val) % 5;
            } else if (this.isMovingDown) {
                //d
                this.node.getChildByName(this.down[this.i_d]).active = true;
                this.i_d = (this.i_d + val) % 5;
            }
        }
        this.temp = (this.temp + 1) % 5;

        this.rigidbody.linearVelocity = new Vec2(
            this.movement.x * deltaTime * this.moveSpeed,
            this.movement.y * deltaTime * this.moveSpeed
        );

        /*
        // Tính toán vị trí mới cho camera dựa trên vị trí của nhân vật
        const playerPos = this.node.worldPosition;
        const cameraPos = this.camera.node.worldPosition;
        const newPos = new Vec3(playerPos.x, playerPos.y, cameraPos.z);
        this.camera.node.worldPosition = newPos;
        */
    }

    update(deltaTime: number) {
        this.move(deltaTime)
    }
}
