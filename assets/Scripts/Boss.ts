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
  Collider2D,
  BoxCollider2D,
  Contact2DType,
  instantiate,
  BoxCollider,
  math,
} from 'cc';
const { ccclass, property } = _decorator;
import { PlayerMovement } from './PlayerMovement';
import { Shooting } from './Shooting';

@ccclass("Boss")
export default class Boss extends Component {
  
  hp = 500;

  rigidbody: RigidBody2D;
  collider: Collider2D;

  idle_sprite = ["Idle"];
  att_sprite = ["Attack"];
  die_sprite = ["Die"];

  delayAttack = 0;


  start() {
    this.node.getChildByName("Idle").active = false;
    this.node.getChildByName("Attack").active = false;
    this.node.getChildByName("Die").active = false;
    this.node.getChildByName("left-att").active = false;
    this.node.getChildByName("right-att").active = false;

    this.node.getChildByName("Idle").active = true;
  }

  checkPlayerArea() {
    let pNode = this.node.parent.getChildByName("PlayerMovement");
    let px = pNode.position.x;

    console.log("px: ", px);
    console.log("boss: ", this.node.position.x);
    // check if px is in the left or right of the boss
    if (px < this.node.position.x) {
      // left

      return 0;
    } else {
      // right
      return 1;
    }
  }
  attack(deltaTime: number) {
    this.delayAttack += deltaTime;
    if (this.delayAttack > 5) {
      console.log("attack");
      this.delayAttack = 0;
      let player = this.node.parent.getChildByName("PlayerMovement");
      let playerScript = player.getComponent(Shooting);

      let direction = this.checkPlayerArea();
      if (direction == 0) {
        // left
        //show left-att sprite
        //delay 3s
        setTimeout(() => {
          this.node.getChildByName("left-att").active = false;
          this.node.getChildByName("right-att").active = false;
          this.node.getChildByName("Idle").active = false;
          this.node.getChildByName("Attack").active = true;
          this.node.getChildByName("Die").active = false;
          this.node.getChildByName("left-att").active = true;
        }, 6000);
        let newdr = this.checkPlayerArea();
        if (newdr == direction) playerScript.reduceHp(20);
      } else {
        // right
        setTimeout(() => {
          this.node.getChildByName("left-att").active = false;
          this.node.getChildByName("right-att").active = false;
          this.node.getChildByName("Idle").active = false;
          this.node.getChildByName("Attack").active = true;
          this.node.getChildByName("Die").active = false;
          this.node.getChildByName("right-att").active = true;
        }, 6000);
        let newdr = this.checkPlayerArea();
        if (newdr == direction) playerScript.reduceHp(20);
      }   
    }
  }

  reduceHP(num: number) {
    this.hp -= num;
    console.log("Enemy's heal: ", this.hp);
    if (this.hp <= 0) {
      this.getComponent(BoxCollider2D).destroy();
      this.node.getChildByName(this.idle_sprite[0]).active = false;
      this.node.getChildByName(this.att_sprite[0]).active = false;
      this.node.getChildByName(this.die_sprite[0]).active = true; //show die sprite
    }
  }
  
  update(deltaTime: number) {
    if (this.hp > 0){
      this.attack(deltaTime);
    }
  }
}
