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
  director,
} from "cc";
import { Player } from "./Player";
const { ccclass, property } = _decorator;

function getDirectionFromAngle(angle: number) {
  if (angle < 0 || angle > 360) angle = (angle + 360 * 100) % 360;

  if ((angle >= 0 && angle < 22.5) || (angle < 360 && angle >= 337.5))
    return "u";
  if (angle >= 22.5 && angle < 67.5) return "ul";
  if (angle >= 67.5 && angle < 112.5) return "l";
  if (angle >= 112.5 && angle < 157.5) return "dl";
  if (angle >= 157.5 && angle < 202.5) return "d";
  if (angle >= 202.5 && angle < 247.5) return "dr";
  if (angle >= 247.5 && angle < 292.5) return "r";
  if (angle >= 292.5 && angle < 337.5) return "ur";
}

@ccclass("PlayerMovement")
export class PlayerMovement extends Player {
  @property moveSpeed = 200;
  @property(String) nextScene: string = "";
  rigidbody: RigidBody2D;
  movement: Vec2 = new Vec2(0, 0);

  isMovingUp = false;
  isMovingDown = false;
  isMovingLeft = false;
  isMovingRight = false;
  isFiring = false;

  //Sprite
  down = [
    "Down0",
    "Down1",
    "Down2",
    "Down3",
    "Down4",
    "Down5",
    "Down6",
    "Down7",
    "Down8",
  ];
  up = ["Up0", "Up1", "Up2", "Up3", "Up4", "Up5", "Up6", "Up7", "Up8"];
  right = [
    "Right0",
    "Right1",
    "Right2",
    "Right3",
    "Right4",
    "Right5",
    "Right6",
    "Right7",
    "Right8",
  ];
  left = [
    "Left0",
    "Left1",
    "Left2",
    "Left3",
    "Left4",
    "Left5",
    "Left6",
    "Left7",
    "Left8",
  ];

  downLeft = [
    "DownLeft0",
    "DownLeft1",
    "DownLeft2",
    "DownLeft3",
    "DownLeft4",
    "DownLeft5",
    "DownLeft6",
    "DownLeft7",
    "DownLeft8",
  ];
  downRight = [
    "DownRight0",
    "DownRight1",
    "DownRight2",
    "DownRight3",
    "DownRight4",
    "DownRight5",
    "DownRight6",
    "DownRight7",
    "DownRight8",
  ];
  upLeft = [
    "UpLeft0",
    "UpLeft1",
    "UpLeft2",
    "UpLeft3",
    "UpLeft4",
    "UpLeft5",
    "UpLeft6",
    "UpLeft7",
    "UpLeft8",
  ];
  upRight = [
    "UpRight0",
    "UpRight1",
    "UpRight2",
    "UpRight3",
    "UpRight4",
    "UpRight5",
    "UpRight6",
    "UpRight7",
    "UpRight8",
  ];
  i_d = 0;
  i_u = 0;
  i_r = 0;
  i_l = 0;
  i_dl = 0;
  i_dr = 0;
  i_ul = 0;
  i_ur = 0;
  move_direction = "d";
  mouseAngle = 0;

