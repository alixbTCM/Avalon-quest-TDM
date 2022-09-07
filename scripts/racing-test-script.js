import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import {racingTestRuleName} from './constants/character-names.js';
import {racingTestRules} from './constants/maps-game-rules.js';
import {monologue, toggleLayersVisibility} from "./utils.js";


WA.room.onEnterLayer('startRacing').subscribe( async()=> {
    const startTime = new Date
    WA.player.state.startTime = startTime.getTime()
})

WA.room.onEnterLayer('stopRacing').subscribe( async()=> {
    const stopTime = new Date
    WA.player.state.stopTime = stopTime.getTime()

    const msg =  new Date(WA.player.state.stopTime - WA.player.state.startTime)

    if(msg > 90000){
        WA.chat.sendChatMessage('Bouuuuuh t\'es nul, Try Again !', "Maitre du temps")
        WA.nav.goToRoom('./racing-test.json');
    } else{
        WA.chat.sendChatMessage('Oooh? BRAVO ! T\'es finalement pas si nul', "Maitre du temps")
    }
    const formatMsgSec = msg.getUTCHours()+
        "h "+msg.getMinutes()+
        "min "+msg.getSeconds() +
        ","+msg.getMilliseconds()+ "s";
    WA.chat.sendChatMessage(`${formatMsgSec}`, "Maitre du temps")
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
    endMessage = WA.ui.displayActionMessage({
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






