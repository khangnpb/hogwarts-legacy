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
import { BGTriggerr } from "./BGTrigger";
import { Shooting } from "./Shooting";
const { ccclass, property } = _decorator;

@ccclass("PlayerWithProgressBar")
export class PlayerWithProgressBar extends Component {
  mpBar: ProgressBar;
  hpBar: ProgressBar;
  skill1: Node;
  skill2: Node;
  isGetskill2 = false;

  start() {
    this.mpBar = this.node.getChildByName("MPBar").getComponent(ProgressBar);
    this.mpBar.progress = 1;
    this.hpBar = this.node.getChildByName("HPBar").getComponent(ProgressBar);
    this.hpBar.progress = 1;
    this.skill1 = this.node.getChildByName("Skill1");
    this.skill2 = this.node.getChildByName("Skill2");
  }

  update(dt: number) {
    this.isGetskill2 = this.node
      .getParent()
      .getChildByName("Background")
      .getComponent(BGTriggerr)?.isTake;

    this.mpBar.progress =
      this.node.scene.getComponentInChildren(Shooting).mp / 100;
    this.hpBar.progress =
      this.node.scene.getComponentInChildren(Shooting).hp / 100;

    if (this.isGetskill2 == true) {
      this.skill2.active = true;
      if (this.node.scene.getComponentInChildren(Shooting).typeshoot == 1) {
        this.skill1.getComponent(Sprite).grayscale = false;
        this.skill2.getComponent(Sprite).grayscale = true;
      } else {
        this.skill1.getComponent(Sprite).grayscale = true;
        this.skill2.getComponent(Sprite).grayscale = false;
      }
    } else {
      this.skill2.active = false;
    }
  }
}
