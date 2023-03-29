import {
  _decorator,
  Prefab,
  Component,
  Node,
  Collider2D,
  BoxCollider2D,
  Contact2DType,
  instantiate,
} from "cc";
import Boss from "./Boss";
import { EnemyMovement } from "./EnemyMovement";
import { PlayerMovement } from "./PlayerMovement";
const { ccclass, property } = _decorator;

import { Shooting } from "./Shooting";

@ccclass("Bullet")
export class Bullet extends Component {
  collider: Collider2D;

  @property({ type: Prefab }) explosionPrefab: Prefab;
  damage = 25;
  start() {
    this.collider = this.getComponent(BoxCollider2D);
    if (this.collider) {
      this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  update(deltaTime: number) {}

  onBeginContact(self: Node, other: Node) {
    let temp1 = other.getComponent("EnemyMovement");
    let temp2 = other.getComponent("Boss");

    let p = this.node.scene
      .getComponentInChildren(PlayerMovement)
      .getComponent(Shooting);

    if (temp1) {
      temp1.reduceHP(this.damage * p.typeshoot);
    }
    if (temp2) {
      temp2.reduceHP(this.damage * p.typeshoot);
    }

    const explosion = instantiate(this.explosionPrefab);
    this.node.parent.addChild(explosion);
    explosion.setWorldPosition(this.node.getWorldPosition());
    setTimeout(() => {
      if (this.node.active) this.node.destroy();
    });
  }
}
