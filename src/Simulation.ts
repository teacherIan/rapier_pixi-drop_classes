import * as PIXI from 'pixi.js';
import * as RAPIER from '@dimforge/rapier2d-compat';
import { PhysisWorld } from './Rapier';
import PixiWorld from './PixiWorld';

interface IObject {
  render: PIXI.Sprite;
  physics: RAPIER.RigidBody;
}

export default class Simulation {
  public static simulationCounter = 0;
  private app: PixiWorld;
  private world: PhysisWorld;
  private sphereArr: IObject[] = [];
  private counter;
  private interval: NodeJS.Timeout;
  private sphereCounter = 0;

  constructor(app: PixiWorld, world: PhysisWorld, counter: number) {
    this.counter = counter;
    this.app = app;
    this.world = world;
    Simulation.simulationCounter++;

    this.interval = setInterval(() => {
      if (this.sphereCounter >= this.counter) {
        clearInterval(this.interval);
        return;
      }
      let remaining = this.counter - this.sphereCounter;
      let size = Math.min(Math.floor(Math.random() * 3) + 1, remaining);

      this.createSphere(
        window.innerWidth / 8 + Math.random() * 10,
        Math.random() * -window.innerHeight - 100,
        size
      );

      this.sphereCounter += size;
      // console.log(this.sphereCounter);
    }, 16);

    this.app.App.ticker.add((delta: number) => {
      this.sphereArr.forEach((sphere) => {
        sphere.render.x = sphere.physics.translation().x;
        sphere.render.y = sphere.physics.translation().y;
        sphere.render.rotation = sphere.physics.rotation();
      });
      this.world.stepWorld(delta * 0.1);
      this.app.App.render();
    });
  }

  public async createSphere(x: number, y: number, size: number) {
    const sphere = this.app.createSphere(size);
    this.app.App.stage.addChild(await sphere);
    const physicsSphere = this.world.createPhysicsSphere(x, y, size);
    this.sphereArr.push({ render: await sphere, physics: physicsSphere });
  }
}
