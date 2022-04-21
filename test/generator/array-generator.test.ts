import { ArrayGenerator } from "../../src/generator/array-generator";
import { ArraySchema } from "../../src/schema/arraySchema";

describe('should validate number-value-generator', () => {
    function _invokeGenerator(input: Object) {
        
        const generator = new ArrayGenerator(
            input as ArraySchema,
        );
        return generator.generate();
    }

    xit("should return single character string when called with no parameters", () => {
        const response = _invokeGenerator( {
            "type": "array",
            "items": {
              "type": "number"
            }
          }
    );
    console.log(JSON.stringify(response));
        // expect(response).toBe([42]);
        // expect(typeof(response)).toBe(typeof(1));
    });

});