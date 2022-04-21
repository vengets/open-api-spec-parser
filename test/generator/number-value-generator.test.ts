import { NumberValueGenerator } from "../../src/generator/number-value-generator";
import { NumberSchema } from "../../src/schema/numberSchema";

describe('should validate number-value-generator', () => {
    function _invokeGenerator(input?: Partial<NumberSchema>) {
        const defaultParameters: NumberSchema = {
            type: "number",
        };
        const generator = new NumberValueGenerator({
            ...defaultParameters,
            ...input,
        });
        return generator.generate();
    }

    it("should return single character string when called with no parameters", () => {
        const response = _invokeGenerator();
        expect(response).toBe(42);
    });

    it("should consider minimum value attribute", () => {
        const response = _invokeGenerator({ minimum: 2});
        expect(response).toBeGreaterThanOrEqual(2);
    });

    it("should consider exclusiveMinimum value attribute", () => {
        const response = _invokeGenerator({ exclusiveMinimum: 3});
        expect(response).toBeGreaterThan(3);
    });

    it("should consider maximum value attribute", () => {
        const response = _invokeGenerator({ maximum: 5});
        expect(response).toBeLessThanOrEqual(5);
    });

    it("should consider exclusiveMaximum value attribute", () => {
        const response = _invokeGenerator({ exclusiveMaximum: 5});
        expect(response).toBeLessThan(5);
    });

    it("should consider minimum and multipleOf value attribute", () => {
        const response = _invokeGenerator({ multipleOf: 3, minimum: 5});
        expect(response).toBeGreaterThanOrEqual(5);
        expect(response%3).toBe(0);
    });

    it("should consider maximum and multipleOf value attribute", () => {
        const response = _invokeGenerator({ multipleOf: 3, maximum: 5});
        expect(response).toBeLessThanOrEqual(5);
        expect(response%3).toBe(0);
    });
});

