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

  start() {
    this.camera = this.node.scene.getComponentInChildren(Camera);
    this.rigidbody = this.getComponent(RigidBody2D);

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
    }
  }

  onMouseMove(event: EventMouse) {
    const mousePos = new Vec3(event.getLocationX(), event.getLocationY());
    const worldPos = new Vec3();
    this.camera.screenToWorld(mousePos, worldPos);
    const lookDir = worldPos.subtract(this.node.worldPosition);
    const angleInRadians = Math.atan2(lookDir.y, lookDir.x);
    const angleInDegrees = math.toDegree(angleInRadians);
    this.node.angle = angleInDegrees - 90;
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
