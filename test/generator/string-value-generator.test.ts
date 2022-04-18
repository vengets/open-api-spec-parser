import {StringValueGenerator} from "../../src/generator/string-value-generator";
import {StringSchema} from "../../src/schema/StringSchema";

describe("should validate string-value-generator", () => {
    function _invokeGenerator(input?: Partial<StringSchema>) {
        const defaultParameters: StringSchema = {
            type: "string",
        };
        const generator = new StringValueGenerator({
            ...defaultParameters,
            ...input,
        });
        return generator.generate();
    }

    it("should return single character string when called with no parameters", () => {
        const response = _invokeGenerator();
        expect(response).toBe("a");
    });

    it("should return example string if defined", () => {
        const response = _invokeGenerator({example: "test"});
        expect(response).toBe("test");
    });

    it("should create string with regex", () => {
        const response = _invokeGenerator({pattern: "[a]{5}"});
        expect(response).toBe("aaaaa");
    });

    it("should consider minLength as 1 when it is less than 1", () => {
        const response = _invokeGenerator({minLength: -1});
        expect(response.length).toBe(1);
    });

    it("should consider minLength when provided", () => {
        const response = _invokeGenerator({minLength: 3});
        expect(response.length).toBe(3);
    });

    it("should consider maxLength when provided", () => {
        const response = _invokeGenerator({maxLength: 4});
        expect(response.length).toBeLessThan(4);
    });
});
