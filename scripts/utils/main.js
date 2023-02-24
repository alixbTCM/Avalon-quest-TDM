const wait = (time) => {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

const selectRandomItemInArray = (array) => {
    const random = Math.floor(Math.random() * array.length)
    return array[random]
}

export {
    wait,
    selectRandomItemInArray
}