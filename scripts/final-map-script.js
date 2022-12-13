import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import {getSentenceWithVariables} from "./utils.js";
import {finalMapDalogs, dialogUtils} from "./constants/maps-dialogs.js";

let actionMessage
let currentPopup
WA.room.onEnterLayer('getSwordZone').subscribe(() => {
    actionMessage = WA.ui.displayActionMessage({
        message: getSentenceWithVariables(dialogUtils.executeAction, {
            action: "Retirer l'épée"
        }),
        callback: () => {
            currentPopup = WA.ui.openPopup('finalPopup', getSentenceWithVariables(finalMapDalogs.finalPopup, {
                name: WA.player.name
            }), [{
                label: "OK",
                callback: (popup) => {
                    popup.close();
                }
            },
            {
                label: "Rentrer à la maison",
                callback: (popup) => {
                    WA.nav.goToRoom('./map.json')
                    popup.close();
                    mySound.stop()
                }
            }]);
        }
    })
})

WA.room.onLeaveLayer('getSwordZone').subscribe(() => {
    actionMessage.remove()
    currentPopup.close()
})

var mySound = WA.sound.loadSound("../sounds/final.mp3");
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