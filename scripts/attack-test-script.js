import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import {attackTestRuleName} from './constants/character-names.js';
import {attackTestRules} from './constants/maps-game-rules.js';
import * as utils from './utils/index.js'

let me = {
    hearth: 3,
    canonBall: 0,
    action: null,
    hearthPosition: {
        1: {
            x: 4,
            y: 5
        },
        2: {
            x: 5,
            y: 5
        },
        3: {
            x: 6,
            y: 5
        },
    },
    canonBallPosition: {
        1: {
            x: 4,
            y: 6
        },
        2: {
            x: 5,
            y: 6
        },
        3: {
            x: 6,
            y: 6
        },
    }
}

let enemy = {
    hearth: 3,
    canonBall: 0,
    action: null,
    hearthPosition: {
        1: {
            x: 14,
            y: 5
        },
        2: {
            x: 13,
            y: 5
        },
        3: {
            x: 12,
            y: 5
        },
    },
    canonBallPosition: {
        1: {
            x: 14,
            y: 6
        },
        2: {
            x: 13,
            y: 6
        },
        3: {
            x: 12,
            y: 6
        },
    },
}

const removeHearth = (position, player) => {
    WA.room.setTiles([
        {
            x: position.x,
            y: position.y,
            tile: 'emptyHearth',
            layer: player === 'me' ? 'hearthZoneMe' : 'hearthZoneEnemy'
        },
    ]);
}

const removeCanonBall = (position, player) => {
    WA.room.setTiles([
        {
            x: position.x,
            y: position.y,
            tile: 'emptyCanonBall',
            layer: player === 'me' ? 'canonBallZoneMe' : 'canonBallZoneEnemy'
        },
    ]);
}

const addCanonBall = (position, player) => {
    WA.room.setTiles([
        {
            x: position.x,
            y: position.y,
            tile: 'canonBall',
            layer: player === 'me' ? 'canonBallZoneMe' : 'canonBallZoneEnemy'
        },
    ]);
}

const displayShield = (player) => {
    WA.room.setTiles([
        {
            x: player === 'me' ? 7 : 10,
            y: 5,
            tile: 'shield',
            layer: 'shield'
        },
    ]);
    utils.main.wait(1500).then(r => {
            WA.room.setTiles([
                {
                    x: player === 'me' ? 7 : 10,
                    y: 5,
                    tile: 'noShield',
                    layer: 'shield'
                },
            ]);
        }
    )


}

let round = 0
let endGame = false

const sendChatComment = false

const resetHearth = (player, position) => {
    WA.room.setTiles([
        {
            x: position.x,
            y: position.y,
            tile: 'fullHearth',
            layer: player === 'me' ? 'hearthZoneMe' : 'hearthZoneEnemy'
        },
    ]);
}

const resetItemPosition = (player, itemsPosition, item) => {
    console.log(player)
    console.log(itemsPosition)
    console.log(item)
    let loop = 1
    for (let i = 1; i <= 3; i++) {
       item === 'hearth' ? resetHearth(player, itemsPosition[loop]) : removeCanonBall(itemsPosition[loop], player)
        loop ++
    }
}

const resetGame = () => {
    console.log('reset')
    me.canonBall = 0
    me.hearth = 3
    enemy.canonBall = 0
    enemy.hearth = 3
    resetItemPosition('me', me.hearthPosition, 'hearth')
    resetItemPosition('me', me.canonBallPosition, 'canonBall')
    resetItemPosition('enemy', enemy.hearthPosition, 'hearth')
    resetItemPosition('enemy', enemy.canonBallPosition, 'canonBall')
    endGame = false
}

