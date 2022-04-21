import { ArraySchema } from "../schema/arraySchema";
import valueGeneratorFactory from "../value-generator-factory";
import { IValueGenerator } from "./value-generator";

export class ArrayGenerator extends IValueGenerator<[any]> {
    generate(): [any] {
        let schemas = this.schema as ArraySchema;
        let values = valueGeneratorFactory.parseSchema(schemas.items);

        return [values];
    }
}