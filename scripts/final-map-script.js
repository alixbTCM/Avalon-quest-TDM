import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import * as utils from './utils/index.js'

WA.onInit().then(() => {
    // Initiate chat
    utils.chat.initChat()

    let actionMessage
    let currentPopup
    WA.room.onEnterLayer('getSwordZone').subscribe(() => {
        actionMessage = WA.ui.displayActionMessage({
            message: utils.translations.translate('utils.executeAction', {
                action: utils.translations.translate('finalMap.getSword')
            }),
            callback: () => {
                currentPopup = WA.ui.openPopup('finalPopup', utils.translations.translate('finalMap.finalPopup', {
                    name: WA.player.name
                }), [{
                    label: utils.translations.translate("finalMap.ok"),
                    callback: (popup) => {
                        popup.close();
                    }
                },
                    {
                        label: utils.translations.translate('finalMap.goHome'),
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
        volume: 0.2,
        loop: true,
        rate: 1,
        detune: 1,
        delay: 0,
        seek: 0,
        mute: false
    }
    mySound.play(soundConfig);
})