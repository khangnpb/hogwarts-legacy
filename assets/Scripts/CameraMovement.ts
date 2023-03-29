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
  UITransform,
} from "cc";
import { PlayerMovement } from "./PlayerMovement";
const { ccclass, property } = _decorator;

@ccclass("CameraMovement")
export class CameraMovement extends Component {
  @property moveSpeed = 200;
  rigidbody: RigidBody2D;
  movement: Vec2 = new Vec2(0, 0);

  @property minX = -30;
  @property minY = -245;
  @property maxX = 21;
  @property maxY = 651;

  xStore = 0;
  yStore = 0;

  start() {
    this.rigidbody = this.getComponent(RigidBody2D);
  }

  move(deltaTime: number) {
    let pNode = this.node.parent.getChildByName("PlayerMovement");
    let x = pNode.position.x,
      y = pNode.position.y;

    if (x + this.xStore >= this.minX && x + this.xStore <= this.maxX) {
      x = x + this.xStore;
      this.xStore = 0;
    }
    if (y + this.yStore >= this.minY && y + this.yStore <= this.maxY) {
      y = y + this.yStore;
      this.yStore = 0;
    }

    if (x < this.minX) {
      this.xStore = x - this.minX;
      x = this.minX;
    } else if (x > this.maxX) {
      this.xStore = x - this.maxX;
      x = this.maxX;
    } else this.xStore = 0;

    if (y < this.minY) {
      this.yStore = y - this.minY;
      y = this.minY;
    } else if (y > this.maxY) {
      this.yStore = y - this.maxY;
      y = this.maxY;
    } else this.yStore = 0;

    //this.node.position = new Vec3(x, y);
    this.rigidbody.linearVelocity = new Vec2(
      x - this.node.position.x,
      y - this.node.position.y
    );
  }

  update(deltaTime: number) {
    this.move(deltaTime);
    console.log(this.node.position.x, this.node.position.y);
    //y = -245, 651
    //x = -30, 21
  }
}
