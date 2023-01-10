import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import * as utils from './utils/index.js'
import { principalMapLayers } from './constants/maps-layers.js'
import { principalMapAnimationLayers } from './constants/maps-animation-layers.js'
import { principalMapChatCommands } from './constants/chat-commands.js'

// TODO : Use chat utils for messages to all players
WA.onInit().then(() => {
    // Initiate chat
    utils.chat.initChat()

    // Set map rooms ids
    const mapRooms = {
        "caverne": {
            name: "Caverne",
            id: "cavern"
        },
        "terrier-du-lapin": {
            name: "Terrier",
            id: "rabbitHole"
        },
        "champ": {
            name: "Champs",
            id: "field"
        },
        "place": {
            name: "Place",
            id: "place"
        },
        "quais": {
            name: "Docks",
            id:"docks",
        },
        "black-pearl": {
            name: "Black Pearl",
            id: "blackPearl"
        }
    }

    // Set current room id for players
    const mapRoomsKeys = Object.keys(mapRooms)
    let roomId = null
    for (let i = 0; i < mapRoomsKeys.length; i++) {
        WA.room.onEnterLayer(mapRoomsKeys[i]).subscribe(() => {
            utils.chat.setPlayerChatRoomId(mapRooms[mapRoomsKeys[i]].id)
            roomId = mapRooms[mapRoomsKeys[i]].id
        })

        WA.room.onLeaveLayer(mapRoomsKeys[i]).subscribe(() => {
            utils.chat.setPlayerChatRoomId(null)
            roomId = null
        })
    }

    let randomPlayersList = []
    let waitingForPloufPlouf = false
    // Fonction de plouf plouf
    const ploufPlouf = (dialog, roomId = null) => {
        randomPlayersList = [] // Reset players list
        waitingForPloufPlouf = true
        utils.chat.sendMessageToAllPlayers(
            utils.translations.translate(`principalMap.ploufPlouf.${dialog}.sentence`),
            utils.translations.translate('characterNames.omnipotentCharacter'),
            roomId
        )
        WA.state['roomId'] = roomId
        WA.state['selectRandomPlayer'] = true
        setTimeout(() => {
            randomPlayersList.push(WA.player.name)
            WA.state['roomId'] = null
            WA.state['selectRandomPlayer'] = false
            utils.chat.sendMessageToAllPlayers(
                utils.translations.translate(
                    `principalMap.ploufPlouf.${dialog}.selected`,
                    {name: utils.main.selectRandomItemInArray(randomPlayersList)}
                ),
                utils.translations.translate('characterNames.omnipotentCharacter'),
                roomId
            )
            WA.state['addNameToRandomPlayerList'] = ''
            waitingForPloufPlouf = false
            randomPlayersList = []
        }, 3000)
    }


    // Ecouter le plouf plouf
    WA.state.onVariableChange('selectRandomPlayer').subscribe((value) => {
        if (value && !waitingForPloufPlouf) {
            if (WA.state['roomId'] === null || WA.state['roomId'] === roomId) {
                WA.state['addNameToRandomPlayerList'] = WA.player.name
            }
        }
    })

    // Ajouter des joueurs à la variable locale randomPlayersList
    WA.state.onVariableChange('addNameToRandomPlayerList').subscribe((value) => {
        if (waitingForPloufPlouf && value !== '') {
            randomPlayersList.push(value)
        }
    })

    let triggerBoatPloufPloufMessage
    let triggerPotatoPloufPloufMessage
    let triggerMoneyPloufPloufMessage
    WA.room.onEnterLayer('zonesPloufPlouf/ploufPloufBoat').subscribe(() => {
        triggerBoatPloufPloufMessage = WA.ui.displayActionMessage({
            message: utils.translations.translate('utils.executeAction', {
                action: utils.translations.translate('principalMap.ploufPlouf.boat.action')
            }),
            callback: () => {
                ploufPlouf('boat', 'blackPearl')
            }
        })
    })

    WA.room.onEnterLayer('zonesPloufPlouf/ploufPloufPotato').subscribe(() => {
        triggerPotatoPloufPloufMessage = WA.ui.displayActionMessage({
            message: utils.translations.translate('utils.executeAction', {
                action: utils.translations.translate('principalMap.ploufPlouf.potato.action')
            }),
            callback: () => {
                ploufPlouf('potato','place')
            }
        })
    })

    WA.room.onEnterLayer('zonesPloufPlouf/ploufPloufMoney').subscribe(() => {
        triggerMoneyPloufPloufMessage = WA.ui.displayActionMessage({
            message: utils.translations.translate('utils.executeAction', {
                action: utils.translations.translate('principalMap.ploufPlouf.money.action')
            }),
            callback: () => {
                ploufPlouf('money', 'docks')
            }
        })
    })

    WA.room.onLeaveLayer('zonesPloufPlouf/ploufPloufBoat').subscribe(() => {
        triggerBoatPloufPloufMessage.remove()
    })

    WA.room.onLeaveLayer('zonesPloufPlouf/ploufPloufMoney').subscribe(() => {
        triggerMoneyPloufPloufMessage.remove()
    })

    WA.room.onLeaveLayer('zonesPloufPlouf/ploufPloufPotato').subscribe(() => {
        triggerPotatoPloufPloufMessage.remove()
    })


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

    let waitingForPLayersInRoom
    let playersInRooms = []
    const getPlayersInRooms = () => {
        if (WA.state['knowPeopleInRooms']) {
            WA.chat.sendChatMessage(utils.translations.translate('principalMap.getPlayersInRooms.impossible'), utils.translations.translate('characterNames.omnipotentCharacter'))
        } else {
            WA.state['knowPeopleInRooms'] = true
            waitingForPLayersInRoom = true
            setTimeout(() => {
                if (roomId !== null) {
                    playersInRooms[roomId] = playersInRooms[roomId] ? playersInRooms[roomId] + 1 : 1
                }
                WA.state['knowPeopleInRooms'] = false
                WA.state['addInRoom'] = ''

                for (let i = 0; i<mapRoomsKeys.length; i++) {
                    const mapRoomIndex = mapRoomsKeys[i]
                    const sentence = utils.translations.translate('principalMap.getPlayersInRooms.room', {
                        room: utils.translations.translate(`principalMap.roomNames.${mapRooms[mapRoomIndex].id}`),
                        number: (playersInRooms[mapRooms[mapRoomIndex].id] ? playersInRooms[mapRooms[mapRoomIndex].id] : 0)
                    })
                    WA.chat.sendChatMessage(
                        sentence,
                        utils.translations.translate('characterNames.omnipotentCharacter')
                    )
                }

                waitingForPLayersInRoom = false
                playersInRooms = []
            }, 3000)
        }
    }

    // Ecouter le get players in rooms
    WA.state.onVariableChange('knowPeopleInRooms').subscribe((value) => {
        if (value && !waitingForPLayersInRoom) {
            if (roomId !== null) {
                WA.state['addInRoom'] = roomId
            }
        }
    })

    // Ajouter des players dans playersInRooms
    WA.state.onVariableChange('addInRoom').subscribe((value) => {
        if (waitingForPLayersInRoom) {
            playersInRooms[value] = playersInRooms[value] ? playersInRooms[value] + 1 : 1
        }
    })


    const unlockAvalon = () => {
        if (!WA.state['showOldMan']) {
            WA.state['showOldMan'] = true
        }
    }

    // Commandes du chat // TODO : optimize
    const chatCommands = {
        [principalMapChatCommands.randomPlayerInMapCommand]: () => ploufPlouf('global'),
        [principalMapChatCommands.playersInRoomsCommand]: () => getPlayersInRooms(),
        [principalMapChatCommands.avalonUnlockingCommand]: () => unlockAvalon(),
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