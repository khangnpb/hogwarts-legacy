import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

enum BlockType {
    BT_NONE,
    BT_STON,
}

enum GameState {
    GS_INIT,
    GS_PLAYING,
    GS_END,
}

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Prefab)
    curPrefab: Prefab = null!;

    @property(Node)
    startMenu: Node = null;


    private _curState: GameState = GameState.GS_INIT;

    start() {
        
    }

    update(deltaTime: number) {
        
    }
}


