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
  ProgressBar,
  Button,
  Sprite,
} from "cc";
import { Shooting } from "./Shooting";
const { ccclass, property } = _decorator;

@ccclass("PlayerWithProgressBar")
export class PlayerWithProgressBar extends Component {
  mpBar: ProgressBar;
  hpBar: ProgressBar;
  skill1: Sprite;
  skill2: Sprite;

  start() {
    this.mpBar = this.node.getChildByName("MPBar").getComponent(ProgressBar);
    this.mpBar.progress = 1;
    this.hpBar = this.node.getChildByName("HPBar").getComponent(ProgressBar);
    this.hpBar.progress = 1;
    this.skill1 = this.node.getChildByName("Skill1").getComponent(Sprite);
    this.skill2 = this.node.getChildByName("Skill2").getComponent(Sprite);
  }

  update(dt: number) {
    this.mpBar.progress = this.node.scene.getComponentInChildren(Shooting).mp / 100;
    this.hpBar.progress = this.node.scene.getComponentInChildren(Shooting).hp / 100;
    if (this.node.scene.getComponentInChildren(Shooting).typeshoot == 1) {
      this.skill1.grayscale = false; this.skill2.grayscale = true;
    }else {
      this.skill1.grayscale = true; this.skill2.grayscale = false;
    } 
  }
}
