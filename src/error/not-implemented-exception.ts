export class NotImplementedException extends Error {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, NotImplementedException.prototype);
    }
}
