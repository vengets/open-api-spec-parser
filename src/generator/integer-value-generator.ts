import { IntegerSchema } from "../schema/integerSchema";
import { IValueGenerator } from "./value-generator";

export class IntegerValueGenerator extends IValueGenerator<number> {
    generate(): number {
        let schema = this.schema as IntegerSchema;
        return 42;
    }
    
}