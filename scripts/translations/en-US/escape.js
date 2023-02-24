export default {
  rules: {
    line1: 'Who DARES to enter my house?!?',
    line2: 'SO WHAT, YOU THINK YOU\'RE WORTHY OF AVALON?',
      line3: 'Let\'s see if you can get out of here alive!',
  },
  searchZones: {
    "searchingZone1": {
      "bed1": {
        found: "I found {found} under the mattress",
        nothing: "There's nothing here... except bedbugs.",
      },
      "bed2": {
        found: "I found {found} under the mattress",
        nothing: "This is not the time to sleep!",
      },
      "cadre": {
        found: "I found {found} behind the frame",
        nothing: "What a beautiful painting! The artist was very skilled... That said, it doesn't help me much",
      },
      "hallwayFurniture": {
        found: "I found {found} inside this cabinet",
        nothing: "This piece of furniture is empty...",
      },
      "desk1": {
        found: "There was {found} inside the office",
        nothing: "Only love letters to a certain Elise...",
      },
      "desk2": {
        found: "There was {found} inside the office",
        nothing: "Nothing...",
      }
    },
    "SearchingZones2": {
      "fireplace": {
        found: "I found {found} in the fireplace",
        nothing: "Just ashes...",
      },
      "pot": {
        found: "I found {found} inside this pot",
        nothing: "This pot is empty...",
      },
      "armure3": {
        found: "I found {found} in the visor",
        nothing: "This armor is sinister",
      },
      "armure2": {
        found: "I found {found} in the visor",
        nothing: "This armor is sinister",
      },
      "armure1": {
        found: "I found {found} in the visor",
        nothing: "This armor is sinister",
      },
      "cadre": {
        found: "I found {found} behind the painting",
        nothing: "What a beautiful piece of work",
      },
      "plant2": {
        found: "I found {found} in the pot of this plant",
        nothing: "Who can water the plants in this abandoned castle?",
      },
      "plant": {
        found: "I found {found} in the pot of this plant",
        nothing: "Who can water the plants in this abandoned castle?",
      },
      "kitchenFurniture": {
        found: "I found {found} inside this cabinet",
        nothing: "What a mess here",
      },
      "bottles": {
        found: "I found {found} among the bottles",
        nothing: "At least, if I'm stuck here for a long time, I'll have something to quench my thirst...",
      },
      "fridge": {
        found: "I found {found} in the fridge",
        nothing: "This is not a good time to eat.",
      },
    },
    "SearchingZones3": {
      "plant": {
        found: "I found {found} inside the pot",
        nothing: "Nothing here.",
      },
      "books": {
        found: "I found {found} in this bookcase",
        nothing: "This is no time to read a book!",
      },
      "bed": {
        found: "I found {found} under the mattress",
        nothing: "What a gigantic bed!",
      },
      "globe": {
        found: "I found {found} inside this globe",
        nothing: "This is no time to brush up on your geography!",
      },
      "desk": {
        found: "I found {found} in a drawer",
        nothing: "Nothing here.",
      }
    },
    "SearchingZones4": {
      "tenture1": {
        found: "I found {found} behind this hanging",
        nothing: "There is nothing here",
      },
      "tenture2": {
        found: "I found {found} behind this hanging",
        nothing: "There is nothing here",
      },
    }
  },
  objectsToFind: {
    "kitchenKey": "the kitchen key",
    "bedroomKey": "the bedroom key",
    "paintingKey": "a strange little key",
    "firstCodeNumber": "the number 0 (zero) engraved",
    "secondCodeNumber": "the number 2 (two) engraved",
    "thirdCodeNumber": "the number 0 (zero) engraved",
    "fourthCodeNumber": "the number 3 (three) engraved",
  },
  openZones: {
    "kitchenKey": {
      action: "Unlock",
      lockedSentence: "I would need a key to open this door",
      unlockedSentence: "The door is open",
    },
    "bedroomKey": {
      action: "Unlock",
      lockedSentence: "I need a key to open this door",
      unlockedSentence: "The door is open",
    },
    "paintingKey": {
      action: "Examine",
      lockedSentence: "It looks like there is a mechanism to move this painting... I would need a small key to trigger it.",
      unlockedSentence: "The frame has moved!",
    }
  }
}