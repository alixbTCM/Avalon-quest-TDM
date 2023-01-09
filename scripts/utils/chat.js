import { translate } from './translate.js'

const initChat = () => {
    // Init null room id
    WA.player.state.saveVariable(
        'chatRoomId',
        null,
        {
            public: true,
            persist: false,
            score: "room"
        }
    );

    WA.state['receiveChatMessage'] = false

    // Ecouter le nouveau message
    WA.state.onVariableChange('receiveChatMessage').subscribe((value) => {
        if (value) {
            if (WA.state['chatMessageRoom'] === null || WA.state['chatMessageRoom'] === WA.player.state.chatRoomId) {
                WA.chat.sendChatMessage(WA.state['chatMessageContent'], WA.state['chatMessageAuthor'])
            }
        }
    })
}

// Send chat message to all players in map
const sendMessageToAllPlayers = (message, author, roomId= null) => {
    WA.state['chatMessageContent'] = message
    WA.state['chatMessageAuthor'] = author
    WA.state['chatMessageRoom'] = roomId // Receive only in a certain room
    WA.state['receiveChatMessage'] = true

    setTimeout(() => {
        WA.state['receiveChatMessage'] = false
    }, 100)
}

// Changer le room id d'un player
const setPlayerChatRoomId = (id = null) => {
    WA.player.state.saveVariable(
        'chatRoomId',
        id,
        {
            public: true,
            persist: false,
            score: "room"
        }
    );
}

const monologue = (translationKeys, author, variables = {}) => {
    for (let i = 0; i<translationKeys.length; i++) {
        WA.chat.sendChatMessage(translate(translationKeys[i], variables), author)
    }
}

export {
    initChat,
    setPlayerChatRoomId,
    sendMessageToAllPlayers,
    monologue,
}