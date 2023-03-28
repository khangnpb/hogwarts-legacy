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

  start() {
    this.mpBar = this.node.getChildByName("MPBar").getComponent(ProgressBar);
    this.mpBar.progress = 1;
  }

  update(dt: number) {
    this.mpBar.progress -= 0.01;
    console.log(
      "MP MP MP",
      this.node.scene.getComponentInChildren(Shooting).mp
    );
    //     this.node.scene.getComponentInChildren(Shooting).mp / 100;
  }
}