const enemyAttack = (playerAction) => {
    enemy.action = 'attack'
    enemy.canonBall --
    removeCanonBall(enemy.canonBallPosition[enemy.canonBall +1], 'enemy')
    utils.layers.toggleLayersVisibility('bangEnemy', true)
    setTimeout(()=> {
        utils.layers.toggleLayersVisibility('bangEnemy', false)
    }, 500)
    if(playerAction !== 'protect'){
        me.hearth --
        removeHearth(me.hearthPosition[me.hearth+1], 'me')
    }
    if(sendChatComment){
        WA.chat.sendChatMessage(utils.translations.translate('attackTest.attack') , utils.translations.translate('attackTest.enemy'))
    }
}

const enemyProtect = () => {
    enemy.action = 'protect'
    displayShield('enemy')
    if(sendChatComment) {
        WA.chat.sendChatMessage(utils.translations.translate('attackTest.protect'), utils.translations.translate('attackTest.enemy'))
    }
}

const enemyReload = () => {
    enemy.action = 'reload'
    enemy.canonBall ++
    addCanonBall(enemy.canonBallPosition[enemy.canonBall], 'enemy')
    if(sendChatComment) {
        WA.chat.sendChatMessage(utils.translations.translate('attackTest.reload'), utils.translations.translate('attackTest.enemy'))
    }
}

const displayRound = () => {
    if(sendChatComment){
        WA.chat.sendChatMessage('############################' , 'ROUND')
        WA.chat.sendChatMessage(`Round n° ${round}` , 'ROUND')
        WA.chat.sendChatMessage('############################' , 'ROUND')
        round ++
    }
}

const randomNumbers = (min, max) => {
    return Math.round(Math.random() * (max - min)) + min;
}

const enemyAction = (playerAction)=> {
    if(enemy.canonBall === 0){
        if(enemy.hearth === 1){
            const action3 = randomNumbers(1, 2)
            if(action3 === 1 && me.canonBall > 0) {
                enemyProtect()
            }else{
                enemyReload()
            }
        }else{
            enemyReload()
        }
    }else{
        const action = randomNumbers(1, 3)
        if(action === 1) {
            enemyProtect()
        }
        if(action === 2) {
            enemyAttack(playerAction)
        }
        if(action === 3 ){
            if(enemy.canonBall === 3){
                const action2 = randomNumbers(1, 2)
                if(action2 === 1 && me.canonBall > 0) {
                    enemyProtect()
                }
                if(action2 === 2) {
                    enemyAttack(playerAction)
                }
            }else{
                enemyReload()
            }
        }
    }
}

const exit =  () => {
    WA.ui.displayActionMessage({
    message: utils.translations.translate('attackTest.earthSeen'),
    callback: () => {
        mySound.stop();
        WA.nav.goToRoom('./ljdsqljds8KHID6rcSDKJHKHD8SDKHSD7.json')
        }
    })
};

let displayData = () => {
    if(sendChatComment){
        displayRound()
        WA.chat.sendChatMessage(
            utils.translations.translate('attackTest.heartsAndMunitions', {
                heartNumber: enemy.hearthPosition.x,
                munitionNumber: enemy.canonBall
            }), utils.translations.translate('attackTest.enemy'))
        WA.chat.sendChatMessage(
            utils.translations.translate('attackTest.heartsAndMunitions', {
                heartNumber: me.hearthPosition.x,
                munitionNumber: me.canonBall
            }),
            utils.translations.translate('attackTest.me'))
    }
    if(enemy.hearth === 0 && me.hearth === 0){
        WA.chat.sendChatMessage(utils.translations.translate('attackTest.equality'), utils.translations.translate('characterNames.attackTestRuleName'))
        endGame = true
    }else if(enemy.hearth === 0 && me.hearth > 0){
        WA.chat.sendChatMessage(utils.translations.translate('attackTest.win'), utils.translations.translate('characterNames.attackTestRuleName'))
        endGame = true
        exit()
    }else if(me.hearth === 0 && enemy.hearth > 0){
        WA.chat.sendChatMessage(utils.translations.translate('attackTest.loose'), utils.translations.translate('characterNames.attackTestRuleName'))
        endGame = true
    }
}

