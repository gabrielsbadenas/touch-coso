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
    //this.load.image('','')
}

    //let pointer = new Phaser.Pointer(game, 0)
function create() {
    this.add.image(width / 2, height / 2, 'bg')
    this.sprites=[]
    /*
    this.monsters = this.game.add.group();
var monster;
monsterData.forEach(function(data) {
    // create a sprite for them off screen
    monster = state.monsters.create(1000, state.game.world.centerY, data.image);
    // center anchor
    monster.anchor.setTo(0.5);
    // reference to the database
    monster.details = data;
    //enable input so we can click it!
    monster.inputEnabled = true;
    monster.events.onInputDown.add(state.onClickMonster, state);
});
    */
    for (let index = 1; index < spriteList.length; index++) {
        const element = spriteList[index];
        this.sprites.push(this.physics.add.sprite(
            randomX(), randomY(), element))
    }
    for (let index = 0; index < this.sprites.length; index++) {
        //const element = 
        this.sprites[index].setCollideWorldBounds(true);
        
    }
    this.input.on('gameobjectdown', onObjectClicked)
}

function onObjectClicked(pointer, gameObject) {
    gameObject.setPosition(randomX(), randomY)
}

function update() {
    //pointer.LEFT_BUTTON
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
/*
class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        this.load.image("face", "images/face.png");
    }
    create() {
 
        this.face = this.add.image(game.config.width / 2, game.config.height / 2, "face");
        this.face.angle = 25;
         
        this.face.setInteractive();
 
 
        var textConfig={fontSize:'20px',color:'#ff0000',fontFamily: 'Arial'};
 
        this.title=this.add.text(game.config.width/2,game.config.height*.75,"HELLO PHASER!!!",textConfig);
         
        //setOrigin() replaces anchor.set()
        //sprites now default to orign 0.5 for both x and y
        this.title.setOrigin(0.5,0.5);
 
       //this will listen for a down event 
       //on every object that is set interactive
       this.input.on('gameobjectdown',this.onObjectClicked);
         
    }
    onObjectClicked(pointer,gameObject)
    {
        gameObject.angle+=10;
    }
    update() {}
}
https://phasergames.com/phaser-3-basics-images-text-and-click/
*/