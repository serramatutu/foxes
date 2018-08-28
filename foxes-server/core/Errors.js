class _ExtendableError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function')
            Error.captureStackTrace(this, this.constructor);
        else 
            this.stack = (new Error(message)).stack; 
    }
}    

class InvalidArgumentError extends _ExtendableError {};

module.exports = {
    InvalidArgumentError
};