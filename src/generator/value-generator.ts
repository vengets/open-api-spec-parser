import {Schema} from "../schema/schema";

export abstract class IValueGenerator<T> {
    schema: Schema;

    constructor(schema: Schema) {
        this.schema = schema;
    }

    abstract generate(): T;
}

