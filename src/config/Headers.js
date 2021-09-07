const AuthHeader = () => {
    return ({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    })
}

const JWTHeader = (token) => {
    return ({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-access-token': token
    })
}

export {
    AuthHeader,
    JWTHeader
}