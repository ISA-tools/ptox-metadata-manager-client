export function required(){
    return v => !!v || ' Field is required.'
}


export function isBatch() {
    return value => {
        const pattern = /^[A-Z][A-Z]$/
        return pattern.test(value) || 'Batch must be two capital letters.'
    }
}

export function maxSize(size) {
    return value => value.length <= size || `Max ${size} characters.`
}
