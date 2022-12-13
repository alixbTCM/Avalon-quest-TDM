import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import {racingTestRuleName} from './constants/character-names.js';
import {racingTestRules} from './constants/maps-game-rules.js';
import {monologue, toggleLayersVisibility} from "./utils.js";

const timeOut = 75000;
const timeOutDate = new Date(timeOut)

WA.room.onEnterLayer('startRacing').subscribe( async()=> {
    const startTime = new Date
    WA.player.state.startTime = startTime.getTime()
})

WA.room.onEnterLayer('stopRacing').subscribe( async()=> {
    const stopTime = new Date
    WA.player.state.stopTime = stopTime.getTime()

    const msg =  new Date(WA.player.state.stopTime - WA.player.state.startTime)

    if(msg > timeOut){
        WA.chat.sendChatMessage(`Bouuuuuh t\'es nul, Try Again ! Il faut que tu fasses moins de ${timeOutDate.getMinutes()+
            "min "+timeOutDate.getSeconds()}`, "Maitre du temps")
        WA.nav.goToRoom('./ljdsqljds8KHID6rcSDKJHKHD8SDKHSD7.json');
    } else{
        WA.chat.sendChatMessage('Oooh? BRAVO ! T\'es finalement pas si nul', "Maitre du temps")
    }
    const formatMsgSec = msg.getUTCHours()+
        "h "+msg.getMinutes()+
        "min "+msg.getSeconds() +
        ","+msg.getMilliseconds()+ "s";
    WA.chat.sendChatMessage(`Tu as mis : ${formatMsgSec}`, "Maitre du temps")
})

WA.room.onEnterLayer('stop').subscribe(() => {
    WA.controls.disablePlayerControls()

    setTimeout(()=> {
        WA.controls.restorePlayerControls()

    }, 500)

});

let triggerTuto;
WA.room.onEnterLayer('tuto').subscribe(() => {
    triggerTuto = WA.ui.displayActionMessage({
        message: "[ESPACE] Voir les règles" ,
        callback: () => {
            monologue(racingTestRules, racingTestRuleName)
        }
    });
})

WA.room.onLeaveLayer('tuto').subscribe(() => {
    triggerTuto.remove()
})

let triggerFakeEntryMessage
WA.room.onEnterLayer('triggerFakeEntry').subscribe(() => {
    triggerFakeEntryMessage = WA.ui.displayActionMessage({
        message: "BOUH",
    })
    toggleLayersVisibility('fakeEntry')
})

WA.room.onLeaveLayer('triggerFakeEntry').subscribe(() => {
    triggerFakeEntryMessage.remove()
})

let endMessage
WA.room.onEnterLayer('endText').subscribe(() => {
    endMessage = WA.ui.displayActionMessage({
        message: "*Un mystérieux miroire semble vous inciter à venir le voir...*",
    })
})

WA.room.onLeaveLayer('endText').subscribe(() => {
    endMessage.remove()
})


var mySound = WA.sound.loadSound("../sounds/racing.mp3");
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
WA.room.onEnterLayer('exit').subscribe(() => {
    mySound.stop();
})



