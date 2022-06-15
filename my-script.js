const rabbitHoleCeilings = [
    'Ceiling-alice-1',
    'Ceiling-alice-2',
    'Ceiling-alice-3',
    'Ceiling-alice-0',
    'Ceiling-alice-01',
]

const cavernCeiling = [
    'Ceiling-cave-2',
    'Ceiling-cave-1',
    'Waterfall'
]

const meetings = [
    'caverne',
    'terrier-du-lapin',
    'champ',
    'place',
    'quais',
    'black-pearl'
]

// Save number of people in meetings
for(let i = 0; i<meetings.length; i++) {
    WA.room.onEnterLayer(meetings[i]).subscribe(() => {
        let nbPeople = WA.state[meetings[i] + '-nb-people']
        nbPeople = !nbPeople ? 1 : nbPeople + 1
        WA.state[meetings[i] + '-nb-people'] = nbPeople
        console.log('VARIABLE', meetings[i] + '-nb-people', WA.state[meetings[i] + '-nb-people'])
        WA.chat.sendChatMessage(WA.state[meetings[i] + '-nb-people'], "ENTERED")
    });

    WA.room.onLeaveLayer(meetings[i]).subscribe(() => {
        let nbPeople = WA.state[meetings[i] + '-nb-people']
        nbPeople = !nbPeople ? 0 : nbPeople - 1
        WA.state[meetings[i] + '-nb-people'] = nbPeople
        WA.chat.sendChatMessage(WA.state[meetings[i] + '-nb-people'], "LEFT")
    });
}

// Show number of people
WA.room.onEnterLayer('DisplayPannelZone').subscribe(() => {
    const triggerMessage = WA.ui.displayActionMessage({
        message: "Appuyez sur 'Espace' pour voir le tableau d'affichage'",
        callback: () => {
            for(let i = 0; i<meetings.length; i++) {
                WA.chat.sendChatMessage('Nombre de personnes dans ' + meetings[i] + ' : ' + WA.state[meetings[i] + '-nb-people'], "Panneau d'affichage")
            }
        }
    });
})

let LadyCounter = 0;


// Rabbit Hole zone
WA.room.onEnterLayer("rabbitHoleZone").subscribe(() => {
    for (let i=0; i<rabbitHoleCeilings.length; i++) {
        WA.room.hideLayer(rabbitHoleCeilings[i])
    }
});

WA.room.onLeaveLayer("rabbitHoleZone").subscribe(() => {
    for (let i=0; i<rabbitHoleCeilings.length; i++) {
        WA.room.showLayer(rabbitHoleCeilings[i])
    }
});

// Cavern zone
WA.room.onEnterLayer("cavernZone").subscribe(() => {
    for (let i=0; i<cavernCeiling.length; i++) {
        WA.room.hideLayer(cavernCeiling[i])
    }
});

WA.room.onLeaveLayer("cavernZone").subscribe(() => {
    for (let i=0; i<cavernCeiling.length; i++) {
        WA.room.showLayer(cavernCeiling[i])
    }
});

// Lady of the lake
WA.room.onEnterLayer("ladyOfTheLakeZone").subscribe(() => {
    if (LadyCounter === 0) {
        WA.chat.sendChatMessage("Halte-là !", "Dame du lac")
        WA.chat.sendChatMessage("Vous n'êtes pas dignes d'un tel honneur !", "Dame du lac")
        WA.chat.sendChatMessage("Seul les preux chevaliers ayant bravé les dangers d'Avalon peuvent prétendre devenir rois en retirant l'épée !", "Dame du lac")
    }

    if (LadyCounter === 1) {
        WA.chat.sendChatMessage("VOUS ne passerez PAS !", "Dame du lac")
    }

    if (LadyCounter === 2) {
        WA.chat.sendChatMessage("Je t'ai dit d'aller à AVALON !", "Dame du lac")
    }

    if (LadyCounter > 2) {
        WA.chat.sendChatMessage("Tu ne vas jamais me laisser tranquille en fait ? ...", "Dame du lac")
    }

    WA.room.showLayer('Lady-of-the-lake')
    LadyCounter ++
})

WA.room.onLeaveLayer("ladyOfTheLakeZone").subscribe(() => {
    WA.room.hideLayer('Lady-of-the-lake')
})
