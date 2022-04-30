import {Schema} from "../schema/schema";
import { log } from "../util/logger";

const logger = log.getChildLogger({ name: 'IValueGenerator'});
export abstract class IValueGenerator<T> {
    schema: Schema | Array<Object>;

    constructor(schema: Schema) {
        this.schema = schema;
        logger.debug(`${JSON.stringify(this.schema)}`);
    }

    abstract generate(): T;
}

