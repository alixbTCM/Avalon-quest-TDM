import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import {getSentenceWithVariables, monologue} from "./utils.js";
import {dialogUtils} from "./constants/maps-dialogs.js";
import { myselfName, fisherKing } from "./constants/character-names.js"
import { escapeMapeGameRules } from "./constants/maps-game-rules.js"

monologue(escapeMapeGameRules, fisherKing)

const searchZones = {
    "SearchingZones1": {
        "bed1": {
            found: "J'ai trouvé {found} sous le matelas",
            nothing: "Il n'y a rien ici... à part des puces de lit.",
            hasBeenSearched: false
        },
        "bed2": {
            found: "J'ai trouvé {found} sous le matelas",
            nothing: "Ce n'est pas le moment de dormir !",
            hasBeenSearched: false
        },
        "cadre": {
            found: "J'ai trouvé {found} derrière le cadre",
            nothing: "Quelle belle peinture ! L'artiste était très habile... Ceci dit, ça ne m'avance pas à grand chose",
            hasBeenSearched: false
        },
        "hallwayFurniture": {
            found: "J'ai trouvé {found} à l'intérieur de ce meuble",
            nothing: "Ce meuble est vide...",
            hasBeenSearched: false
        },
        "desk1": {
            found: "Il y avait {found} à l'intérieur du bureau",
            nothing: "Que des lettres d'amour à une certaine Élise...",
            hasBeenSearched: false
        },
        "desk2": {
            found: "Il y avait {found} à l'intérieur du bureau",
            nothing: "Rien du tout...",
            hasBeenSearched: false
        }
    },
    "SearchingZones2": {
        "fireplace": {
            found: "J'ai trouvé {found} dans l'âtre de la cheminée",
            nothing: "Juste des cendres...",
            hasBeenSearched: false
        },
        "pot": {
            found: "J'ai trouvé {found} à l'intérieur de ce pot",
            nothing: "Ce pot est vide... J'ai découvert le pot aux roses ! BA DUM TSS",
            hasBeenSearched: false
        },
        "armure3": {
            found: "J'ai trouvé {found} dans la visière",
            nothing: "Cette armure est sinistre",
            hasBeenSearched: false
        },
        "armure2": {
            found: "J'ai trouvé {found} dans la visière",
            nothing: "Cette armure est sinistre",
            hasBeenSearched: false
        },
        "armure1": {
            found: "J'ai trouvé {found} dans la visière",
            nothing: "Cette armure est sinistre",
            hasBeenSearched: false
        },
        "cadre": {
            found: "J'ai trouvé {found} derrière la peinture",
            nothing: "Quelle belle oeuvre",
            hasBeenSearched: false
        },
        "plant2": {
            found: "J'ai trouvé {found} dans le pot de cette plante",
            nothing: "Qui peut-bien arroser les plante dans ce château abandonné ?",
            hasBeenSearched: false
        },
        "plant": {
            found: "J'ai trouvé {found} dans le pot de cette plante",
            nothing: "Qui peut-bien arroser les plante dans ce château abandonné ?",
            hasBeenSearched: false
        },
        "kitchenFurniture": {
            found: "J'ai trouvé {found} à l'intérieur de ce meuble",
            nothing: "Quel bazard ici",
            hasBeenSearched: false
        },
        "bottles": {
            found: "J'ai trouvé {found} au milieu des bouteilles",
            nothing: "Au moins, si je suis coincé(e) ici longtemps, j'aurais de quoi étancher ma soif...",
            hasBeenSearched: false
        },
        "fridge": {
            found: "J'ai trouvé {found} dans le frigidaire",
            nothing: "Ce n'est pas le moment idéal pour manger.",
            hasBeenSearched: false
        },
    },
    "SearchingZones3": {
        "plant": {
            found: "J'ai trouvé {found} à l'intérieur du pot",
            nothing: "Rien ici.",
            hasBeenSearched: false
        },
        "books": {
            found: "J'ai trouvé {found} dans cette bibliothèque",
            nothing: "Ce n'est pas le moment de lire un livre !",
            hasBeenSearched: false
        },
        "bed": {
            found: "J'ai trouvé {found} sous le matelas",
            nothing: "Quel lit gigantesque !",
            hasBeenSearched: false
        },
        "globe": {
            found: "J'ai trouvé {found} à l'intérieur de ce globe terrestre",
            nothing: "Ce n'est pas le moment de réviser sa géographie !",
            hasBeenSearched: false
        },
        "desk": {
            found: "J'ai trouvé {found} dans un tiroir",
            nothing: "Rien ici.",
            hasBeenSearched: false
        }
    },
    "SearchingZones4": {
        "tenture1": {
            found: "J'ai trouvé {found} derrière cette tenture",
            nothing: "Il n'y a rien ici",
            hasBeenSearched: false
        },
        "tenture2": {
            found: "J'ai trouvé {found} derrière cette tenture",
            nothing: "Il n'y a rien ici",
            hasBeenSearched: false
        },
    }
}

