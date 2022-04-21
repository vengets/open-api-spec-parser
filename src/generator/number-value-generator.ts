import { NumberSchema } from "../schema/numberSchema";
import { IValueGenerator } from "./value-generator";

export class NumberValueGenerator extends IValueGenerator<number> {
    generate(): number {
        let schema = this.schema as NumberSchema;

        if (schema.example !== undefined) {
            return Number(schema.example);
        }

        let max = schema.maximum || schema.exclusiveMaximum;
        let min = schema.minimum || schema.exclusiveMinimum;
        if(schema.exclusiveMaximum !== undefined) max = max-1;
        if(schema.exclusiveMinimum !== undefined) min = min+1;
        
        if(schema.multipleOf !== undefined) {
            if(min !== undefined && schema.multipleOf < min) {
                let minMultiplier = Math.floor(min/schema.multipleOf)+ 1;
                return minMultiplier * schema.multipleOf; 
            }
            return schema.multipleOf;
        }

        if(min !== undefined) return min;
        if(max !== undefined) return max;

        return 42;   
    }
}