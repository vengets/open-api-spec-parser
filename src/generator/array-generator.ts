import { ArraySchema } from "../schema/arraySchema";
import valueGeneratorFactory from "../value-generator-factory";
import { IValueGenerator } from "./value-generator";
import { log } from "../util/logger";

const logger = log.getChildLogger({ name: 'ArrayGenerator'});
export class ArrayGenerator extends IValueGenerator<[any]> {
    generate(): [any] {
        logger.debug(`${JSON.stringify(this.schema)}`);
        let schemas = this.schema as ArraySchema;
        let values = valueGeneratorFactory.parseSchemaInObject(schemas.items);

        return [values];
    }
}