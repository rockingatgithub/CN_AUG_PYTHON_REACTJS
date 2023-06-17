export const incrementHandler = (num) => {

    return { type: 'INC_COUNTER', data: num }

}

export const decrementHandler = (num) => {

    return { type: 'DEC_COUNTER', data: num }

}