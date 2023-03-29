import { _decorator, Component, Node, Button } from 'cc';
import * as cc from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ReturnMenu')
export class ReturnMenu extends Component {
    @property(Node)
    myNode: Node | null = null;
  
    private button?: Button;
    onLoad() {
        // Add a click event listener to the button
        this.button = this.getComponent(Button);
        console.log(this.button.name);
        
        this.button?.node.on(Button.EventType.CLICK, this.onClick, this);
      }
    
      onDestroy() {
        const button = this.getComponent(Button);
        
        if(button && button.node){
          button.node.off(Button.EventType.CLICK, this.onClick, this);
         
        }
          
      }
    
      onClick() {
        console.log('Button clicked');
        
        const currentScene = cc.director.getScene();
        if (currentScene.name !== 'menu-scene') {
          cc.director.loadScene('menu-scene', () => {
            console.log('Scene loaded successfully');
          });
        }
    
      }
}


