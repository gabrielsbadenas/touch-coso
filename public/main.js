const width = 640, height = 480
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
function preload() {
    this.load.setBaseURL('./img')
    this.load.image('bg', 'sea-background.png')
    function pkmn() {
        const list = ['sandshrew', 'bird',
            'bulbasaur', 'chansey', 'clefairy',
            'jigglypuff', 'oddish', 'pikachu',
            'rattata', 'snorlax', 'squirtle'
        ]
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
    this.add.image(width / 2, height / 2, 'chansey')

    this.add.image(600, 400, 'jigglypuff')
    this.add.image(width / 1.5, height / 2, 'clefairy')
    /*
    const list = ['sandshrew', 'bird',
                'bulbasaur', 'chansey', 'clefairy',
                'jigglypuff', 'oddish', 'pikachu',
                'rattata', 'snorlax', 'squirtle'
            ]
    */
    this.add.image(500, 200, 'bulbasaur')
    this.add.image(500, 144, 'bird')
    this.add.image(160, 144, 'pikachu')
    this.add.image(160, 400, 'snorlax')
    //this.add.image(,,)
    this.add.image(480, 60, 'sandshrew')
    this.add.image(255, 255, 'oddish')
    this.add.image(69, 69, 'squirtle')
    this.add.image(180, 180, 'rattata')
}
function update() { }