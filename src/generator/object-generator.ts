import valueGeneratorFactory from "../value-generator-factory";
import { IValueGenerator } from "./value-generator";
import { log } from "../util/logger";
import {ObjectSchema} from "../schema/objectSchema";

const logger = log.getChildLogger({ name: 'ObjectGenerator'});
export class ObjectGenerator extends IValueGenerator<Object> {
    generate(): Map<string, object> {
        logger.debug(`${JSON.stringify(this.schema)}`);
        let schema = this.schema as ObjectSchema;
        let result = new Map<string, object>();
        if(schema.properties) {
            const keys = Object.keys(schema.properties);

            keys.forEach(key => {
                result.set(key, valueGeneratorFactory.parseSingleSchemaElement(schema.properties[key]));
            });
        }

        return result;
    }
};
