import * as PIXI from 'pixi.js';
const sheet = await PIXI.Assets.load('../sprites/new/sprites.json');
const bitmapFonts: PIXI.Loader = await PIXI.Assets.load(
  '../sprites/new/font.TTF'
);

const font: PIXI.BitmapFont = PIXI.BitmapFont.from('myFont', {
  fontFamily: '04B',
  fontSize: 200,
  fill: 0xffffff,
  align: 'center',
  stroke: '#000000',
  strokeThickness: 0,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 1,
});

export default class PixiWorld {
  private app: PIXI.Application;
  private texture: string;
  private ballSize: number;
  private title: string;
  private color: number;

  constructor(
    parent: HTMLCanvasElement,
    texture: string,
    ballSize: number,
    name: string,
    color: number
  ) {
    this.title = name;
    this.color = color;
    this.texture = texture;
    this.ballSize = ballSize;
    this.app = new PIXI.Application({
      view: parent,
      resizeTo: parent,
      width: window.innerWidth / 4,
      height: window.innerHeight,
      backgroundColor: 0x669bbc,
      backgroundAlpha: 0.3,
      resolution: Math.min(window.devicePixelRatio, 2),
      autoDensity: true,
    });
    this.app.stage.sortableChildren = true;
    this.createLeftWall();
    this.createTitleText();
    this.createCounterText();
  }
  public get App(): PIXI.Application {
    return this.app;
  }

  public createSphere(size: number): PIXI.Sprite {
    const sphere = PIXI.Sprite.from(sheet.textures[this.texture]);
    sphere.scale.set(size * this.ballSize);
    sphere.anchor.set(0.5);
    return sphere;
  }

  public async createTitleText() {
    const textSprite: PIXI.BitmapText = new PIXI.BitmapText(this.title, {
      fontName: 'myFont',
      fontSize: 90,
      align: 'center',
      tint: this.color,
    });

    textSprite.x = window.innerWidth / 8;
    textSprite.y = window.innerHeight / 8;
    textSprite.anchor.set(0.5);
    textSprite.zIndex = 0;
    textSprite.scale.y = 2;
    if (this.title === 'Sapphire') {
      textSprite.scale.x = 0.7;
    }
    textSprite.roundPixels = true;

    this.app.stage.addChild(textSprite);
  }

  public async createCounterText() {
    let num = 0;
    const textSprite: PIXI.BitmapText = new PIXI.BitmapText(num.toString(), {
      fontName: 'myFont',
      fontSize: 90,
      align: 'center',
      tint: 0xffffff,
    });

    textSprite.x = window.innerWidth / 8;
    textSprite.y = window.innerHeight - window.innerHeight / 8;
    textSprite.anchor.set(0.5);
    textSprite.zIndex = 100;
    textSprite.scale.y = 2;

    setInterval(() => {
      num = num + 1;
      let text = num.toString();
      while (text.length < 4) {
        text = '0' + text;
      }

      textSprite.text = text;
    }, 10);

    this.app.stage.addChild(textSprite);
  }

  public createLeftWall() {
    const wall = new PIXI.Graphics();
    wall.beginFill(0x000000);
    wall.drawRect(0, 0, 1, window.innerHeight);
    wall.endFill();
    wall.x = 0;
    wall.y = 0;
    this.app.stage.addChild(wall);
  }

  public createRightWall() {
    const wall = new PIXI.Graphics();
    wall.beginFill(0x000000);
    wall.drawRect(0, 0, 1, window.innerHeight);
    wall.endFill();
    wall.x = window.innerWidth / 4;
    wall.y = 0;
    this.app.stage.addChild(wall);
  }
}
