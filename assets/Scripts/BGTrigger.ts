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
  Button,
  Sprite,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("BGTrigger")
export class BGTriggerr extends Component {
  rigidbody: RigidBody2D;
  isSwitch = false;
  isNear = false;
  switchcm: Node;
  switch: Node;
  spear: Node;
  player: Node;

  start() {
    this.switchcm = this.node.getChildByName("Switch_cm");
    this.switch = this.node.getChildByName("Switch");
    this.spear = this.node.getChildByName("spear");
    this.player = this.node.getParent().getChildByName("PlayerMovement");
    console.log("Listen Listen Listen Listen");
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_F:
        // console.log("F F F F F F F F F F ");
        if (this.isNear == true) this.isSwitch = !this.isSwitch;
        break;
    }
  }

  update(dt: number) {
    if (
      this.player.getPosition().x > 400 &&
      this.player.getPosition().x < 600 &&
      this.player.getPosition().y > 600
    ) {
      this.isNear = true;
      this.switchcm.active = true;
    } else {
      this.isNear = false;
      this.switchcm.active = false;
    }

    if (this.isSwitch == true) {
      this.switch.active = true;
      this.spear.active = false;
    } else {
      this.switch.active = false;
      this.spear.active = true;
    }
    // console.log("Player in : ", this.player.getPosition().x," ",this.player.getPosition().y);
  }
}
