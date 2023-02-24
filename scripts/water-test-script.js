import { principalMapAnimationLayers } from './constants/maps-animation-layers.js'
import { waterTestRules } from './constants/maps-game-rules.js';
import * as utils from './utils/index.js'

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

WA.room.onEnterLayer('bleedZone').subscribe(async ()=> {
    const position = await utils.layers.getPlayerPositionTileCoordinate()
    WA.controls.disablePlayerControls()
    utils.layers.replaceTileAnimation(position.x, position.y, principalMapAnimationLayers.bleed, "bleed")
    setTimeout(() => {
        WA.controls.restorePlayerControls()
    }, 300)
})


WA.room.onEnterLayer('goodZone1').subscribe(async ()=> {
    const position = await utils.layers.getPlayerPositionTileCoordinate()
    utils.layers.replaceTileAnimation(position.x, position.y, principalMapAnimationLayers.good, "good")
})

WA.room.onEnterLayer('goodZone2').subscribe( async( )=> {
    const position = await utils.layers.getPlayerPositionTileCoordinate()
    utils.layers.replaceTileAnimation(position.x, position.y, principalMapAnimationLayers.good, "good")
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

