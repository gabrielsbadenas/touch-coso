//objetivo: hacer un juego en el que cuando se hace click en un
//pokemon aparezca una pokeball, se sume un punto, el pokemon,
//aparezca en un lugar random cada vez que se hace click ya sea
//exitoso o no
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
}
function create() {
    let puntaje = 0
    this.add.image(width / 2, height / 2, 'bg')
    this.sprites = []
    for (let index = 1; index < spriteList.length; index++) {
        const element = spriteList[index];
        const sprite = this.physics.add.sprite(
            randomX(), randomY(), element).setInteractive()
        sprite.on('pointerdown', function (pointer) {
            this.setTint(0x000000)
            puntaje++
        })
    }
    for (let index = 0; index < this.sprites.length; index++) {
        this.sprites[index].setCollideWorldBounds(true);

    }
    this.input.on('gameobjectdown', onObjectClicked)
}
function onObjectClicked(pointer, gameObject) {
    gameObject.setPosition(randomX(), randomY)
}

function update() {
}
function randomX() {
    return random(16, 640 - 16)
}
function randomY() {
    return random(16, 480 - 16)
}
function random(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}