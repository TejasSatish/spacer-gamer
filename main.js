import Phaser from "phaser";
import { Example } from "./js/test";

const browser={
  width: window.innerWidth, 
  height: window.innerHeight
}

const config = {
  type:Phaser.WEBGL,
  width:browser.width,
  height:browser.height,
  canvas:canvas,
  scene: Example,
  physics:{
    default:"arcade",
    arcade:{
      degug:true
    }
  }
}

const game= new Phaser.Game(config)