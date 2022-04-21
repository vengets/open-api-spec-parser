import { ArrayGenerator } from "./generator/array-generator";
import { IntegerValueGenerator } from "./generator/integer-value-generator";
import { NumberValueGenerator } from "./generator/number-value-generator";
import {StringValueGenerator} from "./generator/string-value-generator";
import { ArraySchema } from "./schema/arraySchema";
import { IntegerSchema } from "./schema/IntegerSchema";
import { NumberSchema } from "./schema/numberSchema";
import {StringSchema} from "./schema/StringSchema";

class ValueGeneratorFactory {
    public parseSchema(properties: Object) {
        let result = new Map();
        console.log(JSON.stringify(properties));
        Object.keys(properties).forEach((ppty) => {
            let type: string = properties[ppty]?.type;
            let generatedValue;
            switch (type) {
                case "string":
                    generatedValue = new StringValueGenerator(
                        properties[ppty] as StringSchema
                    ).generate();
                    break;
                case "number":
                    generatedValue = new NumberValueGenerator(
                        properties[ppty] as NumberSchema
                    ).generate();
                    break;
                case "integer":
                        generatedValue = new IntegerValueGenerator(
                            properties[ppty] as IntegerSchema
                        ).generate();
                        break;
                case "array":
                    generatedValue = new ArrayGenerator(
                        properties[ppty] as ArraySchema
                        ).generate();
                        break;
                case "object":
                    throw new NotImplementedException(
                        "IntegerValueGenerator not implemented"
                    );
            }
            result.set(ppty, generatedValue);
        });
        return result;
    }
}

export default new ValueGeneratorFactory();
