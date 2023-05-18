import './style.css';
import pixiWorld from './PixiWorld';
import * as PIXI from 'pixi.js';
import * as RAPIER from '@dimforge/rapier2d-compat';
import { PhysisWorld } from './Rapier';
import Simulation from './Simulation';

let ballSize = 0.06;
let sheet: any;
let bitmapFonts: PIXI.BitmapFont;

async function loader() {
  PIXI.Assets.load('../sprites/new/ArcadeClassic.ttf');

  console.log(bitmapFonts);
  sheet = await PIXI.Assets.load('/sprites.json');
  // bitmapFonts = await PIXI.Assets.load(bFont);
  // console.log(bitmapFonts);
}

RAPIER.init().then(() => {
  loader().then(() => {
    const font: PIXI.BitmapFont = PIXI.BitmapFont.from('myFont', {
      fontFamily: 'ARCADECLASSIC',
      fontSize: 200,
      fill: 0xffffff,
      align: 'center',
      stroke: '#000000',
      strokeThickness: 0,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 1,
      // textBaseline: 'alphabetic',
      // padding: 20,
      // whiteSpace: 'pre-line',
      // wordWrap: true,
      // wordWrapWidth: 20,
      // letterSpacing: 50,
    });

    const ruby = new Simulation(
      new pixiWorld(
        document.getElementById('canvasA') as HTMLCanvasElement,
        'Orb_08.png',
        ballSize,
        'Ruby',
        0xc11c22,
        sheet
      ),
      new PhysisWorld(ballSize),
      1000
    );

    const amber = new Simulation(
      new pixiWorld(
        document.getElementById('canvasB') as HTMLCanvasElement,
        'Orb_09.png',
        ballSize,
        'Amber',
        0xe46725,
        sheet
      ),
      new PhysisWorld(ballSize),
      2000
    );

    const pearl = new Simulation(
      new pixiWorld(
        document.getElementById('canvasC') as HTMLCanvasElement,
        'Orb_20.png',
        ballSize,
        'Pearl',
        0xffffff,
        sheet
      ),
      new PhysisWorld(ballSize),
      2000
    );

    const sapphire = new Simulation(
      new pixiWorld(
        document.getElementById('canvasD') as HTMLCanvasElement,
        'Orb_11.png',
        ballSize,
        'Sapphire',
        0x1271b5,
        sheet
      ),
      new PhysisWorld(ballSize),
      1000
    );
  });
});
