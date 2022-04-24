import { IntegerValueGenerator } from "../../src/generator/integer-value-generator";
import { IntegerSchema } from "../../src/schema/integerSchema";
import { expect } from "chai";

describe("should validate integer-value-generator", () => {
    function _invokeGenerator(input?: Partial<IntegerSchema>) {
        const defaultParameters: IntegerSchema = {
            type: "integer",
        };
        const generator = new IntegerValueGenerator({
            ...defaultParameters,
            ...input,
        });
        return generator.generate();
    }

    it("should return single character string when called with no parameters", () => {
        const response = _invokeGenerator();
        expect(response).to.equal(42);
        expect(typeof(response)).to.equal(typeof(1));
    });

});