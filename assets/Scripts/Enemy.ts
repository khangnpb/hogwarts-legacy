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
const { ccclass, property } = _decorator;

@ccclass("Enemy")
export class Enemy extends Component {
    @property moveSpeed = 200;
    @property hp = 100;
    rigidbody: RigidBody2D;
    movement: Vec2 = new Vec2(0, 0);


    start() {
    }

}
