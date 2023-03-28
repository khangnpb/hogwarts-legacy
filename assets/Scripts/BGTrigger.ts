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
import { InventoryManagement } from "./InventoryManagement";
const { ccclass, property } = _decorator;

@ccclass("BGTrigger")
export class BGTriggerr extends Component {
  rigidbody: RigidBody2D;
  isSwitch = false;
  openChest1 = false;
  openChest2 = false;
  isNear_Switch = false;
  isNear_Chest01 = false;
  isNear_Chest02 = false;

  inventory: InventoryManagement;
  switchcm: Node;
  switch: Node;
  chest1: Node;
  chest1cm: Node;
  chest2: Node;
  chest2cm: Node;
  spear: Node;
  player: Node;

  start() {
    this.switchcm = this.node.getChildByName("Switch_cm");
    this.switch = this.node.getChildByName("Switch");
    this.chest1cm = this.node.getChildByName("Chest_01_cm");
    this.chest1 = this.node.getChildByName("Chest_01");
    this.chest2cm = this.node.getChildByName("Chest_02_cm");
    this.chest2 = this.node.getChildByName("Chest_02");
    this.spear = this.node.getChildByName("spear");
    this.player = this.node.getParent().getChildByName("PlayerMovement");
    this.inventory = this.node
      .getParent()
      .getChildByName("CameraMovement")
      .getChildByName("inventory")
      .getComponent(InventoryManagement);
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_F:
        if (this.isNear_Switch == true) this.isSwitch = !this.isSwitch;
        if (this.isNear_Chest01 == true && this.openChest1 == false) {
          this.inventory.getItem(1);
          this.inventory.getItem(2);
          this.inventory.addgold(50);
          this.openChest1 = true;
        }
        if (this.isNear_Chest02 == true && this.openChest2 == false) {
          this.inventory.getItem(2);
          this.inventory.getItem(3);
          this.inventory.addgold(100);
          this.openChest2 = true;
        }
        break;
    }
  }

  update(dt: number) {
    console.log(this.player.getPosition().x, " ", this.player.getPosition().y);
    if (
      this.player.getPosition().x > 400 &&
      this.player.getPosition().x < 600 &&
      this.player.getPosition().y > 600
    ) {
      this.isNear_Switch = true;
      this.switchcm.active = true;
    } else {
      this.isNear_Switch = false;
      this.switchcm.active = false;
    }

    if (
      this.player.getPosition().x > 250 &&
      this.player.getPosition().x < 400 &&
      this.player.getPosition().y > -310 &&
      this.player.getPosition().y < -250 &&
      !this.openChest1
    ) {
      this.isNear_Chest01 = true;
      this.chest1cm.active = true;
    } else {
      this.isNear_Chest01 = false;
      this.chest1cm.active = false;
    }

    if (
      this.player.getPosition().x > 800 &&
      this.player.getPosition().x < 850 &&
      this.player.getPosition().y > 500 &&
      this.player.getPosition().y < 550 &&
      !this.openChest2
    ) {
      this.isNear_Chest02 = true;
      this.chest2cm.active = true;
    } else {
      this.isNear_Chest02 = false;
      this.chest2cm.active = false;
    }

    if (this.isSwitch == true) {
      this.switch.active = true;
      this.spear.active = false;
    } else {
      this.switch.active = false;
      this.spear.active = true;
    }

    if (this.openChest1 == true) {
      this.chest1.active = true;
    } else {
      this.chest1.active = false;
    }

    if (this.openChest2 == true) {
      this.chest2.active = true;
    } else {
      this.chest2.active = false;
    }
  }
}
