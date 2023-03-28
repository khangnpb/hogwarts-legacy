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
    Collider2D,
    BoxCollider2D,
    Contact2DType, instantiate, BoxCollider
} from "cc";
import { Enemy } from "./Enemy";
const { ccclass, property } = _decorator;
import { PlayerMovement } from './PlayerMovement';
import { Player } from './Player';
import { Shooting } from './Shooting';

@ccclass("EnemyMovement")
export class EnemyMovement extends Enemy {
    rigidbody: RigidBody2D;
    movement: Vec2 = new Vec2(0, 0);
    isNear = false;
    originPosX = 0
    originPosY = 0

    previousPosX = 0;
    previousPosY = 0;

    collider: Collider2D;

    right = ["ERight0", "ERight1", "ERight2", "ERight3", "ERight4", "ERight5"];
    left = ["ELeft0", "ELeft1", "ELeft2", "ELeft3", "ELeft4", "ELeft5"];

    i_r = 0;
    i_l = 0;
    isGoingBack = false;
    delayAttack = 0;

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

    goToPosition(x: number, y: number, deltaTime: number) {
        let eNode = this.node;
        let ex = eNode.position.x, ey = eNode.position.y;

        let goX = 0, goY = 0;

        if (ex < x) goX = 1;
        else if (ex > x) goX = -1
        else goX = 0;

        if (ey < y) goY = 1;
        else if (ey > y) goY = -1
        else goY = 0;

        this.rigidbody.linearVelocity = new Vec2(
            goX * this.moveSpeed * deltaTime,
            goY * this.moveSpeed * deltaTime,
        );
        return goX;
    }

    checkIsNear(deltaTime: number) {
        let pNode = this.node.parent.parent.getChildByName("PlayerMovement");
        let px = pNode.position.x, py = pNode.position.y;

        let eNode = this.node;
        let ex = eNode.position.x, ey = eNode.position.y;

        let distance = Math.sqrt((px - ex) * (px - ex) + (py - ey) * (py - ey));

        let player = pNode.getComponent(Shooting);
        if (Math.abs(px - ex) <= 40 && Math.abs(py - ey) <= 60) {

            this.delayAttack -= deltaTime;

            if (this.delayAttack <= 0) {
                this.delayAttack = 3;
                player.hp -= 10;
            }
        }

        //Nếu đi xa quá thì đi về vị trí cũ
        let distanceWithOriginPos = Math.sqrt((this.originPosX - ex) * (this.originPosX - ex) + (this.originPosY - ey) * (this.originPosY - ey));

        if (distanceWithOriginPos <= 50)
            this.isGoingBack = false;



        if (distanceWithOriginPos >= 400)
            this.isGoingBack = true;

        if (this.isGoingBack)
            return 0;



        if (distance < 230)
            return 1;
        return 2;
    }

    move(deltaTime: number) {
        let isGoLeft = 0;//-1 go Left, 0 dung yen, 1 go Right

        switch (this.checkIsNear(deltaTime)) {//0: di ve vi tri cu, 1: di den player, 2: dung yen
            case 0:
                isGoLeft = this.goToPosition(this.originPosX, this.originPosY, deltaTime);
                break;
            case 1:
                let pNode = this.node.parent.parent.getChildByName("PlayerMovement");
                let px = pNode.position.x, py = pNode.position.y;
                isGoLeft = this.goToPosition(px, py, deltaTime);
                break;
            default:
                isGoLeft = 0;
                break;
        }

        for (let i = 0; i <= 5; i++) {
            this.node.getChildByName(this.left[i]).active = false;
            this.node.getChildByName(this.right[i]).active = false;
        }


        if (isGoLeft == 1) {
            this.node.getChildByName(this.right[Math.floor(this.i_r)]).active = true;
            this.i_r += deltaTime * 10;
            if (this.i_r >= 6) this.i_r -= 6;
        }
        else if (isGoLeft == -1) {
            this.node.getChildByName(this.left[Math.floor(this.i_l)]).active = true;
            this.i_l += deltaTime * 10;
            if (this.i_l >= 6) this.i_l -= 6;
        }
        else {
            this.node.getChildByName(this.right[1]).active = true;
            this.rigidbody.linearVelocity = new Vec2(
                0,
                0
            );
        }


    }

    reduceHP(num: number) {
        this.hp -= num;
        console.log("Enemy's heal: ", this.hp);
        if (this.hp <= 0) {
            this.getComponent(BoxCollider2D).destroy();

            for (let i = 0; i <= 5; i++) {
                this.node.getChildByName(this.left[i]).active = false;
                this.node.getChildByName(this.right[i]).active = false;
            }
            this.destroy();
        }
    }

    update(deltaTime: number) {
        this.move(deltaTime);
    }
}