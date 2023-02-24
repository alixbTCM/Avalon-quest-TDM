import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import { escapeMapeGameRules } from "./constants/maps-game-rules.js"
import * as utils from './utils/index.js'

WA.onInit().then(() => {
    // Initiate chat
    utils.chat.initChat()

    utils.chat.monologue(escapeMapeGameRules, utils.translations.translate('characterNames.fisherKing'))

    const searchZones = {
        "SearchingZones1": {
            "bed1": {
                found: "escape.searchZones.searchingZone1.bed1.found",
                nothing: "escape.searchZones.searchingZone1.bed2.nothing",
                hasBeenSearched: false
            },
            "bed2": {
                found: "escape.searchZones.searchingZone1.bed2.found",
                nothing: "escape.searchZones.searchingZone1.bed2.nothing",
                hasBeenSearched: false
            },
            "cadre": {
                found: "escape.searchZones.searchingZone1.cadre.found",
                nothing: "escape.searchZones.searchingZone1.cadre.nothing",
                hasBeenSearched: false
            },
            "hallwayFurniture": {
                found: "escape.searchZones.searchingZone1.hallwayFurniture.found",
                nothing: "escape.searchZones.searchingZone1.hallwayFurniture.nothing",
                hasBeenSearched: false
            },
            "desk1": {
                found: "escape.searchZones.searchingZone1.desk1.found",
                nothing: "escape.searchZones.searchingZone1.desk1.nothing",
                hasBeenSearched: false
            },
            "desk2": {
                found: "escape.searchZones.searchingZone1.desk2.found",
                nothing: "escape.searchZones.searchingZone1.desk2.nothing",
                hasBeenSearched: false
            }
        },
        "SearchingZones2": {
            "fireplace": {
                found: "escape.searchZones.SearchingZones2.fireplace.found",
                nothing: "escape.searchZones.SearchingZones2.fireplace.nothing",
                hasBeenSearched: false
            },
            "pot": {
                found: "escape.searchZones.SearchingZones2.pot.found",
                nothing: "escape.searchZones.SearchingZones2.pot.nothing",
                hasBeenSearched: false
            },
            "armure3": {
                found: "escape.searchZones.SearchingZones2.armure3.found",
                nothing: "escape.searchZones.SearchingZones2.armure3.nothing",
                hasBeenSearched: false
            },
            "armure2": {
                found: "escape.searchZones.SearchingZones2.armure2.found",
                nothing: "escape.searchZones.SearchingZones2.armure2.nothing",
                hasBeenSearched: false
            },
            "armure1": {
                found: "escape.searchZones.SearchingZones2.armure1.found",
                nothing: "escape.searchZones.SearchingZones2.armure1.nothing",
                hasBeenSearched: false
            },
            "cadre": {
                found: "escape.searchZones.SearchingZones2.cadre.found",
                nothing: "escape.searchZones.SearchingZones2.cadre.nothing",
                hasBeenSearched: false
            },
            "plant2": {
                found: "escape.searchZones.SearchingZones2.plant2.found",
                nothing: "escape.searchZones.SearchingZones2.plant2.nothing",
                hasBeenSearched: false
            },
            "plant": {
                found: "escape.searchZones.SearchingZones2.plant.found",
                nothing: "escape.searchZones.SearchingZones2.plant.nothing",
                hasBeenSearched: false
            },
            "kitchenFurniture": {
                found: "escape.searchZones.SearchingZones2.kitchenFurniture.found",
                nothing: "escape.searchZones.SearchingZones2.kitchenFurniture.nothing",
                hasBeenSearched: false
            },
            "bottles": {
                found: "escape.searchZones.SearchingZones2.bottles.found",
                nothing: "escape.searchZones.SearchingZones2.bottles.nothing",
                hasBeenSearched: false
            },
            "fridge": {
                found: "escape.searchZones.SearchingZones2.fridge.found",
                nothing: "escape.searchZones.SearchingZones2.fridge.nothing",
                hasBeenSearched: false
            },
        },
        "SearchingZones3": {
            "plant": {
                found: "escape.searchZones.SearchingZones3.plant.found",
                nothing: "escape.searchZones.SearchingZones3.plant.nothing",
                hasBeenSearched: false
            },
            "books": {
                found: "escape.searchZones.SearchingZones3.books.found",
                nothing: "escape.searchZones.SearchingZones3.books.nothing",
                hasBeenSearched: false
            },
            "bed": {
                found: "escape.searchZones.SearchingZones3.bed.found",
                nothing: "escape.searchZones.SearchingZones3.bed.nothing",
                hasBeenSearched: false
            },
            "globe": {
                found: "escape.searchZones.SearchingZones3.globe.found",
                nothing: "escape.searchZones.SearchingZones3.globe.nothing",
                hasBeenSearched: false
            },
            "desk": {
                found: "escape.searchZones.SearchingZones3.desk.found",
                nothing: "escape.searchZones.SearchingZones3.desk.nothing",
                hasBeenSearched: false
            }
        },
        "SearchingZones4": {
            "tenture1": {
                found: "escape.searchZones.SearchingZones4.tenture1.found",
                nothing: "escape.searchZones.SearchingZones4.tenture1.nothing",
                hasBeenSearched: false
            },
            "tenture2": {
                found: "escape.searchZones.SearchingZones4.tenture2.found",
                nothing: "escape.searchZones.SearchingZones4.tenture2.nothing",
                hasBeenSearched: false
            },
        }
    }

    const objectsToFind = [
        {
            "kitchenKey": {name: "escape.objectsToFind.kitchenKey", found: false},
            "firstCodeNumber": {name: "escape.objectsToFind.firstCodeNumber", found: false}
        },
        {
            "bedroomKey": {name: "escape.objectsToFind.bedroomKey", found: false},
            "secondCodeNumber": {name: "escape.objectsToFind.secondCodeNumber", found: false}
        },
        {
            "paintingKey": {name: "escape.objectsToFind.paintingKey", found: false},
            "thirdCodeNumber": {name: "escape.objectsToFind.thirdCodeNumber", found: false}
        },
        {
            "fourthCodeNumber": {name: "escape.objectsToFind.fourthCodeNumber", found: false}
        }
    ]

    const searchZonesKeys = Object.keys(searchZones)
    for (let i = 0; i < searchZonesKeys.length; i++) {
        const zoneKeys = Object.keys(searchZones[searchZonesKeys[i]])
        const objectKeys = Object.keys(objectsToFind[i])
        const numberOfObjectsToFind = objectKeys.length
        const zonesIndexes = [...zoneKeys]
        const randoms = []

        for (let j = 0; j < numberOfObjectsToFind; j++) {
            const r = Math.floor(Math.random() * zonesIndexes.length)
            randoms.push(zonesIndexes[r])
            zonesIndexes.splice(r, 1)
        }

        for (let j = 0; j < zoneKeys.length; j++) {
            let layerTrigger
            WA.room.onEnterLayer(`${searchZonesKeys[i]}/${zoneKeys[j]}`).subscribe(() => {
                if (!searchZones[searchZonesKeys[i]][zoneKeys[j]].hasBeenSearched) {
                    layerTrigger = WA.ui.displayActionMessage({
                        message: utils.translations.translate('utils.executeAction', {
                            action: utils.translations.translate("utils.examine")
                        }),
                        callback: () => {
                            if (randoms.indexOf(zoneKeys[j]) !== -1) {
                                WA.chat.sendChatMessage(utils.translations.translate(searchZones[searchZonesKeys[i]][zoneKeys[j]].found, {
                                    found: utils.translations.translate(objectsToFind[i][objectKeys[randoms.indexOf(zoneKeys[j])]].name)
                                }), utils.translations.translate('characterNames.myselfName'))
                                objectsToFind[i][objectKeys[randoms.indexOf(zoneKeys[j])]].found = true
                            } else {
                                WA.chat.sendChatMessage(utils.translations.translate(searchZones[searchZonesKeys[i]][zoneKeys[j]].nothing), utils.translations.translate('characterNames.myselfName'))
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
            action: "escape.openZones.kitchenKey.action",
            lockedSentence: "escape.openZones.kitchenKey.lockedSentence",
            unlockedSentence: "escape.openZones.kitchenKey.unlockedSentence",
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
            action: "escape.openZones.bedroomKey.action",
            lockedSentence: "escape.openZones.bedroomKey.lockedSentence",
            unlockedSentence: "escape.openZones.bedroomKey.unlockedSentence",
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
            action: "escape.openZones.paintingKey.action",
            lockedSentence: "escape.openZones.paintingKey.lockedSentence",
            unlockedSentence: "escape.openZones.paintingKey.unlockedSentence",
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

    for (let i = 0; i < openZonesKeys.length; i++) {
        let layerTrigger
        WA.room.onEnterLayer(openZones[openZonesKeys[i]].layer).subscribe(() => {
            if (!openZones[openZonesKeys[i]].isUnlocked) {
                layerTrigger = WA.ui.displayActionMessage({
                    message: utils.translations.translate('utils.executeAction', {
                        action: utils.translations.translate(openZones[openZonesKeys[i]].action)
                    }),
                    callback: () => {
                        for (let j = 0; j < objectsToFind.length; j++) {
                            if (objectsToFind[j][openZonesKeys[i]]) {
                                if (objectsToFind[j][openZonesKeys[i]].found) {
                                    openZones[openZonesKeys[i]].isUnlocked = true
                                    WA.chat.sendChatMessage(utils.translations.translate(openZones[openZonesKeys[i]].unlockedSentence), utils.translations.translate('characterNames.myselfName'))
                                    WA.room.setTiles(openZones[openZonesKeys[i]].tiles)
                                } else {
                                    WA.chat.sendChatMessage(utils.translations.translate(openZones[openZonesKeys[i]].lockedSentence), utils.translations.translate('characterNames.myselfName'))
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
        volume: 0.2,
        loop: true,
        rate: 1,
        detune: 1,
        delay: 0,
        seek: 0,
        mute: false
    }
    mySound.play(soundConfig);
    WA.room.onEnterLayer('exit').subscribe(() => {
        mySound.stop();
    })
})