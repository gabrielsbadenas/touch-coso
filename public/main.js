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

let game = new Phaser.Game(config), timeText, ballsRestantantes = 99, ballText
//to do hacer que cuando se hace click se reste una pokeball
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
    let esto = this
    this.add.image(width / 2, height / 2, 'bg')
    const textSettings = { font: '16px Courier', fill: '#000000' }
    let text = this.add.text(16, 16, '', textSettings)
    text.setText(['Points: '])
    timeText = this.add.text(16, 32, '', textSettings)
    timeText.setText(['Time: '])
    ballText = this.add.text(16, 32 + 16, '', textSettings)
    ballText.setText(['Balls: ' + ballsRestantantes])
    for (let index = 1; index < spriteList.length; index++) {
        const element = spriteList[index];
        const sprite = this.physics.add.sprite(
            randomX(), randomY(), element).setInteractive()
        sprite.on('pointerdown', function (pointer) {
            this.setTint(0x00ff00)
            puntaje++
            text.setText([
                'Points: ' + puntaje
            ])
            esto.add.image(pointer.x, pointer.y, 'ball')
            ballsRestantantes--
        })
    }
    this.input.on('pointermove', function (pointer) {
        if (pointer.isDown) {
            esto.add.image(pointer.x, pointer.y, 'ball')
            ballsRestantantes--
        }
    })
    this.input.on('gameobjectdown', onObjectClicked)
}

function onObjectClicked(pointer, gameObject) {
    gameObject.setPosition(randomX(), randomY())
}

function update() {
    timeText.setText(['Time: ' + new Date().getSeconds()])

    ballText.setText(['Balls: ' + ballsRestantantes])
}

function randomX() {
    return random(16, width - 16)
}

function randomY() {
    return random(16, height - 16)
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}