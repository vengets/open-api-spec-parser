const RandExp = require("randexp");
import {StringSchema} from "../schema/StringSchema";
import {IValueGenerator} from "./value-generator";

export class StringValueGenerator extends IValueGenerator<String> {
    generate(): String {
        let minLength = 1;
        let maxLength = 0;
        let schema = this.schema as StringSchema;

        if (schema.example != undefined) {
            return schema.example;
        }

        if (schema.pattern != undefined) {
            let regex = new RandExp(schema.pattern);
            return regex.gen();
        }

        if (schema.minLength != undefined) {
            minLength = schema.minLength > minLength ? schema.minLength : 1;
        }

        if (schema.maxLength != undefined) {
            maxLength = schema.maxLength > maxLength ? schema.maxLength : minLength;
        }
        return StringValueGenerator.generateString(minLength, maxLength);
    }

    private static generateString(minLength: number, maxLength: number): string {
        let result = "";

        let delta = maxLength - minLength;
        if (delta < 0) delta = 1;
        let rand = Math.round(minLength + Math.random() * delta);
        if (rand > maxLength) rand = maxLength;
        if (rand < minLength) rand = minLength;

        for (let idx = 1; idx <= rand; idx++) {
            result = result + "a";
        }

        return result;
    }
}
