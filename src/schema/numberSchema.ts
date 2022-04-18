import {IntegerSchema} from "./IntegerSchema";

export class NumberSchema extends IntegerSchema {
    multipleOf?: number;
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;
}