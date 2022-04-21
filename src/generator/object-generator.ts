import valueGeneratorFactory from "../value-generator-factory";
import { IValueGenerator } from "./value-generator";

export class ObjectGenerator extends IValueGenerator<Object> {
    generate(): Object {
        let schema = this.schema as Object;
        const keys = Object.keys(schema);
        let result = new Map();
        keys.forEach(key => {
            result.set(key, valueGeneratorFactory.parseSchema(schema[key]));
        });
        return result;
    }
};