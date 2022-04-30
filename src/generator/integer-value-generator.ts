import { IntegerSchema } from "../schema/integerSchema";
import { IValueGenerator } from "./value-generator";
import { log } from "../util/logger";

const logger = log.getChildLogger({ name: 'IntegerValueGenerator'});
export class IntegerValueGenerator extends IValueGenerator<number> {
    generate(): number {
        logger.debug(`${JSON.stringify(this.schema)}`);
        let schema = this.schema as IntegerSchema;
        return 42;
    }
    
}