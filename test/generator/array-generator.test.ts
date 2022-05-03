import { ArrayGenerator } from "../../src/generator/array-generator";
import { ArraySchema } from "../../src/schema/arraySchema";
import { expect } from "chai";
describe('should validate number-value-generator', () => {
    function _invokeGenerator(input: Object) {

        const generator = new ArrayGenerator(
            input as ArraySchema,
        );
        return generator.generate();
    }

    it("should return single character string when called with no parameters", () => {
        const response = _invokeGenerator( {
            "type": "array",
            "items": {
              "type": "number"
            }
          }
    );
        console.log(JSON.stringify(response));
        expect(response[0]).to.equal(42);
        expect(typeof(response[0])).to.equal(typeof(1));
    });

});