const objectsToFind = [
    {
        "kitchenKey": {name: "la clé de la cuisine", found: false},
        "firstCodeNumber": {name: "le chiffre 0 (zéro) gravé", found: false}
    },
    {
        "bedroomKey": {name: "la clé de la chambre", found: false},
        "secondCodeNumber": {name: "le chiffre 2(deux) gravé", found: false}
    },
    {
        "paintingKey": {name: "une étrange petite clé", found: false},
        "thirdCodeNumber": {name: "le chiffre 0(zéro) gravé", found: false}
    },
    {
        "fourthCodeNumber": {name: "le chiffre 3(trois) gravé", found: false}
    }
]

const searchZonesKeys = Object.keys(searchZones)
for (let i = 0; i<searchZonesKeys.length; i++) {
    const zoneKeys = Object.keys(searchZones[searchZonesKeys[i]])
    const objectKeys = Object.keys(objectsToFind[i])
    const numberOfObjectsToFind = objectKeys.length
    const zonesIndexes = [...zoneKeys]
    const randoms = []

    for (let j = 0; j<numberOfObjectsToFind; j++) {
        const r = Math.floor(Math.random() * zonesIndexes.length)
        randoms.push(zonesIndexes[r])
        zonesIndexes.splice(r, 1)
    }
    
    for (let j = 0; j<zoneKeys.length; j++) {
        let layerTrigger
         WA.room.onEnterLayer(`${searchZonesKeys[i]}/${zoneKeys[j]}`).subscribe(() => {
             if (!searchZones[searchZonesKeys[i]][zoneKeys[j]].hasBeenSearched) {
                 layerTrigger = WA.ui.displayActionMessage({
                     message: getSentenceWithVariables(dialogUtils.executeAction, {
                         action: "Examiner"
                     }),
                     callback: () => {
                         if (randoms.indexOf(zoneKeys[j]) !== -1) {
                             WA.chat.sendChatMessage(getSentenceWithVariables(searchZones[searchZonesKeys[i]][zoneKeys[j]].found, {
                                 found: objectsToFind[i][objectKeys[randoms.indexOf(zoneKeys[j])]].name
                             }), myselfName)
                             objectsToFind[i][objectKeys[randoms.indexOf(zoneKeys[j])]].found = true
                         } else {
                             WA.chat.sendChatMessage(searchZones[searchZonesKeys[i]][zoneKeys[j]].nothing, myselfName)
                         }
                         searchZones[searchZonesKeys[i]][zoneKeys[j]].hasBeenSearched = true
                     }
                 })
             }
        })

        WA.room.onLeaveLayer(`${searchZonesKeys[i]}/${zoneKeys[j]}`).subscribe(() => {
            layerTrigger.remove()
        })
    }
}