  start() {
    this.camera = this.node.scene.getComponentInChildren(Camera);
    this.rigidbody = this.getComponent(RigidBody2D);
    this.node.angle = (this.node.angle + 180) % 360;

    for (let i = 0; i <= 8; i++) {
      this.node.getChildByName(this.down[i]).active = false;
      this.node.getChildByName(this.up[i]).active = false;
      this.node.getChildByName(this.left[i]).active = false;
      this.node.getChildByName(this.right[i]).active = false;
      this.node.getChildByName(this.downLeft[i]).active = false;
      this.node.getChildByName(this.upLeft[i]).active = false;
      this.node.getChildByName(this.downRight[i]).active = false;
      this.node.getChildByName(this.upRight[i]).active = false;
    }

    this.node.getChildByName("ADown0").active = false;
    this.node.getChildByName("AUp0").active = false;
    this.node.getChildByName("ALeft0").active = false;
    this.node.getChildByName("ARight0").active = false;
    this.node.getChildByName("ADownLeft0").active = false;
    this.node.getChildByName("ADownRight0").active = false;
    this.node.getChildByName("AUpLeft0").active = false;
    this.node.getChildByName("AUpRight0").active = false;

    this.node.getChildByName(this.down[Math.floor(this.i_d)]).active = true;
    this.i_d++;

    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
    input.on(Input.EventType.MOUSE_DOWN, this.onLeftMouse, this);
    input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
        this.isMovingLeft = true;
        break;
      case KeyCode.ARROW_RIGHT:
        this.isMovingRight = true;
        break;
      case KeyCode.ARROW_UP:
        this.isMovingUp = true;
        break;
      case KeyCode.ARROW_DOWN:
        this.isMovingDown = true;
        break;
      case KeyCode.KEY_A:
        this.isMovingLeft = true;
        break;
      case KeyCode.KEY_D:
        this.isMovingRight = true;
        break;
      case KeyCode.KEY_W:
        this.isMovingUp = true;
        break;
      case KeyCode.KEY_S:
        this.isMovingDown = true;
        break;
      case KeyCode.SPACE:
        this.isFiring = true;
        break;
    }
  }

  onKeyUp(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
        this.isMovingLeft = false;
        break;
      case KeyCode.ARROW_RIGHT:
        this.isMovingRight = false;
        break;
      case KeyCode.ARROW_UP:
        this.isMovingUp = false;
        break;
      case KeyCode.ARROW_DOWN:
        this.isMovingDown = false;
        break;
      case KeyCode.KEY_A:
        this.isMovingLeft = false;
        break;
      case KeyCode.KEY_D:
        this.isMovingRight = false;
        break;
      case KeyCode.KEY_W:
        this.isMovingUp = false;
        break;
      case KeyCode.KEY_S:
        this.isMovingDown = false;
        break;
      case KeyCode.SPACE:
        this.isFiring = false;
        break;
    }
  }

  onLeftMouse(event: EventMouse) {
    switch (event.getButton()) {
      case 0:
        this.isFiring = true;
        break;
      case 1:
        this.isFiring = true;
        break;
    }
  }

  onMouseUp(event: EventMouse) {
    this.isFiring = false;
  }

  onMouseMove(event: EventMouse) {
    const mousePos = new Vec3(event.getLocationX(), event.getLocationY());
    const worldPos = new Vec3();
    this.camera.screenToWorld(mousePos, worldPos);
    const lookDir = worldPos.subtract(this.node.worldPosition);
    const angleInRadians = Math.atan2(lookDir.y, lookDir.x);
    const angleInDegrees = math.toDegree(angleInRadians);
    //this.node.angle = angleInDegrees - 90;
    this.mouseAngle = angleInDegrees - 90;
  }

  move(deltaTime: number) {
    if (this.isMovingLeft) {
      this.movement.x = -1;
    } else if (this.isMovingRight) {
      this.movement.x = 1;
    } else {
      this.movement.x = 0;
    }

    if (this.isMovingUp) {
      this.movement.y = 1;
    } else if (this.isMovingDown) {
      this.movement.y = -1;
    } else {
      this.movement.y = 0;
    }

    //Load Sprite
    if (
      this.isMovingLeft ||
      this.isMovingDown ||
      this.isMovingRight ||
      this.isMovingUp ||
      this.isFiring
    ) {
      for (let i = 0; i <= 8; i++) {
        this.node.getChildByName(this.down[i]).active = false;
        this.node.getChildByName(this.up[i]).active = false;
        this.node.getChildByName(this.left[i]).active = false;
        this.node.getChildByName(this.right[i]).active = false;
        this.node.getChildByName(this.downLeft[i]).active = false;
        this.node.getChildByName(this.upLeft[i]).active = false;
        this.node.getChildByName(this.downRight[i]).active = false;
        this.node.getChildByName(this.upRight[i]).active = false;
      }

      this.node.getChildByName("ADown0").active = false;
      this.node.getChildByName("AUp0").active = false;
      this.node.getChildByName("ALeft0").active = false;
      this.node.getChildByName("ARight0").active = false;
      this.node.getChildByName("ADownLeft0").active = false;
      this.node.getChildByName("ADownRight0").active = false;
      this.node.getChildByName("AUpLeft0").active = false;
      this.node.getChildByName("AUpRight0").active = false;
    }

    if (!this.isFiring) {
      if (this.isMovingLeft) {
        if (this.isMovingUp) {
          //ul
          this.node.getChildByName(this.upLeft[Math.floor(this.i_ul)]).active =
            true;
          this.i_ul += deltaTime * 10;
          if (this.i_ul >= 9) this.i_ul -= 8;
        } else if (this.isMovingDown) {
          //dl
          this.node.getChildByName(
            this.downLeft[Math.floor(this.i_dl)]
          ).active = true;
          this.i_dl += deltaTime * 10;
          if (this.i_dl >= 9) this.i_dl -= 8;
        } else {
          //l
          this.node.getChildByName(this.left[Math.floor(this.i_l)]).active =
            true;
          this.i_l += deltaTime * 10;
          if (this.i_l >= 9) this.i_l -= 8;
        }
      } else if (this.isMovingRight) {
        if (this.isMovingUp) {
          //ur
          this.node.getChildByName(this.upRight[Math.floor(this.i_ur)]).active =
            true;
          this.i_ur += deltaTime * 10;
          if (this.i_ur >= 9) this.i_ur -= 8;
        } else if (this.isMovingDown) {
          //dr
          this.node.getChildByName(
            this.downRight[Math.floor(this.i_dr)]
          ).active = true;
          this.i_dr += deltaTime * 10;
          if (this.i_dr >= 9) this.i_dr -= 8;
        } else {
          //r
          this.node.getChildByName(this.right[Math.floor(this.i_r)]).active =
            true;
          this.i_r += deltaTime * 10;
          if (this.i_r >= 9) this.i_r -= 8;
        }
      } else {
        if (this.isMovingUp) {
          //u
          this.node.getChildByName(this.up[Math.floor(this.i_u)]).active = true;
          this.i_u += deltaTime * 10;
          if (this.i_u >= 9) this.i_u -= 8;
        } else if (this.isMovingDown) {
          //d
          this.node.getChildByName(this.down[Math.floor(this.i_d)]).active =
            true;
          this.i_d += deltaTime * 10;
          if (this.i_d >= 9) this.i_d -= 8;
        }
      }
    } else {
      this.move_direction = getDirectionFromAngle(this.mouseAngle);
      switch (this.move_direction) {
        case "d":
          this.node.getChildByName("ADown0").active = true;
          break;
        case "u":
          this.node.getChildByName("AUp0").active = true;
          break;
        case "l":
          this.node.getChildByName("ALeft0").active = true;
          break;
        case "r":
          this.node.getChildByName("ARight0").active = true;
          break;
        case "dl":
          this.node.getChildByName("ADownLeft0").active = true;
          break;
        case "dr":
          this.node.getChildByName("ADownRight0").active = true;
          break;
        case "ul":
          this.node.getChildByName("AUpLeft0").active = true;
          break;
        case "ur":
          this.node.getChildByName("AUpRight0").active = true;
          break;
      }
    }

    this.rigidbody.linearVelocity = new Vec2(
      this.movement.x * deltaTime * this.moveSpeed,
      this.movement.y * deltaTime * this.moveSpeed
    );

    /*
        // Tính toán vị trí mới cho camera dựa trên vị trí của nhân vật
        const playerPos = this.node.worldPosition;
        const cameraPos = this.camera.node.worldPosition;
        const newPos = new Vec3(playerPos.x, playerPos.y, cameraPos.z);
        this.camera.node.worldPosition = newPos;
        */
  }

  update(deltaTime: number) {

    this.move(deltaTime);
    if (this.node.position.y > 800) {
      console.log(
        "Qua Man Qua Man Qua Man Qua Man Qua Man Qua Man Qua Man Qua Man"
      );
      director.loadScene(this.nextScene);
    }
  }
}
