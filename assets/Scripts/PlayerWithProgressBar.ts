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
} from "cc";
import { Shooting } from "./Shooting";
const { ccclass, property } = _decorator;

@ccclass("PlayerWithProgressBar")
export class PlayerWithProgressBar extends Component {
  mpBar: ProgressBar;
  hpBar: ProgressBar;

  start() {
    this.mpBar = this.node.getChildByName("MPBar").getComponent(ProgressBar);
    this.mpBar.progress = 1;
    this.hpBar = this.node.getChildByName("HPBar").getComponent(ProgressBar);
    this.hpBar.progress = 1;
  }

  update(dt: number) {
    this.mpBar.progress = this.node.scene.getComponentInChildren(Shooting).mp / 100;
    this.hpBar.progress = this.node.scene.getComponentInChildren(Shooting).hp / 100;
  }
}
