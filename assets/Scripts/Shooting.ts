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
  } from "cc";
import { PlayerMovement } from "./PlayerMovement";
const { ccclass, property } = _decorator;

@ccclass('Shooting')
export class Shooting extends Component {

    firePoint: Node;
    @property({ type: Prefab }) bulletPrefab: Prefab;
    bulletForce: number = 10;
    isFiring = false;
    camera: Camera;

    start() {
        this.firePoint = this.node.getChildByName('FirePoint');
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);


        this.camera = this.node.scene.getComponentInChildren(Camera);
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this); // Đăng ký sự kiện onMouseMove
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


    onMouseMove(event: EventMouse) {
        const mousePos = new Vec3(event.getLocationX(), event.getLocationY());
        const worldPos = new Vec3();
        this.camera.screenToWorld(mousePos, worldPos);

        // tính toán góc quay của FirePoint
        const firePointWorldPos = this.firePoint.getWorldPosition();
        const lookDir = worldPos.subtract(firePointWorldPos);
        const angleInRadians = Math.atan2(lookDir.y, lookDir.x);
        const angleInDegrees = math.toDegree(angleInRadians);
        this.firePoint.angle = angleInDegrees - this.node.angle - 90;
    }


    shoot() {
        //Chỉnh góc theo con trỏ chuột

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

