const principalMapDialogs = {
    oldMan: {
        actions: {
            stone: 'Admirer la statue',
            ghost: 'Parler au vieux sage'
        },
        appearing: 'Le vieux sage a été appelé, quelqu\'un semble vouloir se rendre à Avalon',
        admirations: [ // Phrases admiratives pour la statue du vieux sage
            "Quelle jolie statue !",
            "On reconnaît bien l'influence expressioniste du sculpteur...",
            "Une critique des dérives du capitalisme sans doute.",
            "Le modèle me rappelle quelque chose..."
        ],
        firstTalk: [
            'Luuuuuuke, tu dois restaurer l\'équilibre dans la force !',
            'Euh non, je me trompe...',
            '*tousse* *tousse*',
            'Holà Aventurier ! Alors comme ça tu veux te rendre au royaume d\'Avalon ?',
            'Une vieille légende raconte que le roi Arthur y aurait été envoyé après avoir sauté au milieu d\' un banc de requins !',
            'Comment ?! Tu as peur des requins ?!? Du nerf, Aventurier ! Tiens, bois cette potion, elle te donnera du courage. Et maintenant OUSTE ! Je suis occupé.',
            'Bonne chance, Aventurier !'
        ],
        secondTalk: 'Ah, {name} ! Y-a-t\'il eu de l\'avancement dans ta quête ?'
    },
    ladyOfTheLake: {
        firstTalk: [
            'Halte-là !',
            'Vous n\'êtes pas dignes d\'un tel honneur !',
            'Seul les preux chevaliers ayant bravé les dangers d\'Avalon peuvent prétendre devenir rois en retirant l\'épée !'
        ],
        randomSentence: [
            'VOUS ne passerez PAS',
            'Tu ne pourras pas tenter ta chance pour retirer Excalibur du rocher tant que tu n\'as pas réussi les épreuves. N\'oublies pas {name} : "Avalon" est la clé.',
            'Va parler au vieux sage, il saura te guider ! "Avalon" est la clé.',
            'Je ne peux rien pour toi. Trouves "Avalon".'
        ]
    },
    ploufPlouf: {
        boat: {
            action: 'Désigner un matelot pour passer sur la planche',
            sentence: 'Yoho Bande de marins d\'eau douce ! Il y a trop de poids sur ce rafiot, l\'un(e) d\'entre vous passera sur la planche !',
            selected: '{name} va faire un plongeon !'
        },
        money: {
            action: 'Qui va payer sa tournée ?',
            sentence: 'Tiens donc, il semblerait que quelqu\'un soit d\'humeur généreuse aujourd\'hui !',
            selected: '{name} paie sa tournée !'
        },
        potato: {
            action: 'Désigner un volontaire',
            sentence: 'Quelle chance !',
            selected: '{name} est de corvée de patates'
        },
        global: {
            sentence: "Quelqu'un va être tiré au sort !",
            selected: "{name} a été sélectionné"
        }
    },
    getPlayersInRooms: {
        impossible: "Impossible pour le moment, une autre personne fait la même recherche",
        room: "Nombre de personne dans la salle {room} : {nombre}"
    }
}

const graalMapDialogs = {
    riddle: [
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
}


const finalMapDalogs = {
    finalPopup: "Et c'est ainsi qu'après de nombreuses épreuves, l'intrépide {name} parvint à atteindre l'épée magique et tenta de la retirer."
}

const dialogUtils = {
    executeAction: '[Espace] {action}',
    shoot: 'Tirer',
    see: 'Consulter'
}

export {
    principalMapDialogs,
    graalMapDialogs,
    dialogUtils,
    finalMapDalogs
}