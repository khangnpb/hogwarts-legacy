import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as cc from 'cc';

@ccclass('OptionSceneManager')
export class OptionSceneManager extends Component {
    @property(Node)
    myNode: Node | null = null;
    start() {
        const easyMode = this.node.getChildByName('easy');
        const hardMode = this.node.getChildByName('hard');
        const loading = this.node.getChildByName('loading');
        loading.active = false;
        if(easyMode){
            easyMode.on(Node.EventType.TOUCH_END, this.onClickEasyModeButton, this);
        }
        if(hardMode){
            hardMode.on(Node.EventType.TOUCH_END, this.onClickHardModeButton, this);
        }
    }
    hideButton() {
        const easyMode = this.node.getChildByName('easy');
        const hardMode = this.node.getChildByName('hard');
        const returnMode = this.node.getChildByName('loading');
        easyMode.active = false;
        hardMode.active = false;
        returnMode.active = true;
        true;
    }

    onClickHardModeButton(){
        console.log("Easy button");
        this.hideButton();
        const currentScene = cc.director.getScene();
        if (currentScene.name !== 'boss-fight-scene') {
            cc.director.loadScene('boss-fight-scene', () => {
                console.log('boss-fight-scene loaded successfully');
            });
        }
    }
    onClickEasyModeButton(){
        console.log("easy button");
        this.hideButton();
        const currentScene = cc.director.getScene();
        if (currentScene.name !== 'Scene') {
            cc.director.loadScene('Scene', () => {
                console.log('Scene loaded successfully');
            });
        }
    }
}


