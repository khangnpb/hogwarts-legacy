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
import { EnemyMovement } from "./EnemyMovement";
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
  isNear_Door = false;
  isOpen = false;
  isBroken = false;
  isTake = false;
  isHavekey = -1;

  inventory: InventoryManagement;
  switchcm: Node;
  switch: Node;
  chest1: Node;
  chest1cm: Node;
  chest2: Node;
  chest2cm: Node;
  spear: Node;
  doorcm: Node;
  doorneed: Node;
  player: Node;
  opendoor: Node;
  closedoor: Node;
  boxbroken: Node;
  newpower: Node;
  boxboxbox: Node;

  start() {
    this.switchcm = this.node.getChildByName("Switch_cm");
    this.switch = this.node.getChildByName("Switch");
    this.chest1cm = this.node.getChildByName("Chest_01_cm");
    this.chest1 = this.node.getChildByName("Chest_01");
    this.chest2cm = this.node.getChildByName("Chest_02_cm");
    this.chest2 = this.node.getChildByName("Chest_02");
    this.doorcm = this.node.getChildByName("Door_cm");
    this.doorneed = this.node.getChildByName("Door_need");
    this.opendoor = this.node.getChildByName("OpenDoor");
    this.closedoor = this.node.getChildByName("CloseDoor");
    this.boxbroken = this.node.getChildByName("BoxBroken");
    this.newpower = this.node.getChildByName("newPower");
    this.boxboxbox = this.node.getChildByName("BoxBoxBox");
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
        if (this.isNear_Door && this.isHavekey != -1 && !this.isOpen) {
          this.inventory.useItem(this.isHavekey);
          this.isOpen = true;
        }
        break;
    }
  }

  update(dt: number) {
    console.log(this.player.getPosition().x, " ", this.player.getPosition().y);
    this.isHavekey = this.inventory.havekey;
    if (
      this.boxboxbox.getComponent(EnemyMovement) &&
      this.boxboxbox.getComponent(EnemyMovement).hp <= 0
    )
      this.isBroken = true;

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

    if (
      this.player.getPosition().x > 1200 &&
      this.player.getPosition().x < 1400 &&
      this.player.getPosition().y > 650 &&
      !this.isOpen
    ) {
      this.isNear_Door = true;
      if (this.isHavekey != -1) {
        this.doorcm.active = true;
        this.doorneed.active = false;
      } else {
        this.doorcm.active = false;
        this.doorneed.active = true;
      }
    } else {
      this.isNear_Door = false;
      this.doorcm.active = false;
      this.doorneed.active = false;
    }

    //////////////////////

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

    if (this.isOpen == true) {
      this.opendoor.active = true;
      this.closedoor.active = false;
    } else {
      this.opendoor.active = false;
      this.closedoor.active = true;
    }
    if (
      this.player.position.x > 1450 &&
      this.player.position.x < 1500 &&
      this.player.position.y > -425 &&
      this.player.position.y < -375 &&
      this.isBroken &&
      !this.isTake
    ) {
      this.isTake = true;
      this.inventory.addgold(400);
    } 
    if (this.isBroken) {
      if (!this.isTake) this.newpower.active = true;
      else this.newpower.active = false;
      this.boxbroken.active = true;
    }
  }
}
