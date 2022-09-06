const width = 640, height = 480,
    config = {
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
    },
    spriteList = ['ball',
        'sandshrew', 'bird',
        'bulbasaur', 'chansey', 'clefairy',
        'jigglypuff', 'oddish', 'pikachu',
        'rattata', 'snorlax', 'squirtle'
    ]
let game = new Phaser.Game(config), time

function preload() {
    this.load.setBaseURL('./img')
    this.load.image('bg', 'sea-background.png')
    function pkmn() {
        const list = spriteList
        const png = []
        list.forEach(element => {
            png.push(element + '.png')
        });
        return { list, png }
    }
    const pkmnList = pkmn()
    for (let index = 0; index < pkmnList.list.length; index++) {
        const element = pkmnList.list[index];
        const elementPNG = pkmnList.png[index];
        this.load.image(element, elementPNG)

    }
    //this.load.image('','')
}

function create() {
    this.add.image(width / 2, height / 2, 'bg')
    for (let index = 1; index < spriteList.length; index++) {
        const element = spriteList[index];
        this.physics.add.sprite(
            random(16, 640 - 16), random(16, 480 - 16), element)
    }
}

function update() { }
function random(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}