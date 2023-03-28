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

@ccclass("Player")
export class Player extends Component {
  @property moveSpeed = 200;
  rigidbody: RigidBody2D;
  movement: Vec2 = new Vec2(0, 0);
  camera: Camera;

  typeshoot = 1;
  hp = 100;
  mp = 100;

  start() {
    this.camera = this.node.scene.getComponentInChildren(Camera);
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.DIGIT_1:
        this.typeshoot = 1;
        break;
      case KeyCode.DIGIT_2:
        this.typeshoot = 2;
        break;
    }
  }
}
