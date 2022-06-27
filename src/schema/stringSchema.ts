import {Schema} from "./schema";

export class StringSchema extends Schema {
    format?: string;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    enum?: string[];
}