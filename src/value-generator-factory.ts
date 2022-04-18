import {StringValueGenerator} from "./generator/string-value-generator";
import {StringSchema} from "./schema/StringSchema";

export class ValueGeneratorFactory {
    public parseSchema(properties: Object) {
        let result = new Map();
        Object.keys(properties).forEach((ppty) => {
            let type: string = properties[ppty]?.type;
            switch (type) {
                case "string":
                    let generatedString = new StringValueGenerator(
                        properties[ppty] as StringSchema
                    ).generate();
                    result.set(ppty, generatedString);
                    break;
                case "integer" || "number" || "object" || "array":
                    throw new NotImplementedException(
                        "IntegerValueGenerator not implemented"
                    );
            }
        });
        return result;
    }
}
