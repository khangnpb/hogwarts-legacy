import { _decorator, Prefab, Component, Node, Collider2D, BoxCollider2D, Contact2DType, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    collider: Collider2D;

    @property({ type: Prefab }) explosionPrefab: Prefab;

    start() {
        this.collider = this.getComponent(BoxCollider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    update(deltaTime: number) {

    }

    onBeginContact(self: Node, other: Node) {
        const explosion = instantiate(this.explosionPrefab);
        this.node.parent.addChild(explosion);
        explosion.setWorldPosition(this.node.getWorldPosition());
        setTimeout(() =>{
            if (this.node.active) this.node.destroy();
        });

    }
}

