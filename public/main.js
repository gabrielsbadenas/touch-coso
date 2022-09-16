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

let game = new Phaser.Game(config), timeText,
    ballsRestantantes = 99, ballText, puntaje = 0,
    startTime, gameOver, text
//to do hacer que cuando se hace click se reste una pokeball
function preload() {
    this.load.setBaseURL('./img')
    //to do cambiar el fondo cuando se llega a cierto puntaje o
    //pasan cierta cantidad de puntos
    this.load.image('bg', 'sea-background.png')
    function pkmn() {
        const list = spriteList
        const png = []
        list.forEach(element => {
            png.push(element + '.png')
        });
        return { list, png };
    }
    const pkmnList = pkmn()
    for (let index = 0; index < pkmnList.list.length; index++) {
        const element = pkmnList.list[index];
        const elementPNG = pkmnList.png[index];
        this.load.image(element, elementPNG)
    }
}

function useBall() {
    if (ballsRestantantes <= 0) {
        const tiempoGO = new Date()
        if (gameOver === undefined) {
            gameOver = {
                puntaje,
                tiempo:
                    (tiempoGO - startTime) / 1000
            }
        }
        /*
        document.cookie="points"+new Date()+"="+gameOver.puntaje+
        " tiempo"+new Date()+"="+gameOver.tiempo+"; expires=01 Jan 2023 00:00:00 UTC; path=/;"
        console.log(document.cookie)
        */
        //console.log('gameover', gameOver)
    } else {
        ballsRestantantes--
    }
    return gameOver;
}

function up1() {
    if (!(ballsRestantantes <= 0)) {
        puntaje++;
    }
}

function create() {
    startTime = new Date()
    let esto = this
    const layer0 = this.add.layer()
    layer0.add(this.add.image(width / 2, height / 2, 'bg'))
    const textLayer = this.add.layer()
    let textPos = { y: 4, x: [4, 255, width - 90] }
    const textSettings = { font: '16px Courier', fill: '#000000' }
    text = this.add.text(textPos.x[0], textPos.y, '', textSettings)
    text.setText(['Points: 0'])
    timeText = this.add.text(textPos.x[1], textPos.y, '', textSettings)
    timeText.setText(['Time: '])
    ballText = this.add.text(textPos.x[2], textPos.y, '', textSettings)
    ballText.setText(['Balls: ' + ballsRestantantes])
    textLayer.add(text)
    textLayer.add(timeText)
    textLayer.add(ballText)
    console.log(textLayer.depth,layer0.depth)
    for (let index = 1; index < spriteList.length; index++) {
        const element = spriteList[index];
        const sprite = this.physics.add.sprite(
            randomX(), randomY(), element).setInteractive()
        sprite.on('pointerdown', function (pointer) {
            this.setTint(0x00ff00)
            up1()
            text.setText([
                'Points: ' + puntaje
            ])
            esto.add.image(pointer.x, pointer.y, 'ball')
            useBall()
        })
    }
    this.input.on('pointermove', function (pointer) {
        if (pointer.isDown) {

            if (ballsRestantantes > 0) {
                esto.add.image(pointer.x, pointer.y, 'ball')
                //   console.log(pointer.x, pointer.y)
            }

            useBall()
            // }
        }
    })
    this.input.on('gameobjectdown', onObjectClicked)
}

function onObjectClicked(pointer, gameObject) {
    if (ballsRestantantes > 0) {
        gameObject.setPosition(randomX(), randomY())
    }
}
//to do hacer un game over screen
function update() {
    //cambiar para que deje de ser un reloj y en su lugar cuente cuantos
    //segundos pasaron desde que comenzo el juego
    let reloj = startTime - new Date()
    let relojSeg = (-reloj) / 1000
    ballText.setText(['Balls: ' + ballsRestantantes])
    if (gameOver !== undefined) {
        this.add.image(width / 2, (height / 2) + 32, 'bg')
        text.setText(['GAME OVER; Points: ' + gameOver.puntaje])
        //+ '; Time: ' + gameOver.tiempo])
    } else {
        timeText.setText(['Time: ' + relojSeg])
    }
}

function randomX() {
    return random(16, width - 16)
}

function randomY() {
    return random(32, height - 16)
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}