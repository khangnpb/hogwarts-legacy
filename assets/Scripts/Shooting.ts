﻿import {
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
    camera: Camera;

    start() {
        this.firePoint = this.node.getChildByName('FirePoint');
        this.camera = this.node.scene.getComponentInChildren(Camera);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.on(Input.EventType.MOUSE_DOWN, this.onLeftMouse, this);
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this); // Đăng ký sự kiện onMouseMove
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
        let bullet = instantiate(this.bulletPrefab);
        this.node.parent.addChild(bullet);
        bullet.setWorldPosition(this.firePoint.getWorldPosition());
        bullet.angle = this.firePoint.angle;
        //Chỉnh góc theo con trỏ chuột
        const quat = new math.Quat();
        math.Quat.fromEuler(quat, 0, 0, bullet.angle + 180);
        bullet.setWorldRotation(quat);

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

