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


export function minSize(size) {
    return value => (value && value.length >= size) || `Min ${size} characters.`
}

export function isEmail(){
    return value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
    }
}

export function isURL(){
    return value => {
        const pattern = /^(http|https):\/\/[^ "]+$/
        return pattern.test(value) || 'Invalid URL.'
    }
}