const openZones = {
    "kitchenKey": {
        isUnlocked: false,
        layer: "OpenZones/openKitchen",
        action: "Déverrouiller",
        lockedSentence: "Il me faudrait une clé pour ouvrir cette porte",
        unlockedSentence: "La porte est ouverte",
        tiles: [
            {
                x: 17,
                y: 9,
                layer: 'doors',
                tile: null
            },
            {
                x: 17,
                y: 8,
                layer: 'doorsUp',
                tile: null
            },
        ]
    },
    "bedroomKey": {
        isUnlocked: false,
        layer: "OpenZones/openBedroom",
        action: "Déverrouiller",
        lockedSentence: "Il me faudrait une clé pour ouvrir cette porte",
        unlockedSentence: "La porte est ouverte",
        tiles: [
            {
                x: 27,
                y: 11,
                layer: 'doors',
                tile: null
            },
            {
                x: 28,
                y: 11,
                layer: 'doors',
                tile: null
            },
            {
                x: 27,
                y: 10,
                layer: 'doorsUp',
                tile: null
            },
            {
                x: 28,
                y: 10,
                layer: 'doorsUp',
                tile: null
            },
        ]
    },
    "paintingKey": {
        isUnlocked: false,
        layer: "OpenZones/openSecretPassage",
        action: "Examiner",
        lockedSentence: "On dirait qu'il y a un méchanisme pour déplacer cette peinture... Il me faudrait une petite clé pour le déclencher.",
        unlockedSentence: "Le cadre s'est déplacé !",
        tiles: [
            {
                x: 34,
                y: 10,
                layer: 'doors',
                tile: null
            },
            {
                x: 35,
                y: 10,
                layer: 'doors',
                tile: null
            },
            {
                x: 36,
                y: 10,
                layer: 'doors',
                tile: 'paintingUpLeftCorner'
            },
            {
                x: 37,
                y: 10,
                layer: 'doors',
                tile: 'paintingUpMiddle'
            },
            {
                x: 38,
                y: 10,
                layer: 'doors',
                tile: 'paintingUpRightCorner'
            },
            {
                x: 34,
                y: 11,
                layer: 'doors',
                tile: null
            },
            {
                x: 35,
                y: 11,
                layer: 'doors',
                tile: null
            },
            {
                x: 36,
                y: 11,
                layer: 'doors',
                tile: 'paintingDownLeftCorner'
            },
            {
                x: 37,
                y: 11,
                layer: 'doors',
                tile: 'paintingDownMiddle'
            },
            {
                x: 38,
                y: 11,
                layer: 'doors',
                tile: 'paintingDownRightCorner'
            },
        ]
    }
}
const openZonesKeys = Object.keys(openZones)

for (let i = 0; i<openZonesKeys.length; i++) {
    let layerTrigger
    WA.room.onEnterLayer(openZones[openZonesKeys[i]].layer).subscribe(() => {
        if (!openZones[openZonesKeys[i]].isUnlocked) {
            layerTrigger = WA.ui.displayActionMessage({
                message: getSentenceWithVariables(dialogUtils.executeAction, {
                    action: openZones[openZonesKeys[i]].action
                }),
                callback: () => {
                    for (let j = 0; j < objectsToFind.length; j++) {
                        if (objectsToFind[j][openZonesKeys[i]]) {
                            if (objectsToFind[j][openZonesKeys[i]].found) {
                                openZones[openZonesKeys[i]].isUnlocked = true
                                WA.chat.sendChatMessage(openZones[openZonesKeys[i]].unlockedSentence, myselfName)
                                WA.room.setTiles(openZones[openZonesKeys[i]].tiles)
                            } else {
                                WA.chat.sendChatMessage(openZones[openZonesKeys[i]].lockedSentence, myselfName)
                            }
                        }
                    }
                }
            })
        }
    })

    WA.room.onLeaveLayer(openZones[openZonesKeys[i]].layer).subscribe(() => {
        layerTrigger.remove()
    })
}

var mySound = WA.sound.loadSound("../sounds/chill.mp3");
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