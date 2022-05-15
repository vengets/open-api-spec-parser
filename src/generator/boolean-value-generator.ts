const RandExp = require("randexp");
import {StringSchema} from "../schema/StringSchema";
import {IValueGenerator} from "./value-generator";
import { log } from "../util/logger";
import { BooleanSchema } from "../schema/booleanSchema";

const logger = log.getChildLogger({ name: 'BooleanValueGenerator'});
export class BooleanValueGenerator extends IValueGenerator<Boolean> {
    generate(): Boolean {
        logger.debug(`${JSON.stringify(this.schema)}`);
        let schema = this.schema as BooleanSchema;

        if (schema.example !== undefined) {
            return schema.example.toLowerCase() == 'true';
        }

        return false;
    }
}