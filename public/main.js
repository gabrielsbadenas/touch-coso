const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
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
function preload(){}
function create(){}
function update(){}