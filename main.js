import Phaser from "phaser";
import { Example } from "./js/test";

const browser={
  width: window.innerWidth, 
  height: window.innerHeight
}

//const speedDown = 300

const config = {
  type:Phaser.WEBGL,
  width:browser.width,
  height:browser.height,
  canvas:canvas,
  scene: Example,
  physics:{
    default:"arcade",
    arcade:{
      //gravity:{y:speedDown},
      debug:true
    }
  }
}

const game= new Phaser.Game(config)