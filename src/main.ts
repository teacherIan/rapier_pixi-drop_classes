import './style.css';
import pixiWorld from './PixiWorld';
import * as PIXI from 'pixi.js';
import * as RAPIER from '@dimforge/rapier2d-compat';
import { PhysisWorld } from './Rapier';
import Simulation from './Simulation';

let ballSize = 0.06;

RAPIER.init().then(() => {
  const ruby = new Simulation(
    new pixiWorld(
      document.getElementById('canvasA') as HTMLCanvasElement,
      'Orb_08.png',
      ballSize,
      'Ruby',
      0xc11c22
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
      0xe46725
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
      0xffffff
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
      0x1271b5
    ),
    new PhysisWorld(ballSize),
    4000
  );
});
