import { expect } from "chai";
import { ObjectGenerator } from "../../src/generator/object-generator";
import { ObjectSchema } from "../../src/schema/objectSchema";

describe('should valideate generated object from object-generator', () => {

    function _invokeGenerator(input?: Partial<ObjectSchema>): Map<string, object> {
        const defaultParameters: ObjectSchema = {
            type: "object",
        };
        const generator = new ObjectGenerator({
            ...defaultParameters,
            ...input
        });
        return generator.generate();
    }

    it('should parse object schema correctly and generate map as expected', () => {
        const request = {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64",
                "example": 10
              },
              "petId": {
                "type": "integer",
                "format": "int64",
                "example": 198772
              },
              "quantity": {
                "type": "integer",
                "format": "int32",
                "example": 7
              },
              "shipDate": {
                "type": "string",
                "format": "date-time"
              },
              "status": {
                "type": "string",
                "description": "Order Status",
                "example": "approved",
                "enum": [
                  "placed",
                  "approved",
                  "delivered"
                ]
              },
              "complete": {
                "type": "boolean"
              }
            },
            "xml": {
              "name": "order"
            }
          };

        const response = _invokeGenerator(request);

        expect(response.get('id')).to.equal(10);
        expect(response.get('petId')).to.equal(198772);
        expect(response.get('quantity')).to.equal(7);
        expect(response.get('shipDate')).to.equal('2022-02-04T17:32:28Z');
        expect(response.get('status')).to.equal('approved');
    });
});