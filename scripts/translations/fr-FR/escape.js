export default {
  rules: {
    line1: 'Qui OSE pénétrer en ma demeure ?!?',
    line2: 'ALORS COMME ÇA, VOUS VOUS PENSEZ DIGNE D\'AVALON ?',
    line3: 'Voyons déjà si vous parvenez à sortir d\'ici vivants !',
  },
  searchZones: {
    "searchingZone1": {
      "bed1": {
        found: "J'ai trouvé {found} sous le matelas",
        nothing: "Il n'y a rien ici... à part des puces de lit.",
      },
      "bed2": {
        found: "J'ai trouvé {found} sous le matelas",
        nothing: "Ce n'est pas le moment de dormir !",
      },
      "cadre": {
        found: "J'ai trouvé {found} derrière le cadre",
        nothing: "Quelle belle peinture ! L'artiste était très habile... Ceci dit, ça ne m'avance pas à grand chose",
      },
      "hallwayFurniture": {
        found: "J'ai trouvé {found} à l'intérieur de ce meuble",
        nothing: "Ce meuble est vide...",
      },
      "desk1": {
        found: "Il y avait {found} à l'intérieur du bureau",
        nothing: "Que des lettres d'amour à une certaine Élise...",
      },
      "desk2": {
        found: "Il y avait {found} à l'intérieur du bureau",
        nothing: "Rien du tout...",
      }
    },
    "SearchingZones2": {
      "fireplace": {
        found: "J'ai trouvé {found} dans l'âtre de la cheminée",
        nothing: "Juste des cendres...",
      },
      "pot": {
        found: "J'ai trouvé {found} à l'intérieur de ce pot",
        nothing: "Ce pot est vide... J'ai découvert le pot aux roses ! BA DUM TSS",
      },
      "armure3": {
        found: "J'ai trouvé {found} dans la visière",
        nothing: "Cette armure est sinistre",
      },
      "armure2": {
        found: "J'ai trouvé {found} dans la visière",
        nothing: "Cette armure est sinistre",
      },
      "armure1": {
        found: "J'ai trouvé {found} dans la visière",
        nothing: "Cette armure est sinistre",
      },
      "cadre": {
        found: "J'ai trouvé {found} derrière la peinture",
        nothing: "Quelle belle oeuvre",
      },
      "plant2": {
        found: "J'ai trouvé {found} dans le pot de cette plante",
        nothing: "Qui peut-bien arroser les plante dans ce château abandonné ?",
      },
      "plant": {
        found: "J'ai trouvé {found} dans le pot de cette plante",
        nothing: "Qui peut-bien arroser les plante dans ce château abandonné ?",
      },
      "kitchenFurniture": {
        found: "J'ai trouvé {found} à l'intérieur de ce meuble",
        nothing: "Quel bazard ici",
      },
      "bottles": {
        found: "J'ai trouvé {found} au milieu des bouteilles",
        nothing: "Au moins, si je suis coincé(e) ici longtemps, j'aurais de quoi étancher ma soif...",
      },
      "fridge": {
        found: "J'ai trouvé {found} dans le frigidaire",
        nothing: "Ce n'est pas le moment idéal pour manger.",
      },
    },
    "SearchingZones3": {
      "plant": {
        found: "J'ai trouvé {found} à l'intérieur du pot",
        nothing: "Rien ici.",
      },
      "books": {
        found: "J'ai trouvé {found} dans cette bibliothèque",
        nothing: "Ce n'est pas le moment de lire un livre !",
      },
      "bed": {
        found: "J'ai trouvé {found} sous le matelas",
        nothing: "Quel lit gigantesque !",
      },
      "globe": {
        found: "J'ai trouvé {found} à l'intérieur de ce globe terrestre",
        nothing: "Ce n'est pas le moment de réviser sa géographie !",
      },
      "desk": {
        found: "J'ai trouvé {found} dans un tiroir",
        nothing: "Rien ici.",
      }
    },
    "SearchingZones4": {
      "tenture1": {
        found: "J'ai trouvé {found} derrière cette tenture",
        nothing: "Il n'y a rien ici",
      },
      "tenture2": {
        found: "J'ai trouvé {found} derrière cette tenture",
        nothing: "Il n'y a rien ici",
      },
    }
  },
  objectsToFind: {
    "kitchenKey": "la clé de la cuisine",
    "bedroomKey": "la clé de la chambre",
    "paintingKey": "une étrange petite clé",
    "firstCodeNumber": "le chiffre 0 (zéro) gravé",
    "secondCodeNumber": "le chiffre 2(deux) gravé",
    "thirdCodeNumber": "le chiffre 0(zéro) gravé",
    "fourthCodeNumber": "le chiffre 3(trois) gravé",
  },
  openZones: {
    "kitchenKey": {
      action: "Déverrouiller",
      lockedSentence: "Il me faudrait une clé pour ouvrir cette porte",
      unlockedSentence: "La porte est ouverte",
    },
    "bedroomKey": {
      action: "Déverrouiller",
      lockedSentence: "Il me faudrait une clé pour ouvrir cette porte",
      unlockedSentence: "La porte est ouverte",
    },
    "paintingKey": {
      action: "Examiner",
      lockedSentence: "On dirait qu'il y a un méchanisme pour déplacer cette peinture... Il me faudrait une petite clé pour le déclencher.",
      unlockedSentence: "Le cadre s'est déplacé !",
    }
  }
}