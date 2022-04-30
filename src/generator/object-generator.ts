import valueGeneratorFactory from "../value-generator-factory";
import { IValueGenerator } from "./value-generator";
import { log } from "../util/logger";

const logger = log.getChildLogger({ name: 'ObjectGenerator'});
export class ObjectGenerator extends IValueGenerator<Object> {
    generate(): Object {
        logger.debug(`${JSON.stringify(this.schema)}`);
        let schema = this.schema as Object;
        const keys = Object.keys(schema);
        let result = new Map();
        keys.forEach(key => {
            result.set(key, valueGeneratorFactory.parseSchemaInObject(schema[key]));
        });
        return result;
    }
};