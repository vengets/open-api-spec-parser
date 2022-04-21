import {Schema} from "../schema/schema";

export abstract class IValueGenerator<T> {
    schema: Schema | Array<Object>;

    constructor(schema: Schema) {
        this.schema = schema;
    }

    abstract generate(): T;
}

