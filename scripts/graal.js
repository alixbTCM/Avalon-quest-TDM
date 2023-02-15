import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import { graalMapGameRules } from './constants/maps-game-rules.js'
import * as utils from './utils/index.js'

WA.onInit().then(() => {
    let actionMessage
    let currentPopup
    const rules = [
        utils.translations.translate(graalMapGameRules[0]),
        utils.translations.translate(graalMapGameRules[1]),
        utils.translations.translate(graalMapGameRules[2]),
        utils.translations.translate(graalMapGameRules[3]),
    ]
    WA.room.onEnterLayer('rulesZone').subscribe(() => {
        actionMessage = WA.ui.displayActionMessage({
            message: utils.translations.translate('utils.executeAction', {
                action: utils.translations.translate('utils.see')
            }),
            callback: () => {
                currentPopup = WA.ui.openPopup('rulesDisplaying', rules.join(' '), [{
                    label: utils.translations.translate('graal.ok'),
                    callback: (popup) => {
                        // Close the popup when the "Close" button is pressed.
                        popup.close();
                    }
                }]);
            }
        })
    })

    WA.room.onLeaveLayer('rulesZone').subscribe(() => {
        actionMessage.remove()
        currentPopup.close()
    })

    const enigmas = {
        'fr-FR': [
            {
                question: 'Qu\'est-ce qui est petit et marron ?',
                answers: {
                    a: {
                        text: 'Un hamster albinos qui fait partie d\'un cirque itinérant de Pologne',
                        win: false
                    },
                    b: {
                        text: 'Vous pouvez répéter la question ?',
                        win: false
                    },
                    c: {
                        text: 'Un marron !',
                        win: true
                    },
                    d: {
                        text: 'La réponse D',
                        win: false
                    }
                }
            },
            {
                question: 'En 1951 Disney a sorti une BD dans laquelle...',
                answers: {
                    a: {
                        text: 'Mickey était soviétique.',
                        win: false
                    },
                    b: {
                        text: 'Dingo était marchand d’armes.',
                        win: false
                    },
                    c: {
                        text: 'Mickey et Dingo étaient des dealers d’amphétamines.',
                        win: true
                    },
                    d: {
                        text: 'Minnie rencontre des gens qu’elle ne connaissait pas et sympathise avec eux : « Thank you Jackie and Mickey ».',
                        win: false
                    }
                }
            },
            {
                question: 'A quelle vitesse vole une hirondelle non chargée ?',
                answers: {
                    a: {
                        text: 'Une hirondelle africaine ou une européenne ?',
                        win: true
                    },
                    b: {
                        text: '10km/h',
                        win: false
                    },
                    c: {
                        text: 'vite ?',
                        win: false
                    },
                    d: {
                        text: 'Oui !',
                        win: false
                    }
                }
            },
            {
                question: 'Qu\'est-ce qui marche à quatre patte le matin, à quatre patte le midi, et à quatre pattes le soir ?',
                answers: {
                    a: {
                        text: 'Un flamant rose avec une béquille en bambou',
                        win: false
                    },
                    b: {
                        text: 'Un renard',
                        win: true
                    },
                    c: {
                        text: 'Une chaise bleu à pois verts sur laquelle repose un coussin à pompoms',
                        win: false
                    },
                    d: {
                        text: 'Un oeuf qui roule dans le sens des aiguilles d\'une montre mais dont le boeuf n\'amasse pas mousse',
                        win: false
                    }
                }
            },
            {
                question: 'Dans la série Kaamelott, comment est appelé Méléagant ?',
                answers: {
                    a: {
                        text: 'Le Juste',
                        win: false
                    },
                    b: {
                        text: 'Le Cruel',
                        win: false
                    },
                    c: {
                        text: 'La Réponse',
                        win: true
                    },
                    d: {
                        text: 'Le Sanguinaire',
                        win: false
                    }
                }
            },
            {
                question: 'Une boite sans charnière, sans clé, sans couvercle: Pourtant à l’intérieur est caché un trésor doré.',
                answers: {
                    a: {
                        text: 'Lousianne !',
                        win: false
                    },
                    b: {
                        text: 'Coeur de Pirate',
                        win: false
                    },
                    c: {
                        text: 'Un oeuf',
                        win: true
                    },
                    d: {
                        text: 'La boîte à bijoux de la reine Elizabeth II',
                        win: false
                    }
                }
            },
            {
                question: 'Dans le film retour vers le futur, en version FRANÇAISE, combien de gigowatts faut-il ?',
                answers: {
                    a: {
                        text: '1.21',
                        win: false
                    },
                    b: {
                        text: '12.1',
                        win: false
                    },
                    c: {
                        text: '22.1',
                        win: false
                    },
                    d: {
                        text: '2.21',
                        win: true
                    }
                }
            },
            {
                question: 'Quel était le code pour déverrouiller l\'accès à cette map ?',
                answers: {
                    a: {
                        text: '3002',
                        win: false
                    },
                    b: {
                        text: '0203',
                        win: true
                    },
                    c: {
                        text: '3020',
                        win: false
                    },
                    d: {
                        text: '2030',
                        win: false
                    }
                }
            },
            {
                question: 'Quels sont les trigrammes des deux personnes qui ont organisé l\'Avalon quest ?',
                answers: {
                    a: {
                        text: 'ALP et WIO',
                        win: false
                    },
                    b: {
                        text: 'ALB et WIO',
                        win: false
                    },
                    c: {
                        text: 'ALP et MOH',
                        win: false
                    },
                    d: {
                        text: 'ALB et MOH',
                        win: true
                    }
                }
            },
            {
                question: '4*6+3*4-5+7 est égal à :',
                answers: {
                    a: {
                        text: '20 + 12',
                        win: false
                    },
                    b: {
                        text: '34 + 4',
                        win: true
                    },
                    c: {
                        text: '120 + 26',
                        win: false
                    },
                    d: {
                        text: '15 + 4',
                        win: false
                    }
                }
            },
            {
                question: 'Dans la série de livres "Le sorceleur", Geralt a un médaillon. Que représente-t-il ?',
                answers: {
                    a: {
                        text: 'Une épée',
                        win: false
                    },
                    b: {
                        text: 'Un luth',
                        win: false
                    },
                    c: {
                        text: 'Un oeil',
                        win: false
                    },
                    d: {
                        text: 'Une tête de loup',
                        win: true
                    }
                }
            },
            {
                question: 'Dans le jeu vidéo Minecraft, qu\'était le creeper à l\'origine ?',
                answers: {
                    a: {
                        text: 'Un buisson taillé',
                        win: false
                    },
                    b: {
                        text: 'Un cochon buggé',
                        win: true
                    },
                    c: {
                        text: 'Un villageois',
                        win: false
                    },
                    d: {
                        text: 'Une pioche',
                        win: false
                    }
                }
            },
            {
                question: 'Dans le jeu vidéo Bioshock, on peut s\'injecter une substance qui change notre ADN et nous permet d\'utiliser des superpouvoirs. Quel est son nom ?',
                answers: {
                    a: {
                        text: 'ADAM',
                        win: true
                    },
                    b: {
                        text: 'ANDREW',
                        win: false
                    },
                    c: {
                        text: 'GILBERT',
                        win: false
                    },
                    d: {
                        text: 'VITAMINE B12',
                        win: false
                    }
                }
            },
            {
                question: 'Lequel de ces noms ne correspond pas à l\'identité secrète d\'un.e super héro.ine ?',
                answers: {
                    a: {
                        text: 'Robert Parr',
                        win: false
                    },
                    b: {
                        text: 'Diana Prince',
                        win: false
                    },
                    c: {
                        text: 'Peter Parker',
                        win: false
                    },
                    d: {
                        text: 'Harleen Quinzel',
                        win: true
                    }
                }
            },
            {
                question: 'Dans la petite maison dans le prairie, quel personnage devient aveugle ?',
                answers: {
                    a: {
                        text: 'Laura Ingalls',
                        win: false
                    },
                    b: {
                        text: 'Mary Amelia Ingalls',
                        win: true
                    },
                    c: {
                        text: 'Cary Ingalls',
                        win: false
                    },
                    d: {
                        text: 'Caroline Ingalls',
                        win: false
                    }
                }
            },
            {
                question: 'Comment s\'appelle la doubleuse française du personnage de Tracer dans le jeu vidéo Overwatch ?',
                answers: {
                    a: {
                        text: 'Virginie Ledieu',
                        win: false
                    },
                    b: {
                        text: 'Dorothée Pousséo',
                        win: true
                    },
                    c: {
                        text: 'Anaïs Delva',
                        win: false
                    },
                    d: {
                        text: 'Amel Bent',
                        win: false
                    }
                }
            },
            {
                question: 'Quel est le nom du personnage appelé Widowmaker (ou Fatale dans la version française) dans le jeu vidéo Overwatch ?',
                answers: {
                    a: {
                        text: 'Amélie Lacroix',
                        win: true
                    },
                    b: {
                        text: 'Ana Amari',
                        win: false
                    },
                    c: {
                        text: 'Angela Ziegler',
                        win: false
                    },
                    d: {
                        text: 'Brigitte Lindholm',
                        win: false
                    }
                }
            },
        ],
        'en-US': [
            {
                question: 'In "A Cristmas Carol" by Charles Dickens, how many ghosts come to visit Scrooge ?',
                answers: {
                    a: {
                        text: '4',
                        win: true
                    },
                    b: {
                        text: '3',
                        win: false
                    },
                    c: {
                        text: '6',
                        win: false
                    },
                    d: {
                        text: '2',
                        win: false
                    }
                }
            },
            {
                question: 'Who wrote "Wuthering Heights" ?',
                answers: {
                    a: {
                        text: 'Emily Brontë',
                        win: true
                    },
                    b: {
                        text: 'Charlotte Brontë',
                        win: false
                    },
                    c: {
                        text: 'Jane Austen',
                        win: false
                    },
                    d: {
                        text: 'J. K. Rowling',
                        win: false
                    }
                }
            },
            {
                question: 'In "The big bang theory", what is the first name of Leonard\'s roommate?',
                answers: {
                    a: {
                        text: 'Howard',
                        win: false
                    },
                    b: {
                        text: 'Sheldon',
                        win: true
                    },
                    c: {
                        text: 'Stuart',
                        win: false
                    },
                    d: {
                        text: 'Rajesh',
                        win: false
                    }
                }
            },
            {
                question: 'Who is Luke Skywalker\'s father ?',
                answers: {
                    a: {
                        text: 'Chewbacca',
                        win: false
                    },
                    b: {
                        text: 'Han Solo',
                        win: false
                    },
                    c: {
                        text: 'Darth Vader',
                        win: true
                    },
                    d: {
                        text: 'Yoda',
                        win: false
                    }
                }
            },
        ]
    }

    const randomEnigma = enigmas[utils.translations.playerLanguage][Math.floor(Math.random() * enigmas[utils.translations.playerLanguage].length)]
    WA.room.onEnterLayer('enigmaZone').subscribe(() => {
        actionMessage = WA.ui.displayActionMessage({
            message: utils.translations.translate('utils.executeAction', {
                action: utils.translations.translate('utils.see')
            }),
            callback: () => {
                currentPopup = WA.ui.openPopup('enigmaDisplaying', utils.translations.translate('graal.enigma.you_must_answer', {
                    enigma: randomEnigma.question
                }), [{
                    label: utils.translations.translate("graal.ok"),
                    callback: (popup) => {
                        // Close the popup when the "Close" button is pressed.
                        popup.close();
                    }
                }]);
            }
        })
    })

    WA.room.onLeaveLayer('enigmaZone').subscribe(() => {
        actionMessage.remove()
        currentPopup.close()
    })

    const randomEnigmaAnswersKeys = Object.keys(randomEnigma.answers)
    for (let i = 0; i < randomEnigmaAnswersKeys.length; i++) {
        WA.room.onEnterLayer('answers/' + randomEnigmaAnswersKeys[i]).subscribe(() => {
            actionMessage = WA.ui.displayActionMessage({
                message: utils.translations.translate('utils.executeAction', {
                    action: utils.translations.translate('graal.enigma.see_the_answer', {
                        answer_name: randomEnigmaAnswersKeys[i].toUpperCase()
                    })
                }),
                callback: () => {
                    currentPopup = WA.ui.openPopup('answer' + randomEnigmaAnswersKeys[i].toUpperCase() + 'Displaying', randomEnigma.answers[randomEnigmaAnswersKeys[i]].text, [{
                        label: utils.translations.translate('graal.enigma.close'),
                        callback: (popup) => {
                            // Close the popup when the "Close" button is pressed.
                            popup.close();
                        }
                    },
                        {
                            label: utils.translations.translate("graal.enigma.it_is_my_answer"),
                            callback: (popup) => {
                                // Close the popup when the "Close" button is pressed.
                                if (randomEnigma.answers[randomEnigmaAnswersKeys[i]].win) {
                                    WA.room.setTiles([
                                        {
                                            x: 14,
                                            y: 1,
                                            layer: 'enigmaDoor',
                                            tile: null
                                        },
                                        {
                                            x: 15,
                                            y: 1,
                                            layer: 'enigmaDoor',
                                            tile: null
                                        },
                                        {
                                            x: 14,
                                            y: 2,
                                            layer: 'enigmaDoor',
                                            tile: null
                                        },
                                        {
                                            x: 15,
                                            y: 2,
                                            layer: 'enigmaDoor',
                                            tile: null
                                        }
                                    ])
                                    WA.chat.sendChatMessage(utils.translations.translate('graal.enigma.congratulations'), utils.translations.translate('characterNames.fisherKing'))
                                } else {
                                    WA.nav.goToRoom('./map.json')
                                }
                                popup.close();
                            }
                        }]);
                }
            })
        })

        WA.room.onLeaveLayer('answers/' + randomEnigmaAnswersKeys[i]).subscribe(() => {
            actionMessage.remove()
            currentPopup.close()
        })
    }

    const cluesZones = {
        'clues/book': {
            clue: "graal.clues_zones.clues_book.clue",
            nothing: "graal.clues_zones.clues_book.nothing"
        },
        'clues/water2': {
            clue: "graal.clues_zones.clues_water2.clue",
            nothing: "graal.clues_zones.clues_water2.nothing"
        },
        'clues/water1': {
            clue: "graal.clues_zones.clues_water1.clue",
            nothing: "graal.clues_zones.clues_water1.nothing"
        },
        'clues/banner1': {
            clue: "graal.clues_zones.clues_banner1.clue",
            nothing: "graal.clues_zones.clues_banner1.nothing"
        },
        'clues/banner2': {
            clue: "graal.clues_zones.clues_banner2.clue",
            nothing: "graal.clues_zones.clues_banner2.nothing"
        },
        'clues/status2': {
            clue: "graal.clues_zones.clues_status2.clue",
            nothing: "graal.clues_zones.clues_status2.nothing"
        },
        'clues/status1': {
            clue: "graal.clues_zones.clues_status1.clue",
            nothing: "graal.clues_zones.clues_status1.nothing"
        },
        'clues/skeleton': {
            clue: "graal.clues_zones.clues_skeleton.clue",
            nothing: "graal.clues_zones.clues_skeleton.nothing"
        },
    }
    const cluesZonesKeys = Object.keys(cluesZones)

    const graalClues = {
        'graal/abundancy': {
            'clues/skeleton': 'graal.graal_clues.graal_abundancy.clues_skeleton',
            'clues/book': 'graal.graal_clues.graal_abundancy.clues_book',
        },
        'graal/anchovy': {
            'clues/skeleton': 'graal.graal_clues.graal_anchovy.clues_skeleton'
        },
        'graal/gobelet': {
            'clues/banner1': 'graal.graal_clues.graal_gobelet.clues_banner1',
            'clues/status1': 'graal.graal_clues.graal_gobelet.clues_status1',
            'clues/book': 'graal.graal_clues.graal_gobelet.clues_book'
        },
        'graal/ring': {
            'clues/status2': 'graal.graal_clues.graal_ring.clues_status2',
            'clues/book': 'graal.graal_clues.graal_ring.clues_book',
            'clues/status1': 'graal.graal_clues.graal_ring.clues_status1',
            'clues/water1': 'graal.graal_clues.graal_ring.clues_water1'
        },
        'graal/stone': {
            'clues/skeleton': 'graal.graal_clues.graal_stone.clues_skeleton',
            'clues/banner2': 'graal.graal_clues.graal_stone.clues_banner2',
            'clues/water2': 'graal.graal_clues.graal_stone.clues_water2'
        },
        'graal/cup': {
            'clues/banner1': 'graal.graal_clues.graal_cup.clues_banner1',
            'clues/water2': 'graal.graal_clues.graal_cup.clues_water2'
        }
    }
    const graalCluesKeys = Object.keys(graalClues)

// Get graal with random
    const trueGraal = graalCluesKeys[Math.floor(Math.random() * graalCluesKeys.length)]
    const trueGraalKeys = Object.keys(graalClues[trueGraal])
    for (let i = 0; i < cluesZonesKeys.length; i++) {
        let layerTrigger
        WA.room.onEnterLayer(cluesZonesKeys[i]).subscribe(() => {
            layerTrigger = WA.ui.displayActionMessage({
                message: utils.translations.translate('utils.executeAction', {
                    action: utils.translations.translate('utils.examine')
                }),
                callback: () => {
                    if (trueGraalKeys.indexOf(cluesZonesKeys[i]) !== -1) {
                        WA.chat.sendChatMessage(utils.translations.translate(cluesZones[cluesZonesKeys[i]].clue, {
                            found: utils.translations.translate(graalClues[trueGraal][cluesZonesKeys[i]])
                        }), utils.translations.translate('characterNames.myselfName'))
                    } else {
                        WA.chat.sendChatMessage(utils.translations.translate(cluesZones[cluesZonesKeys[i]].nothing), utils.translations.translate('characterNames.myselfName'))
                    }
                }
            })
        })

        WA.room.onLeaveLayer(cluesZonesKeys[i]).subscribe(() => {
            layerTrigger.remove()
        })
    }

    for (let i = 0; i < graalCluesKeys.length; i++) {
        let layerTrigger
        WA.room.onEnterLayer(graalCluesKeys[i]).subscribe(() => {
            layerTrigger = WA.ui.displayActionMessage({
                message: utils.translations.translate('utils.executeAction', {
                    action: utils.translations.translate('graal.it_is_the_graal')
                }),
                callback: () => {
                    if (graalCluesKeys[i] === trueGraal) {
                        WA.room.setTiles([
                            {
                                x: 14,
                                y: 16,
                                layer: 'enigmaDoor',
                                tile: null
                            },
                            {
                                x: 15,
                                y: 16,
                                layer: 'enigmaDoor',
                                tile: null
                            },
                            {
                                x: 14,
                                y: 15,
                                layer: 'enigmaDoor',
                                tile: null
                            },
                            {
                                x: 15,
                                y: 15,
                                layer: 'enigmaDoor',
                                tile: null
                            }
                        ])
                        WA.chat.sendChatMessage(utils.translations.translate('graal.good_job'), utils.translations.translate('characterNames.fisherKing'))
                    } else {
                        mySound.stop();
                        WA.nav.goToRoom('./map.json')
                    }
                }
            })
        })

        WA.room.onLeaveLayer(graalCluesKeys[i]).subscribe(() => {
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