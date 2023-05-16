import './style.css';
import pixiWorld from './PixiWorld';
import * as PIXI from 'pixi.js';
import * as RAPIER from '@dimforge/rapier2d-compat';
import { PhysisWorld } from './Rapier';
import Simulation from './Simulation';

let ballSize = 0.06;
let sheet: any;
let bitmapFonts: PIXI.Loader;

async function loader() {
  sheet = await PIXI.Assets.load('../sprites/new/sprites.json');
  bitmapFonts = await PIXI.Assets.load('../sprites/new/font.TTF');
}

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

RAPIER.init().then(() => {
  loader().then(() => {
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
      4000
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
      4000
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
      4000
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
      4000
    );
  });
});
