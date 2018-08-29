class ExtendableError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function')
            Error.captureStackTrace(this, this.constructor);
        else 
            this.stack = (new Error(message)).stack; 
    }
}    

/**
 * Thrown when an argument passed to a function is invalid due to its type or value
 */
class InvalidArgumentError extends ExtendableError {};

/**
 * Thrown when a method is yet to be implemented.
 */
class NotImplementedError extends ExtendableError {};

module.exports = {
    InvalidArgumentError,
    NotImplementedError
};