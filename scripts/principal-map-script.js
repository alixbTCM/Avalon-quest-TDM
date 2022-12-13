import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import {
    toggleLayersVisibility,
    triggerAnimationWithLayers,
    getSentenceWithVariables,
    monologue,
    selectRandomItemInArray
} from './utils.js'
import { principalMapLayers } from './constants/maps-layers.js'
import {principalMapDialogs, dialogUtils, finalMapDalogs} from './constants/maps-dialogs.js'
import { oldManName, ladyOfTheLakeName, myselfName, omnipotentCharacter} from './constants/character-names.js';
import { principalMapAnimationLayers } from './constants/maps-animation-layers.js'
import { principalMapChatCommands } from './constants/chat-commands.js'

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
        roomId = mapRooms[mapRoomsKeys[i]].id
    })

    WA.room.onLeaveLayer(mapRoomsKeys[i]).subscribe(() => {
        roomId = null
    })
}


// Send chat message to all players in map
WA.state['receiveChatMessage'] = false
const sendMessageToAllPlayers = (message, author, roomId= null) => {
    WA.state['chatMessageContent'] = message
    WA.state['chatMessageAuthor'] = author
    WA.state['chatMessageRoom'] = roomId // Receive only in a certain room
    WA.state['receiveChatMessage'] = true

    setTimeout(() => {
        WA.state['receiveChatMessage'] = false
    }, 100)
}

// Ecouter le nouveau message
WA.state.onVariableChange('receiveChatMessage').subscribe((value) => {
    if (value) {
        if (WA.state['chatMessageRoom'] === null || WA.state['chatMessageRoom'] === roomId) {
            WA.chat.sendChatMessage(WA.state['chatMessageContent'], WA.state['chatMessageAuthor'])
        }
    }
})

let randomPlayersList = []
let waitingForPloufPlouf = false
// Fonction de plouf plouf
const ploufPlouf = (dialog, roomId = null) => {
    randomPlayersList = [] // Reset players list
    waitingForPloufPlouf = true
    sendMessageToAllPlayers(principalMapDialogs.ploufPlouf[dialog].sentence, omnipotentCharacter, roomId);
    WA.state['roomId'] = roomId
    WA.state['selectRandomPlayer'] = true
    setTimeout(() => {
        randomPlayersList.push(WA.player.name)
        WA.state['roomId'] = null
        WA.state['selectRandomPlayer'] = false
        sendMessageToAllPlayers(getSentenceWithVariables(
            principalMapDialogs.ploufPlouf[dialog].selected,
            {
            name: selectRandomItemInArray(randomPlayersList)
        }), omnipotentCharacter, roomId)
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
        message: getSentenceWithVariables(dialogUtils.executeAction, {
            action: principalMapDialogs.ploufPlouf.boat.action
        }),
        callback: () => {
            ploufPlouf('boat', 'blackPearl')
        }
    })
})

WA.room.onEnterLayer('zonesPloufPlouf/ploufPloufPotato').subscribe(() => {
    triggerPotatoPloufPloufMessage = WA.ui.displayActionMessage({
        message: getSentenceWithVariables(dialogUtils.executeAction, {
            action: principalMapDialogs.ploufPlouf.potato.action
        }),
        callback: () => {
            ploufPlouf('potato','place')
        }
    })
})

