import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import * as utils from './utils/index.js'
import { principalMapLayers } from './constants/maps-layers.js'
import { principalMapAnimationLayers } from './constants/maps-animation-layers.js'
import { principalMapChatCommands } from './constants/chat-commands.js'

// TODO : Use chat utils for messages to all players
WA.onInit().then(() => {
    // Initiate chat
    utils.chat.initChat()

    // Old man
    let oldManCounter = 0
    let triggerOldManMessage;
    const firstTalkMonologue = ['principalMap.oldMan.firstTalk.force_balance', 'principalMap.oldMan.firstTalk.mistake', 'principalMap.oldMan.firstTalk.cough', 'principalMap.oldMan.firstTalk.hello', 'principalMap.oldMan.firstTalk.oldStory', 'principalMap.oldMan.firstTalk.fearOfSharks', 'principalMap.oldMan.firstTalk.goodLuck']
    const statueAdmirations = ['principalMap.oldMan.admirations.beautifulStatue', 'principalMap.oldMan.admirations.expresionism', 'principalMap.oldMan.admirations.capitalism', 'principalMap.oldMan.admirations.remindMeSomething']
    WA.room.onEnterLayer('OldManZone').subscribe(() => {
        triggerOldManMessage = WA.ui.displayActionMessage({
            message: WA.state['showOldMan'] ? utils.translations.translate('utils.executeAction', {
                action: utils.translations.translate('principalMap.oldMan.actions.ghost')
            }) : utils.translations.translate('utils.executeAction', {
                action: utils.translations.translate('principalMap.oldMan.actions.stone')
            }),
            callback: () => {
                if (WA.state['showOldMan'] ) {
                    oldManCounter++
                    if (oldManCounter === 1) {
                        utils.chat.monologue(firstTalkMonologue, utils.translations.translate('characterNames.oldManName'))
                        WA.room.setTiles([{x: 27, y: 22, tile: null, layer: 'BlockingSharks'}])
                    } else {
                        WA.chat.sendChatMessage(
                            utils.translations.translate(
                                'principalMap.oldMan.secondTalk',
                                {name: WA.player.name}
                            ),
                            utils.translations.translate('characterNames.oldManName')
                        )
                    }
                }
                else {
                    WA.chat.sendChatMessage(utils.translations.translate(utils.main.selectRandomItemInArray(statueAdmirations)), utils.translations.translate('characterNames.myselfName'))
                }
            }
        });
    })

    WA.room.onLeaveLayer('OldManZone').subscribe(() => {
        triggerOldManMessage.remove()
    })

    WA.state.onVariableChange('showOldMan').subscribe((value) => {
        if (value) {
            utils.layers.toggleLayersVisibility("OldManStone", false)
            WA.chat.sendChatMessage(utils.translations.translate('principalMap.oldMan.appearing'), utils.translations.translate('characterNames.ladyOfTheLakeName'));

            utils.layers.triggerAnimationWithLayers(principalMapAnimationLayers.pouf)
        }
    })


    // Canons
    let triggerCanonAction
    WA.room.onEnterLayer('Canon1Zone').subscribe(() => {
        triggerCanonAction = WA.ui.displayActionMessage({
            message: utils.translations.translate('utils.executeAction', {
                action: utils.translations.translate('utils.shoot')
            }),
            callback: () => {
                WA.state['shootingCanon1'] = true

                setTimeout(() => {
                    WA.state['shootingCanon1'] = false
                }, 300)
            }})
    })

    WA.room.onLeaveLayer('Canon1Zone').subscribe(() => {
        triggerCanonAction.remove()
    })

    WA.room.onEnterLayer('Canon2Zone').subscribe(() => {
        triggerCanonAction = WA.ui.displayActionMessage({
            message: utils.translations.translate('utils.executeAction', {
                action: utils.translations.translate('utils.shoot')
            }),
            callback: () => {
                WA.state['shootingCanon2'] = true

                setTimeout(() => {
                    WA.state['shootingCanon2'] = false
                }, 300)
            }})
    })

    WA.room.onLeaveLayer('Canon2Zone').subscribe(() => {
        triggerCanonAction.remove()
    })

    WA.state.onVariableChange('shootingCanon2').subscribe((value) => {
        if (value) {
            utils.layers.toggleLayersVisibility('Canon2Explosion')
        } else {
            utils.layers.toggleLayersVisibility('Canon2Explosion', false)
        }
    })

    WA.state.onVariableChange('shootingCanon1').subscribe((value) => {
        if (value) {
            utils.layers.toggleLayersVisibility('Canon1Explosion')
        } else {
            utils.layers.toggleLayersVisibility('Canon1Explosion', false)
        }
    })

    let LadyCounter = 0;

    // Rabbit Hole zone
    WA.room.onEnterLayer("rabbitHoleZone").subscribe(() => {
        utils.layers.toggleLayersVisibility(principalMapLayers.rabbitHoleCeilings, false)
    });

    WA.room.onLeaveLayer("rabbitHoleZone").subscribe(() => {
        utils.layers.toggleLayersVisibility(principalMapLayers.rabbitHoleCeilings)
    });

    // Cavern zone
    WA.room.onEnterLayer("cavernZone").subscribe(() => {
        utils.layers.toggleLayersVisibility(principalMapLayers.cavernCeiling, false)
    });

    WA.room.onLeaveLayer("cavernZone").subscribe(() => {
        utils.layers.toggleLayersVisibility(principalMapLayers.cavernCeiling)
    });

    // Lady of the lake
    const ladyOfTheLakeFirstTalk = ['principalMap.ladyOfTheLake.firstTalk.stop', 'principalMap.ladyOfTheLake.firstTalk.notWorthy', 'principalMap.ladyOfTheLake.firstTalk.avalonDanger']
    const ladyOfTheLakeRandomSentence = ['principalMap.ladyOfTheLake.randomSentence.youShallNotPass', 'principalMap.ladyOfTheLake.randomSentence.avalonIsTheKey', 'principalMap.ladyOfTheLake.randomSentence.talkToOldMan', 'principalMap.ladyOfTheLake.randomSentence.findAvalon']
    WA.room.onEnterLayer("ladyOfTheLakeZone").subscribe(() => {
        if (LadyCounter === 0) {
            utils.chat.monologue(ladyOfTheLakeFirstTalk, utils.translations.translate('characterNames.ladyOfTheLakeName'))
        } else {
            WA.chat.sendChatMessage(
                utils.translations.translate(
                    utils.main.selectRandomItemInArray(ladyOfTheLakeRandomSentence), {name: WA.player.name}
                ), utils.translations.translate('characterNames.ladyOfTheLakeName')
            )
        }
        utils.layers.toggleLayersVisibility(principalMapLayers.ladyOfTheLake)
        LadyCounter ++
    })

    WA.room.onLeaveLayer("ladyOfTheLakeZone").subscribe(() => {
        utils.layers.toggleLayersVisibility(principalMapLayers.ladyOfTheLake, false)
    })


    const unlockAvalon = () => {
        if (!WA.state['showOldMan']) {
            WA.state['showOldMan'] = true
        }
    }

    const printInChat = (toPrint) => {
        WA.chat.sendChatMessage(
          toPrint,
          utils.translations.translate('characterNames.omnipotentCharacter')
        )
    }


    // Commandes du chat
    const chatCommands = {
        [principalMapChatCommands.uselessCommand]: () => null,
        [principalMapChatCommands.helloWorldCommand]: () => printInChat('Hello World !'),
        [principalMapChatCommands.printCatCommand]: () => printInChat('Cat'),
        [principalMapChatCommands.printDogCommand]: () => printInChat('Dog'),
        [principalMapChatCommands.printDuckCommand]: () => printInChat('Duck'),
        [principalMapChatCommands.avalonUnlockingCommand]: () => unlockAvalon(),
        [principalMapChatCommands.basicMathCommand]: () => printInChat('2 + 2 = 4'),
        [principalMapChatCommands.meaningOflifeCommand]: () => printInChat('42'),
    }

    // Listening to chat commands
    const chatCommandsKeys = Object.keys(chatCommands)
    WA.chat.onChatMessage((message) => {
        const trimmedMessage = message.trim().toLowerCase()
        if (chatCommandsKeys.includes(trimmedMessage)) {
            const index = chatCommandsKeys[chatCommandsKeys.indexOf(trimmedMessage)]
            const functionToExecute = chatCommands[index]
            functionToExecute.call()
        }
    })

    // Panneaux
    const pannels = {
        "PannelsZones/DisplayPannelZone": {
            object: "displayPannelPopup",
            translation: {
                key: 'principalMap.pannels.chatCommands',
                variables:{ commands : '"' + chatCommandsKeys.join('", "') + '"'}
            },
        },
        "PannelsZones/ParisPannelZone": {
            object: "parisPannelPopup",
            translation: {
                key: 'principalMap.pannels.toParis',
                variables:{}
            },
        },
        "PannelsZones/AlicePannelZone": {
            object: "alicePannelPopup",
            translation: {
                key: 'principalMap.pannels.rabbitHole',
                variables:{}
            },
        },
        "PannelsZones/CavernPannelZone":  {
            object: "cavernPannelPopup",
            translation: {
                key: 'principalMap.pannels.throneRoom',
                variables:{}
            },
        },
    }

    const pannelsKeys = Object.keys(pannels)
    for (let i = 0; i < pannelsKeys.length; i++) {
        let actionMessage
        let currentPopup
        WA.room.onEnterLayer(pannelsKeys[i]).subscribe(() => {
            actionMessage = WA.ui.displayActionMessage({
                message: utils.translations.translate('utils.executeAction', {
                    action: utils.translations.translate('utils.see')
                }),
                callback: () => {
                    currentPopup = WA.ui.openPopup(pannels[pannelsKeys[i]].object, utils.translations.translate(pannels[pannelsKeys[i]].translation.key, pannels[pannelsKeys[i]].translation.variables), [{
                        label: "OK",
                        callback: (popup) => {
                            // Close the popup when the "Close" button is pressed.
                            popup.close();
                        }
                    }]);
                }
            })
        })

        WA.room.onLeaveLayer(pannelsKeys[i]).subscribe(() => {
            if (typeof actionMessage !== 'undefined') {
                actionMessage.remove()
            }

            if (typeof currentPopup !== 'undefined') {
                currentPopup.close()
            }
        })
    }

    // Sortie vers Paris
    let parisPopup
    WA.room.onEnterLayer('toParis').subscribe(() => {
        parisPopup = WA.ui.openPopup('parisPopup', utils.translations.translate('principalMap.paris.whereToGo'), [{
            label: utils.translations.translate('principalMap.paris.floor0'),
            callback: (popup) => {
                // Redirection vers Paris RDC
                WA.nav.goToRoom('/@/tcm/workadventure/floor0#start-tcm')
            }
        },
            {
                label: utils.translations.translate('principalMap.paris.floor1'),
                callback: (popup) => {
                    // Redirection vers Paris Étage 1
                    WA.nav.goToRoom('/@/tcm/workadventure/floor1#from-floor0')
                }
            },
            {
                label: utils.translations.translate('principalMap.paris.floor2'),
                callback: (popup) => {
                    // Redirection vers Paris Étage 2
                    WA.nav.goToRoom('/@/tcm/workadventure/floor2#from-floor1-east')
                }
            }
        ]);
    })

    WA.room.onLeaveLayer('toParis').subscribe(() => {
        parisPopup.remove()
    })

    /* Map music */
    var mySound = WA.sound.loadSound("../sounds/Sweet Nostalgia.mp3");
    var soundConfig = {
        volume : 0.02,
        loop : true,
        rate : 1,
        detune : 1,
        delay : 0,
        seek : 0,
        mute : false
    }
    mySound.play(soundConfig);

    WA.room.onEnterLayer('sortieAvalon').subscribe(() => {
       mySound.stop();
    })

})