let triggerProtect;
WA.room.onEnterLayer('protectZone').subscribe(() => {
    triggerProtect = WA.ui.displayActionMessage({
        message: utils.translations.translate('utils.executeAction', {
            action:  utils.translations.translate(endGame ? 'attackTest.reloadGame' : 'attackTest.toProtect')
        }),
        callback: () => {
            if(endGame){
                resetGame()
            }else{
                displayShield('me')
                enemyAction('protect')
                if(sendChatComment) {
                    WA.chat.sendChatMessage(utils.translations.translate('attackTest.protect'), utils.translations.translate('attackTest.me'))
                }
                displayData()
            }
        }
    });
})
WA.room.onLeaveLayer('protectZone').subscribe(() => {
    triggerProtect.remove()
})

let triggerAttack;
WA.room.onEnterLayer('attackZone').subscribe(() => {
    triggerAttack = WA.ui.displayActionMessage({
        message: utils.translations.translate('utils.executeAction', {
            action:  utils.translations.translate(endGame ? 'attackTest.reloadGame' : 'attackTest.toAttack')
        }),
        callback: () => {
            if(endGame){
                resetGame()
            }else{
                if(me.canonBall > 0){
                    enemyAction('attack')
                    utils.layers.toggleLayersVisibility('bangMe', true)
                    setTimeout(()=> {
                        utils.layers.toggleLayersVisibility('bangMe', false)
                    }, 500)
                    if(enemy.action !== 'protect'){
                        enemy.hearth --
                        removeHearth(enemy.hearthPosition[enemy.hearth +1], 'enemy')
                    }
                    me.canonBall --
                    removeCanonBall(me.canonBallPosition[me.canonBall +1], 'me')
                    if(sendChatComment) {
                        WA.chat.sendChatMessage(utils.translations.translate('attackTest.attack'), utils.translations.translate('attackTest.me'))
                    }
                    displayData()
                }else{
                    WA.chat.sendChatMessage(utils.translations.translate('attackTest.noMoreMunitions'), utils.translations.translate('attackTest.me'))
                }
            }
        }
    });
})
WA.room.onLeaveLayer('attackZone').subscribe(() => {
    triggerAttack.remove()
})

let triggerReload;
WA.room.onEnterLayer('reloadZone').subscribe(() => {
    triggerReload = WA.ui.displayActionMessage({
        message: utils.translations.translate('utils.executeAction', {
            action:  utils.translations.translate(endGame ? 'attackTest.reloadGame' : 'attackTest.toReload')
        }),
        callback: () => {
            if(endGame){
                resetGame()
            }else{
                if(me.canonBall !== 3){
                    enemyAction('reload')
                    me.canonBall ++
                    addCanonBall(me.canonBallPosition[me.canonBall], 'me')
                    if(sendChatComment) {
                        WA.chat.sendChatMessage(utils.translations.translate('attackTest.reload'), utils.translations.translate('attackTest.me'))
                    }
                    displayData()
                }else{
                    WA.chat.sendChatMessage(utils.translations.translate('attackTest.maximumMunitions'), utils.translations.translate('attackTest.me'))
                }
            }

        }
    });
})
WA.room.onLeaveLayer('reloadZone').subscribe(() => {
    triggerReload.remove()
})



let triggerTuto;
WA.room.onEnterLayer('tuto').subscribe(() => {
    triggerTuto = WA.ui.displayActionMessage({
        message: utils.translations.translate('utils.executeAction', {
            action: utils.translations.translate('utils.seeTheRules')
        }) ,
        callback: () => {
            utils.chat.monologue(attackTestRules, utils.translations.translate('characterNames.attackTestRuleName')) // TODO : monologue translation keys
        }
    });
})
WA.room.onLeaveLayer('tuto').subscribe(() => {
    triggerTuto.remove()
})

var mySound = WA.sound.loadSound("../sounds/attack.mp3");
var soundConfig = {
    volume : 0.2,
    loop : true,
    rate : 1,
    detune : 1,
    delay : 0,
    seek : 0,
    mute : false
}
mySound.play(soundConfig);