WA.room.onEnterLayer('zonesPloufPlouf/ploufPloufMoney').subscribe(() => {
    triggerMoneyPloufPloufMessage = WA.ui.displayActionMessage({
        message: getSentenceWithVariables(dialogUtils.executeAction, {
            action: principalMapDialogs.ploufPlouf.money.action
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
WA.room.onEnterLayer('OldManZone').subscribe(() => {
    triggerOldManMessage = WA.ui.displayActionMessage({
        message: WA.state['showOldMan'] ? getSentenceWithVariables(dialogUtils.executeAction, {
            action: principalMapDialogs.oldMan.actions.ghost
        }) : getSentenceWithVariables(dialogUtils.executeAction, {
            action: principalMapDialogs.oldMan.actions.stone
        }),
        callback: () => {
            if (WA.state['showOldMan'] ) {
                oldManCounter++
                if (oldManCounter === 1) {
                    monologue(principalMapDialogs.oldMan.firstTalk, oldManName)
                    WA.room.setTiles([{x: 27, y: 22, tile: null, layer: 'BlockingSharks'}])
                } else {
                    WA.chat.sendChatMessage(
                        getSentenceWithVariables(
                            principalMapDialogs.oldMan.secondTalk,
                            {name: WA.player.name}
                        ),
                        oldManName
                    )
                }
            }
            else {
                WA.chat.sendChatMessage(selectRandomItemInArray(principalMapDialogs.oldMan.admirations), myselfName)
            }
        }
    });
})

WA.room.onLeaveLayer('OldManZone').subscribe(() => {
    triggerOldManMessage.remove()
})

WA.state.onVariableChange('showOldMan').subscribe((value) => {
    if (value) {
        toggleLayersVisibility("OldManStone", false)
        WA.chat.sendChatMessage(principalMapDialogs.oldMan.appearing, ladyOfTheLakeName);

        triggerAnimationWithLayers(principalMapAnimationLayers.pouf)
    }
})


// Canons
let triggerCanonAction
WA.room.onEnterLayer('Canon1Zone').subscribe(() => {
    triggerCanonAction = WA.ui.displayActionMessage({
        message: getSentenceWithVariables(dialogUtils.executeAction, {
            action: dialogUtils.shoot
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
        message: getSentenceWithVariables(dialogUtils.executeAction, {
            action: dialogUtils.shoot
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
        toggleLayersVisibility('Canon2Explosion')
    } else {
        toggleLayersVisibility('Canon2Explosion', false)
    }
})

WA.state.onVariableChange('shootingCanon1').subscribe((value) => {
    if (value) {
        toggleLayersVisibility('Canon1Explosion')
    } else {
        toggleLayersVisibility('Canon1Explosion', false)
    }
})

let LadyCounter = 0;

// Rabbit Hole zone
WA.room.onEnterLayer("rabbitHoleZone").subscribe(() => {
    toggleLayersVisibility(principalMapLayers.rabbitHoleCeilings, false)
});

WA.room.onLeaveLayer("rabbitHoleZone").subscribe(() => {
    toggleLayersVisibility(principalMapLayers.rabbitHoleCeilings)
});

// Cavern zone
WA.room.onEnterLayer("cavernZone").subscribe(() => {
    toggleLayersVisibility(principalMapLayers.cavernCeiling, false)
});

WA.room.onLeaveLayer("cavernZone").subscribe(() => {
    toggleLayersVisibility(principalMapLayers.cavernCeiling)
});

// Lady of the lake
WA.room.onEnterLayer("ladyOfTheLakeZone").subscribe(() => {
    if (LadyCounter === 0) {
        monologue(principalMapDialogs.ladyOfTheLake.firstTalk, ladyOfTheLakeName)
    } else {
        WA.chat.sendChatMessage(
            getSentenceWithVariables(
                selectRandomItemInArray(principalMapDialogs.ladyOfTheLake.randomSentence), {name: WA.player.name}
            ), ladyOfTheLakeName
        )
    }
    toggleLayersVisibility(principalMapLayers.ladyOfTheLake)
    LadyCounter ++
})

WA.room.onLeaveLayer("ladyOfTheLakeZone").subscribe(() => {
    toggleLayersVisibility(principalMapLayers.ladyOfTheLake, false)
})

let waitingForPLayersInRoom
let playersInRooms = []
const getPlayersInRooms = () => {
    if (WA.state['knowPeopleInRooms']) {
        WA.chat.sendChatMessage(principalMapDialogs.getPlayersInRooms.impossible, omnipotentCharacter)
    } else {
        WA.state['knowPeopleInRooms'] = true
        waitingForPLayersInRoom = true
        setTimeout(() => {
            console.log(roomId)
            if (roomId !== null) {
                playersInRooms[roomId] = playersInRooms[roomId] ? playersInRooms[roomId] + 1 : 1
            }
            WA.state['knowPeopleInRooms'] = false
            WA.state['addInRoom'] = ''

            for (let i = 0; i<mapRoomsKeys.length; i++) {
                const mapRoomIndex = mapRoomsKeys[i]
                const sentence = getSentenceWithVariables(principalMapDialogs.getPlayersInRooms.room, {
                    room: mapRooms[mapRoomIndex].name,
                    nombre: (playersInRooms[mapRooms[mapRoomIndex].id] ? playersInRooms[mapRooms[mapRoomIndex].id] : 0)
                })
                WA.chat.sendChatMessage(
                    sentence,
                    omnipotentCharacter
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

// Commandes du chat
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
        content: "Commandes du chat : \"" + chatCommandsKeys.join('", "') + '"'
    },
    "PannelsZones/ParisPannelZone": {
        object: "parisPannelPopup",
        content: "Vers Paris"
    },
    "PannelsZones/AlicePannelZone": {
        object: "alicePannelPopup",
        content: "Terrier du lapin"
    },
    "PannelsZones/CavernPannelZone":  {
        object: "cavernPannelPopup",
        content: "Salle du trône"
    },
}

const pannelsKeys = Object.keys(pannels)
for (let i = 0; i < pannelsKeys.length; i++) {
    let actionMessage
    let currentPopup
    WA.room.onEnterLayer(pannelsKeys[i]).subscribe(() => {
        actionMessage = WA.ui.displayActionMessage({
            message: getSentenceWithVariables(dialogUtils.executeAction, {
                action: dialogUtils.see
            }),
            callback: () => {
                currentPopup = WA.ui.openPopup(pannels[pannelsKeys[i]].object, pannels[pannelsKeys[i]].content, [{
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
    console.log('Vers paris')
    parisPopup = WA.ui.openPopup('parisPopup', 'Où souhaitez-vous vous rendre ?', [{
        label: "Rez-de-chaussée",
        callback: (popup) => {
            // Redirection vers Paris RDC
            WA.nav.goToRoom('/@/tcm/workadventure/floor0#start-tcm')
        }
    },
        {
            label: "Étage 1",
            callback: (popup) => {
                // Redirection vers Paris Étage 1
                WA.nav.goToRoom('/@/tcm/workadventure/floor1#from-floor0')
            }
        },
        {
            label: "Étage 2",
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
