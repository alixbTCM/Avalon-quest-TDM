import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import {getSentenceWithVariables} from "./utils.js";
import {dialogUtils, graalMapDialogs} from "./constants/maps-dialogs.js";
import { graalMapGameRules } from './constants/maps-game-rules.js'
import {fisherKing, myselfName} from "./constants/character-names.js";

let actionMessage
let currentPopup
WA.room.onEnterLayer('rulesZone').subscribe(() => {
    actionMessage = WA.ui.displayActionMessage({
        message: getSentenceWithVariables(dialogUtils.executeAction, {
            action: dialogUtils.see
        }),
        callback: () => {
            currentPopup = WA.ui.openPopup('rulesDisplaying', graalMapGameRules.join(' '), [{
                label: "OK",
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


const randomEnigma = graalMapDialogs.riddle[Math.floor(Math.random() * graalMapDialogs.riddle.length)]
WA.room.onEnterLayer('enigmaZone').subscribe(() => {
    actionMessage = WA.ui.displayActionMessage({
        message: getSentenceWithVariables(dialogUtils.executeAction, {
            action: dialogUtils.see
        }),
        callback: () => {
            currentPopup = WA.ui.openPopup('enigmaDisplaying', `Pour continuer votre quête, vous devez répondre à l'énigme suivante : \"${randomEnigma.question}\"`, [{
                label: "OK",
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
for (let i = 0; i<randomEnigmaAnswersKeys.length; i++) {
    WA.room.onEnterLayer('answers/' + randomEnigmaAnswersKeys[i]).subscribe(() => {
        actionMessage = WA.ui.displayActionMessage({
            message: getSentenceWithVariables(dialogUtils.executeAction, {
                action: "Voir la réponse " + randomEnigmaAnswersKeys[i].toUpperCase()
            }),
            callback: () => {
                currentPopup = WA.ui.openPopup('answer' + randomEnigmaAnswersKeys[i].toUpperCase() + 'Displaying', randomEnigma.answers[randomEnigmaAnswersKeys[i]].text, [{
                    label: "Fermer",
                    callback: (popup) => {
                        // Close the popup when the "Close" button is pressed.
                        popup.close();
                    }
                },
                    {
                        label: "C'est ma réponse !",
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
                                WA.chat.sendChatMessage("Félicitation, tu as répondu à mon énigme !", fisherKing)
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
        clue : "Il y a quelque chose d'intéressant écrit dans ce livre : \"{found}\"",
        nothing: "Il n'y a que de vieilles recettes de grand-mères dans ce livre."
    },
    'clues/water2': {
        clue: "Je vois une image apparaître dans l'eau... On diraît {found} !",
        nothing: "Hors de question de boire cette eau croupie ! BEURK."
    },
    'clues/water1': {
        clue: "Je vois une image apparaître dans l'eau... On diraît {found} !",
        nothing: "Hors de question de boire cette eau croupie ! BEURK."
    },
    'clues/banner1': {
        clue: "Quelque chose a été gravé dans la pierre derrière cette banière... \"{found}\"",
        nothing: "Une bien belle bannière, ma foi."
    },
    'clues/banner2': {
        clue: "Quelque chose a été gravé dans la pierre derrière cette banière... \"{found}\"",
        nothing: "Une bien belle bannière, ma foi."
    },
    'clues/status2': {
        clue: "Il y a une inscription au pied de cette statue : \"{found}\"",
        nothing: "Quelle statue sinistre !"
    },
    'clues/status1': {
        clue: "Il y a une inscription au pied de cette statue : \"{found}\"",
        nothing: "Quelle statue sinistre !"
    },
    'clues/skeleton': {
        clue: "Il tient quelque chose dans sa main ! Je tente de lui ôter mais le bougre s’accroche à son bien... Ca y est ! C'est une missive. On peut en déchiffrer une partie : \"{found}\"",
        nothing: "Il tient quelque chose dans sa main ! Je tente de lui ôter mais le bougre s’accroche à son bien... Ca y est ! C'est... une cuiller ? Qu’est-ce qui peut bien pousser un homme sentant sa dernière heure arriver, à s’agripper de la sorte à son couvert ? ... Enfin, je doute que ça me soit utile pour trouver ce que je recherche."
    },
}
const cluesZonesKeys = Object.keys(cluesZones)

const graalClues = {
    'graal/abundancy': {
        'clues/skeleton': 'Une corne de machin truc qui file de la bouffe pour l’éternité, ça se laisse pas moisir dans la nature.',
        'clues/book': 'Selon la légende, le Graal a été créé à partir d\'une des cornes d\'Amalthée',
    },
    'graal/anchovy': {
        'clues/skeleton': 'Vous pouvez être sûrs que le Graal, c\'est un bocal à anchois.'
    },
    'graal/gobelet' : {
        'clues/banner1': 'Evier métal',
        'clues/status1': 'Il m\'éclaire quand il brille dans la nuit. Mon évier de minuit !',
        'clues/book': 'Alors c\'est ça, le Graal ? ça ressemble à un vieux gobelet...'
    },
    'graal/ring': {
        'clues/status2': 'Une vieille légende raconte qu\'un jour, le Graal a été volé par un hobbit...',
        'clues/book': 'Un Graal pour les gouverner tous. Un Graal pour les trouver. Un Graal pour les amener tous et dans les ténèbres les lier.',
        'clues/status1': 'Le Graal doit être ramené au Mordor pour y être détruit',
        'clues/water1': 'un anneau doré'
    },
    'graal/stone': {
        'clues/skeleton': 'Y\'a un an au pays de Galles, y a un type tout bizarre qui vient me voir. Y me dit oui tatati, tatata, le Graal, en fait, c\'est une pierre incandescente.',
        'clues/banner2': 'Pierre qui roule n\'amasse pas mousse',
        'clues/water2': 'un caillou'
    },
    'graal/cup': {
        'clues/banner1': 'Le Graal est une coupe',
        'clues/water2': 'une belle coupe ouvragée en métal'
    }
}
const graalCluesKeys = Object.keys(graalClues)

// Get graal with random
const trueGraal = graalCluesKeys[Math.floor(Math.random() * graalCluesKeys.length)]
const trueGraalKeys = Object.keys(graalClues[trueGraal])
for (let i = 0; i<cluesZonesKeys.length; i++) {
    let layerTrigger
    WA.room.onEnterLayer(cluesZonesKeys[i]).subscribe(() => {
        layerTrigger = WA.ui.displayActionMessage({
            message: getSentenceWithVariables(dialogUtils.executeAction, {
                action: "Examiner"
            }),
            callback: () => {
                if (trueGraalKeys.indexOf(cluesZonesKeys[i]) !== -1) {
                    WA.chat.sendChatMessage(getSentenceWithVariables(cluesZones[cluesZonesKeys[i]].clue, {
                        found: graalClues[trueGraal][cluesZonesKeys[i]]
                    }), myselfName)
                } else {
                    WA.chat.sendChatMessage(cluesZones[cluesZonesKeys[i]].nothing, myselfName)
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
            message: getSentenceWithVariables(dialogUtils.executeAction, {
                action: "C'est le Graal ! J'en suis sûr."
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
                    WA.chat.sendChatMessage("Bien joué, tu peux continuer ta quête !", fisherKing)
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
