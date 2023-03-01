import * as translationFR from '../translations/fr-FR/index.js'
import * as translationEN from '../translations/en-US/index.js'

const acceptedPlayerLanguages = {
    'fr-FR': translationFR,
    'en-US': translationEN
}

// Get the player language
let playerLanguage = 'fr-FR'

// NOTE : Here playerLanguage is set at the begining but we should perhaps calculate it every time translate function is called in order to manage user changing language on the map ?
WA.onInit().then(() => {
    playerLanguage = WA.player.language

    // Default playerLanguage if not in accepted
    if (!Object.keys(acceptedPlayerLanguages).includes(playerLanguage)) {
        playerLanguage = 'en-US'
    }
})

const getSentenceWithVariables = (message, variables = {}) => {
    let newMessage = message
    const variablesKeys = Object.keys(variables)
    for (let i = 0; i < variablesKeys.length; i++) {
        newMessage = newMessage.replaceAll('{' + variablesKeys[i] + '}', variables[variablesKeys[i]])
    }

    return newMessage
}

const translate = (translationKey, variables= {}) => {
    const keys = translationKey.split('.')
    const translation = keys.reduce((acc, item) => {
        if (!acc || !acc[item]) {
            acc = undefined
        } else {
            acc = acc[item]
        }

        return acc
    }, acceptedPlayerLanguages[playerLanguage])

    if (translation) {
        return (typeof translation === 'string') ? getSentenceWithVariables(translation, variables) : translationKey
    }
    return translationKey
}

export {
    playerLanguage,
    translate,
    getSentenceWithVariables
}