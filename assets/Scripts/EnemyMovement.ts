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
} from "cc";
import { Enemy } from "./Enemy";
const { ccclass, property } = _decorator;

@ccclass("EnemyMovement")
export class EnemyMovement extends Enemy {
    rigidbody: RigidBody2D;
    movement: Vec2 = new Vec2(0, 0);
    moveValue = 0;
    step = -1;
    lim = 50;

    start() {
        this.rigidbody = this.getComponent(RigidBody2D);

    }


    move(deltaTime: number) {

        this.moveValue += this.step;

        if (this.moveValue >= this.lim) {
            this.moveValue = this.lim;
            this.step = -1;
        }
        else if (this.moveValue <= -this.lim) {
            this.moveValue = -this.lim;
            this.step = 1;
        }
        this.rigidbody.linearVelocity = new Vec2(
            this.moveValue * this.moveSpeed * deltaTime,
            0
        );

    }

    update(deltaTime: number) {
        this.move(deltaTime)
    }
}