import Phaser from "phaser";

const window={
  width:600,
  height:600
}

const config = {
  type:Phaser.WEBGL,
  width:window.width,
  height:window.height,
  canvas:canvas
}

const game= new Phaser.Game(config)