import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import {attackTestRuleName} from './constants/character-names.js';
import {attackTestRules} from './constants/maps-game-rules.js';
import {wait, monologue, toggleLayersVisibility} from "./utils.js";

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
    wait(1500).then(r => {
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

const oldresetGame = () => {
    if(window.location.href.indexOf("attack-test-reset.json") === -1){
        WA.nav.goToRoom('./attack-test.json')
    }else{
        WA.nav.goToRoom('./attack-test-reset.json')
    }
}

const enemyAttack = (playerAction) => {
    enemy.action = 'attack'
    enemy.canonBall --
    removeCanonBall(enemy.canonBallPosition[enemy.canonBall +1], 'enemy')
    toggleLayersVisibility('bangEnemy', true)
    setTimeout(()=> {
        toggleLayersVisibility('bangEnemy', false)
    }, 500)
    if(playerAction !== 'protect'){
        me.hearth --
        removeHearth(me.hearthPosition[me.hearth+1], 'me')
    }
    if(sendChatComment){
        WA.chat.sendChatMessage(`J\'attaque` , 'Enemy')
    }
}

const enemyProtect = () => {
    enemy.action = 'protect'
    displayShield('enemy')
    if(sendChatComment) {
        WA.chat.sendChatMessage(`Je me protège`, 'Enemy')
    }
}

const enemyReload = () => {
    enemy.action = 'reload'
    enemy.canonBall ++
    addCanonBall(enemy.canonBallPosition[enemy.canonBall], 'enemy')
    if(sendChatComment) {
        WA.chat.sendChatMessage('Je recharge', 'Enemy')
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
    message: "Terre en vue ! Voulez-vous ammarer ?",
    callback: () => {
        mySound.stop();
        WA.nav.goToRoom('./ljdsqljds8KHID6rcSDKJHKHD8SDKHSD7.json')
        }
    })
};

let displayData = () => {
    if(sendChatComment){
        displayRound()
        WA.chat.sendChatMessage(`coeur : ${enemy.hearthPosition.x}, munition : ${enemy.canonBall}`, 'Enemy')
        WA.chat.sendChatMessage(`coeur : ${me.hearthPosition.x}, munition : ${me.canonBall}`, 'Moi')
    }
    if(enemy.hearth === 0 && me.hearth === 0){
        WA.chat.sendChatMessage('Ah en voilà une bonne ! Vos deux navires sont foutus !! Tu n\'as plus qu\'à recommencer...', 'Roi des pirates')
        endGame = true
    }else if(enemy.hearth === 0 && me.hearth > 0){
        WA.chat.sendChatMessage('Bravo Matelot ! Tu as coulé le navire ennemie !!', 'Roi des pirates')
        endGame = true
        exit()
    }else if(me.hearth === 0 && enemy.hearth > 0){
        WA.chat.sendChatMessage('Mais qu\'est ce que t\'as foutu ton navire est coulé !', 'Roi des pirates')
        endGame = true
    }
}

let triggerProtect;
WA.room.onEnterLayer('protectZone').subscribe(() => {
    triggerProtect = WA.ui.displayActionMessage({
        message: endGame ? "[ESPACE] Relancer une partie" : "[ESPACE] Se protéger" ,
        callback: () => {
            if(endGame){
                resetGame()
            }else{
                displayShield('me')
                enemyAction('protect')
                if(sendChatComment) {
                    WA.chat.sendChatMessage('Je me protège', 'Moi')
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
        message: endGame ? "[ESPACE] Relancer une partie" : "[ESPACE] Attaquer !" ,
        callback: () => {
            if(endGame){
                resetGame()
            }else{
                if(me.canonBall > 0){
                    enemyAction('attack')
                    toggleLayersVisibility('bangMe', true)
                    setTimeout(()=> {
                        toggleLayersVisibility('bangMe', false)
                    }, 500)
                    if(enemy.action !== 'protect'){
                        enemy.hearth --
                        removeHearth(enemy.hearthPosition[enemy.hearth +1], 'enemy')
                    }
                    me.canonBall --
                    removeCanonBall(me.canonBallPosition[me.canonBall +1], 'me')
                    if(sendChatComment) {
                        WA.chat.sendChatMessage('J\'attaque', 'Moi')
                    }
                    displayData()
                }else{
                    WA.chat.sendChatMessage('je n`\'ai plus de munitions !', 'Moi')
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
        message: endGame ? "[ESPACE] Relancer une partie" : "[ESPACE] Recharger" ,
        callback: () => {
            if(endGame){
                resetGame()
            }else{
                if(me.canonBall !== 3){
                    enemyAction('reload')
                    me.canonBall ++
                    addCanonBall(me.canonBallPosition[me.canonBall], 'me')
                    if(sendChatComment) {
                        WA.chat.sendChatMessage('Je recharge', 'Moi')
                    }
                    displayData()
                }else{
                    WA.chat.sendChatMessage('j\'ai déjà mon maximum de munition !', 'Moi')
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
        message: "[ESPACE] Voir les règles" ,
        callback: () => {
            monologue(attackTestRules, attackTestRuleName)
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

