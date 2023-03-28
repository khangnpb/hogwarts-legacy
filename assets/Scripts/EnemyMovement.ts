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
import { PlayerMovement } from './PlayerMovement';

@ccclass("EnemyMovement")
export class EnemyMovement extends Enemy {
    rigidbody: RigidBody2D;
    movement: Vec2 = new Vec2(0, 0);
    moveValue = 0;
    step = -1;
    lim = 50;
    isNear = false;
    originPosX = 0
    originPosY = 0

    right = ["ERight0", "ERight1", "ERight2", "ERight3", "ERight4", "ERight5"];
    left = ["ELeft0", "ELeft1", "ELeft2", "ELeft3", "ELeft4", "ELeft5"];

    i_r = 0;
    i_l = 0;

    start() {
        this.rigidbody = this.getComponent(RigidBody2D);
        this.originPosX = this.node.position.x;
        this.originPosY = this.node.position.y; 
        for (let i = 0; i <= 5; i++) {
            this.node.getChildByName(this.left[i]).active = false;
            this.node.getChildByName(this.right[i]).active = false;
        }
        this.node.getChildByName(this.right[this.i_r]).active = true;
        this.i_r = (this.i_r + 1) % 6;
    }

    goToPosition(x: number, y: number) {

    }

    checkIsNear() {
        let pNode = this.node.parent.parent.getChildByName("PlayerMovement");
        let px = pNode.position.x, py = pNode.position.y;

        let eNode = this.node;
        let ex = eNode.position.x, ey = eNode.position.y;

        let distance = Math.sqrt((px - ex) * (px - ex) + (py - ey) * (py - ey));
        if (distance < 230)
            return true;
        return false;
    }

    move(deltaTime: number) {
        if (this.checkIsNear()) {
            this.node.angle = (this.node.angle + 1) % 360;
            let pNode = this.node.parent.parent.getChildByName("PlayerMovement");
            let px = pNode.position.x, py = pNode.position.y;
            this.goToPosition(px, py);
        }
        else {
            
        }
        this.moveValue += this.step;
        for (let i = 0; i <= 5; i++) {
            this.node.getChildByName(this.left[i]).active = false;
            this.node.getChildByName(this.right[i]).active = false;
        }
        
        if (this.step == 1) {
            this.node.getChildByName(this.right[Math.floor(this.i_r)]).active = true;
            this.i_r += deltaTime*10;
            if (this.i_r >= 6) this.i_r -= 6;
        }
        else {
            this.node.getChildByName(this.left[Math.floor(this.i_l)]).active = true;
            this.i_l += deltaTime*10;
            if (this.i_l >= 6) this.i_l -= 6;
        }

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