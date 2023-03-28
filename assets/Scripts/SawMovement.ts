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
  BoxCollider2D,
} from "cc";
import { Shooting } from "./Shooting";
const { ccclass, property } = _decorator;

@ccclass("SawMovement")
export class SawMovement extends Component {
  @property speed1 = 1;
  @property speed2 = 1;
  @property speed3 = 1;

  rigidbody: RigidBody2D;
  movement: Vec2 = new Vec2(0, 0);
  camera: Camera;

  saw1: Node;
  saw2: Node;
  saw3: Node;
  player: Node;

  isMovingLeft = true;
  //Sprite
  left = ["0", "1", "2"];
  right = ["2", "1", "0"];

  start() {
    this.saw1 = this.node.getChildByName("Saw_01");
    this.saw2 = this.node.getChildByName("Saw_02");
    this.saw3 = this.node.getChildByName("Saw_03");
    this.player = this.node
      .getParent()
      .getParent()
      .getChildByName("PlayerMovement");
  }
  move() {
    if (this.saw1.getPosition().x > 185 || this.saw1.getPosition().x < -185)
      this.speed1 = -this.speed1;

    this.saw1.setPosition(
      this.saw1.getPosition().x + this.speed1,
      this.saw1.getPosition().y
    );

    if (this.saw2.getPosition().x > 185 || this.saw2.getPosition().x < -185)
      this.speed2 = -this.speed2;

    this.saw2.setPosition(
      this.saw2.getPosition().x + this.speed2,
      this.saw2.getPosition().y
    );

    if (this.saw3.getPosition().x > 185 || this.saw3.getPosition().x < -185)
      this.speed3 = -this.speed3;

    this.saw3.setPosition(
      this.saw3.getPosition().x + this.speed3,
      this.saw3.getPosition().y
    );
  }
  collider() {
    if (
      this.saw1
        .getComponent(BoxCollider2D)
        .worldAABB.intersects(this.player.getComponent(BoxCollider2D).worldAABB)
    ) {
      this.player.getComponent(Shooting).hp -= 1;
    }

    if (
      this.saw2
        .getComponent(BoxCollider2D)
        .worldAABB.intersects(this.player.getComponent(BoxCollider2D).worldAABB)
    ) {
      this.player.getComponent(Shooting).hp -= 1;
    }

    if (
      this.saw3
        .getComponent(BoxCollider2D)
        .worldAABB.intersects(this.player.getComponent(BoxCollider2D).worldAABB)
    ) {
      this.player.getComponent(Shooting).hp -= 1;
    }
  }
  update() {
    this.collider();
    this.move();
    this.collider();
  }
}
