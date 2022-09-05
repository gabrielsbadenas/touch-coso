const width = 640,height=480
const config = {
    type: Phaser.AUTO,
    width,
    height,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload, create, update
    }
}
let game = new Phaser.Game(config)
function preload(){
    this.load.setBaseURL('./img')
    this.load.image('bg','sea-background.png')
    //this.load.image('','')
}
function create(){
    this.add.image(width/2,height/2,'bg')
}
function update(){}