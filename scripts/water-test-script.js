import { principalMapAnimationLayers } from './constants/maps-animation-layers.js'
import { waterTestRuleName } from './constants/character-names.js';
import { waterTestRules } from './constants/maps-game-rules.js';
import * as utils from './utils/index.js'

const getTileCoordinate = (playerPosition)=> {
    return {
        x: Math.floor(playerPosition.x/32),
        y: Math.floor(playerPosition.y/32),
    }
}
let triggerTuto;
WA.room.onEnterLayer('tuto').subscribe(() => {
    triggerTuto = WA.ui.displayActionMessage({
        message: utils.translations.translate('utils.executeAction', {
            action: utils.translations.translate('utils.seeTheRules')
        }),
        callback: () => {
            utils.chat.monologue(waterTestRules, utils.translations.translate('characterNames.waterTestRuleName'))
        }
    });
})

WA.room.onLeaveLayer('tuto').subscribe(() => {
    triggerTuto.remove()
})

WA.room.onEnterLayer('bleedZone').subscribe( async()=> {
    const position = getTileCoordinate(await WA.player.getPosition())
    WA.controls.disablePlayerControls()
    setTimeout(()=> {
        WA.room.setTiles([
            {
                x: position.x,
                y: position.y,
                tile: principalMapAnimationLayers.bleed[0],
                layer: "bleed"
            },
        ]);
        WA.controls.restorePlayerControls()
        setTimeout(()=> {
            WA.room.setTiles([
                {
                    x: position.x,
                    y: position.y,
                    tile: principalMapAnimationLayers.bleed[1],
                    layer: "bleed"
                },
            ]);
            setTimeout(()=> {
                WA.room.setTiles([
                    {
                        x: position.x,
                        y: position.y,
                        tile: principalMapAnimationLayers.bleed[2],
                        layer: "bleed"
                    },
                ]);
                setTimeout(()=> {
                    WA.room.setTiles([
                        {
                            x: position.x,
                            y: position.y,
                            tile: principalMapAnimationLayers.bleed[3],
                            layer: "bleed"
                        },
                    ]);
                }, 300)
            }, 300)
        }, 300)
    }, 300)

})


WA.room.onEnterLayer('goodZone1').subscribe( async()=> {
    const position = getTileCoordinate(await WA.player.getPosition())
    setTimeout(()=> {
        WA.room.setTiles([
            {
                x: position.x,
                y: position.y,
                tile: principalMapAnimationLayers.good[0],
                layer: "good"
            },
        ]);
        setTimeout(()=> {
            WA.room.setTiles([
                {
                    x: position.x,
                    y: position.y,
                    tile: principalMapAnimationLayers.good[1],
                    layer: "good"
                },
            ]);
        }, 300)
    }, 300)

})

WA.room.onEnterLayer('goodZone2').subscribe( async()=> {
    const position = getTileCoordinate(await WA.player.getPosition())
    setTimeout(()=> {
        WA.room.setTiles([
            {
                x: position.x,
                y: position.y,
                tile: "good1",
                layer: "good"
            },
        ]);
        setTimeout(()=> {
            WA.room.setTiles([
                {
                    x: position.x,
                    y: position.y,
                    tile: "good2",
                    layer: "good"
                },
            ]);
        }, 300)
    }, 300)

})

let endMessage
WA.room.onEnterLayer('exitText').subscribe(() => {
    endMessage = WA.ui.displayActionMessage({
        message: utils.translations.translate('waterTest.exitSentence'),
    })
})

WA.room.onLeaveLayer('exitText').subscribe(() => {
    endMessage.remove()
})


var mySound = WA.sound.loadSound("../sounds/water.mp3");
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

WA.room.onEnterLayer('exitToRacing').subscribe(() => {
    mySound.stop();
})

