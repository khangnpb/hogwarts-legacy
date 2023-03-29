import { _decorator, Component, Node, Prefab, Button } from "cc";
const { ccclass, property } = _decorator;
import * as cc from "cc";

@ccclass("GameManager")
export class GameManager extends Component {
  @property(Prefab)
  curPrefab: Prefab = null!;

  @property(Node)
  myNode: Node | null = null;

  start() {
    // Attach the click event handler to the StartButton
    const startButton = this.node.getChildByName("start");
    const optionButton = this.node.getChildByName("option");
    const aboutButton = this.node.getChildByName("about");
    const exitButton = this.node.getChildByName("exit");
    const loadingLabel = this.node.getChildByName("loading");
    loadingLabel.active = false;
    startButton.active = true;
    optionButton.active = true;
    aboutButton.active = true;
    exitButton.active = true;
    if (startButton) {
      startButton.on(Node.EventType.TOUCH_END, this.onClickStartButton, this);
    }
    if (optionButton) {
      optionButton.on(Node.EventType.TOUCH_END, this.onClickOptionButton, this);
    }
    if (aboutButton) {
      aboutButton.on(Node.EventType.TOUCH_END, this.onClickAboutButton, this);
    }
    if (exitButton) {
      exitButton.on(Node.EventType.TOUCH_END, this.onClickExitButton, this);
    }
  }

  onClickStartButton() {
    // Get all child nodes of the parent node
    console.log("start button");
    this.hideButton();
  }
  onClickOptionButton() {
    console.log("option button");
    this.hideButton();
    const currentScene = cc.director.getScene();
    if (currentScene.name !== "Scene") {
      cc.director.loadScene("OptionScene", () => {
        console.log("OptionScene loaded successfully");
      });
    }
  }
  onClickAboutButton() {
    console.log("about button");
    this.hideButton();
    const currentScene = cc.director.getScene();
    if (currentScene.name !== "Scene") {
      cc.director.loadScene("About", () => {
        console.log("AboutScene loaded successfully");
      });
    }
  }
  onClickExitButton() {
    console.log("exit button");
    this.hideButton();
    cc.game.end();
  }
  hideButton() {
    const startButton = this.node.getChildByName("start");
    const optionButton = this.node.getChildByName("option");
    const aboutButton = this.node.getChildByName("about");
    const exitButton = this.node.getChildByName("exit");
    const loadingLabel = this.node.getChildByName("loading");
    loadingLabel.active = true;
    startButton.active = false;
    optionButton.active = false;
    aboutButton.active = false;
    exitButton.active = false;
  }
}
