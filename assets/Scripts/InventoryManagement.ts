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
  Sprite,
  SpriteFrame,
  loader,
  Rect,
  Label,
} from "cc";
import { Shooting } from "./Shooting";
const { ccclass, property } = _decorator;

@ccclass("InventoryManagement")
export class InventoryManagement extends Component {
  inventory_type: number[] = [];
  inventory_node: Node[] = [];
  player: Shooting;
  gold: number;

  start() {
    this.gold = 0 ;
    this.inventory_node.push(this.node.getChildByName("item1"));
    this.inventory_node.push(this.node.getChildByName("item2"));
    this.inventory_node.push(this.node.getChildByName("item3"));
    this.inventory_node.push(this.node.getChildByName("item4"));
    this.inventory_node.push(this.node.getChildByName("item5"));
    this.player = this.node
      .getParent()
      .getParent()
      .getChildByName("PlayerMovement")
      .getComponent(Shooting);
    for (let i = 0; i < 5; i++) {
      this.inventory_type.push(0);
      this.inventory_node[i].getChildByName("hp").active = false;
      this.inventory_node[i].getChildByName("mp").active = false;
      this.inventory_node[i].getChildByName("key").active = false;
    }
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

    this.getItem(1);
    this.getItem(1);
    this.getItem(2);
  }
  getItem(type: number) {
    let i = 0;
    for (i = 0; i < 5; i++) {
      if (this.inventory_type[i] == 0) break;
    }
    if (i >= 5) return;

    this.inventory_type[i] = type;

    if (type == 1) {
      this.inventory_node[i].getChildByName("hp").active = true;
    } else if (type == 2) {
      this.inventory_node[i].getChildByName("mp").active = true;
    } else if (type == 3) {
      this.inventory_node[i].getChildByName("key").active = true;
    }
  }
  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.DIGIT_1:
        this.useItem(0);
        break;
      case KeyCode.DIGIT_2:
        this.useItem(1);
        break;
      case KeyCode.DIGIT_3:
        this.useItem(2);
        break;
      case KeyCode.DIGIT_4:
        this.useItem(3);
        break;
      case KeyCode.DIGIT_5:
        this.useItem(4);
        break;
    }
  }
  addgold(x: number){
    this.gold += x;
  }
  useItem(index: number) {
    let type = this.inventory_type[index];
    if (type == 0) return;
    else if (type == 1) {
      this.inventory_type[index] = 0;
      this.inventory_node[index].getChildByName("hp").active = false;
      this.player.hp += 50;
      if (this.player.hp > 100) this.player.hp = 100;
    } else if (type == 2) {
      this.inventory_type[index] = 0;
      this.inventory_node[index].getChildByName("mp").active = false;
      this.player.mp += 50;
      if (this.player.mp > 100) this.player.mp = 100;
    } else if (type == 3) {
      return;
    }
  }
   
  update(dt : number){
     this.node.getChildByName("Gold").getChildByName("Label").getComponent(Label).string = this.gold.toString();
  }
}
