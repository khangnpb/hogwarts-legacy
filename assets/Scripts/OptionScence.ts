import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;
import { Label } from 'cc';
import * as cc from 'cc';


@ccclass('OptionScence')
export class OptionScence extends Component {
    @property(Node)
    label: Node | null = null;
  
    onLoad() {
      // Add a click event listener to the button
      const button = this.getComponent(Button);
      if (button) {
        button.node.on(Button.EventType.CLICK, this.onClick, this);
      }
    }
  
    onClick() {
      console.log('Button clicked');
      if (this.label) {
          const labelComponent = this.label.getComponent(Label) as Label;
          if (labelComponent) {
            labelComponent.string = 'Button clicked';
              cc.director.loadScene('option-scene',() =>{cc.log('success')});
              // cc.log('yes');
          }
      }
    }
}


