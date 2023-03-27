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
    Prefab,
    instantiate,
    Button,
  } from "cc";
  const { ccclass, property } = _decorator;

@ccclass('Shooting')
export class Shooting extends Component {

    firePoint: Node;
    @property({ type: Prefab }) bulletPrefab: Prefab;
    bulletForce: number = 10;
    isFiring = false;

    start() {
        this.firePoint = this.node.getChildByName('FirePoint');
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.on(Input.EventType.MOUSE_DOWN, this.onLeftMouse, this);
    }

    onLeftMouse(event: EventMouse) {
        switch (event.getButton()) {
            case 0:
                this.isFiring = true;
                break;
            case 1:
                this.isFiring = true;
                break;
        }
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
          case KeyCode.SPACE:
            this.isFiring = true;
            break;
        }
      }

      onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
          case KeyCode.ARROW_LEFT:
          case KeyCode.SPACE:
            this.isFiring = false;
            break;
        }
      }

    shoot() {
        let bullet = instantiate(this.bulletPrefab);
        this.node.parent.addChild(bullet);
        bullet.setWorldPosition(this.firePoint.getWorldPosition());
        bullet.angle = this.node.angle;
        const rigidBody = bullet.getComponent(RigidBody2D);
        const impulse = new Vec2(this.firePoint.up.x * this.bulletForce, this.firePoint.up.y * this.bulletForce);
        rigidBody.applyLinearImpulseToCenter(impulse, true);
    }

    update(dt: number) {
        if (this.isFiring) {
            this.shoot();
            this.isFiring = false;
        }
    }

}

