export default {
  rules: {
    line1: 'You must find the Holy Grail among the objects displayed in the room.',
    line2: 'Many knights have tried and failed.',
    line3: 'By examining the room, you may find some clues!',
    line4: 'The consequences of a bad choice could be terrible! You must choose but... Choose wisely.',
  },
  'good_job': "Well done, you can continue your quest!",
  'ok': 'OK',
  'enigma': {
    'congratulations': 'Congratulations, you\'ve answered my riddle!',
    'you_must_answer': 'To continue your quest, you must answer the following riddle: "{enigma}"',
    'close': 'Close',
    'see_the_answer': 'See the answer {answer_name}',
    'it_is_my_answer': 'That\'s my answer!'
  },
  'it_is_the_graal': 'This is the Holy Grail! I\'m sure it is.',
  'clues_zones': {
    'clues_book': {
      clue: "There is something interesting written in this book, \"{found}\"",
      nothing: "There are only old grandma's recipes in this book"
    },
    'clues_water2': {
      clue: "I see an image appear in the water... One would say {found} !",
      nothing: "I'm not going to drink this rotten water! BEURK."
    },
    'clues_water1': {
      clue: "I see an image appear in the water... One would say {found} !",
      nothing: "I'm not going to drink this rotten water! BEURK."
    },
    'clues_banner1': {
      clue: "Something was carved in the stone behind this banner... \"{found}\"",
      nothing: "A very nice banner."
    },
    'clues_banner2': {
      clue: "Something was carved in the stone behind this banner... \"{found}\"",
      nothing: "A very nice banner."
    },
    'clues_status2': {
      clue: "There is an inscription at the foot of this statue: \"{found}\"",
      nothing: "What a sinister statue!"
    },
    'clues_status1': {
      clue: "There is an inscription at the foot of this statue: \"{found}\"",
      nothing: "What a sinister statue!"
    },
    'clues_skeleton': {
      clue: "He holds something in his hand! I try to take it away from him but he holds on to it... That's it ! It is a missive. We can decipher a part of it : \"{found}\"",
      nothing: "Yuck! A skeleton"
    },
  },
  'graal_clues': {
    'graal_abundancy': {
      'clues_skeleton': 'The grail gives infinite food',
      'clues_book': 'According to legend, the Grail was created from one of Amalthea\'s horns',
    },
    'graal_anchovy': {
      'clues_skeleton': 'You can be sure that the Holy Grail is an anchovy jar.'
    },
    'graal_gobelet': {
      'clues_banner1': 'The grail is made of plastic',
      'clues_status1': 'This is the grail? you could lose it at a birthday party!',
      'clues_book': 'So this is the Grail? It looks like an old plastic cup...'
    },
    'graal_ring': {
      'clues_status2': 'An old legend tells that one day, the Grail was stolen by a hobbit...',
      'clues_book': 'A grail to rule them all. A grail to find them. A grail to bring them all and in the darkness bind them.',
      'clues_status1': 'The Grail must be brought back to Mordor to be destroyed',
      'clues_water1': 'a golden ring'
    },
    'graal_stone': {
      'clues_skeleton': 'the Grail, is actually a glowing stone.',
      'clues_banner2': 'A rolling stone does not gather moss',
      'clues_water2': 'a rock'
    },
    'graal_cup': {
      'clues_banner1': 'The Grail is a cup',
      'clues_water2': 'a beautiful metal cup'
    }
  }
}