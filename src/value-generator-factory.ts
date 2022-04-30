import { NotImplementedException } from "./error/not-implemented-exception";
import { ArrayGenerator } from "./generator/array-generator";
import { IntegerValueGenerator } from "./generator/integer-value-generator";
import { NumberValueGenerator } from "./generator/number-value-generator";
import {StringValueGenerator} from "./generator/string-value-generator";
import { ArraySchema } from "./schema/arraySchema";
import { IntegerSchema } from "./schema/IntegerSchema";
import { NumberSchema } from "./schema/numberSchema";
import { Schema } from "./schema/schema";
import {StringSchema} from "./schema/StringSchema";

class ValueGeneratorFactory {

    public parseSchema(schema: Schema) {

        let type: string = schema?.type;
            let generatedValue;
            switch (type) {
                case "string":
                    generatedValue = new StringValueGenerator(
                        schema as StringSchema
                    ).generate();
                    break;
                case "number":
                    generatedValue = new NumberValueGenerator(
                        schema as NumberSchema
                    ).generate();
                    break;
                case "integer":
                        generatedValue = new IntegerValueGenerator(
                            schema as IntegerSchema
                        ).generate();
                        break;
                case "array":
                    generatedValue = new ArrayGenerator(
                        schema as ArraySchema
                        ).generate();
                        break;
                case "object":
                    throw new NotImplementedException(
                        "IntegerValueGenerator not implemented"
                    );
            }
        
    }

    public parseSchemaInObject(properties: Object) {
        let result = new Map();
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
