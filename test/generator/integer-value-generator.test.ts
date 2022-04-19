import { IntegerValueGenerator } from "../../src/generator/integer-value-generator";
import { IntegerSchema } from "../../src/schema/integerSchema";

describe("should validate integer-value-generator", () => {
    function _invokeGenerator(input?: Partial<IntegerSchema>) {
        const defaultParameters: IntegerSchema = {
            type: "string",
        };
        const generator = new IntegerValueGenerator({
            ...defaultParameters,
            ...input,
        });
        return generator.generate();
    }

    it("should return single character string when called with no parameters", () => {
        const response = _invokeGenerator();
        expect(response).toBe(42);
        expect(typeof(response)).toBe(typeof(1));
    });

});