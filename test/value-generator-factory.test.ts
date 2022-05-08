import factory from '../src/value-generator-factory';
import {expect} from "chai";
import { TestUtil } from './utils/test-util';

describe('value-generator-factory tests', () => {

    function _invokeGenerator(parameters: Object) {
        return factory.parseSchemas(parameters);
    }

    it('should call string value generator when type is string', () => {
        const properties = {
            "firstName": {
                "type": "string",
                "minLength": "5"
            },
            "lastName": {
                "type": "string",
                "maxLength": "8"
            },
            "city": {
                "type": "string",
                "example": "Bangalore"
            },
            "email": {
                "type": "string",
                "pattern": "[a-z0-9]+@[a-z]+\\.[a-z]{2,3}"
            }
        };

        const res: Map<string, Object> = _invokeGenerator(properties);
        const result = TestUtil.convertMapToObject(res);

        expect((result['firstName'] + '').length).to.greaterThanOrEqual(5);
        expect((result['lastName'] + '').length).to.lessThanOrEqual(8);
        expect(result['city'] + '').to.equal('Bangalore');
        expect((result['email'] + '').length).to.greaterThan(5);
    })

    it('should call string, number and integer value generator', () => {
        const properties = {
            "firstName": {
                "type": "string",
                "minLength": "5"
            },
            "age": {
                "type": "number",
                "minimum": 17,
                "multipleOf": 3
            },
            "voting-age": {
                "type": "number",
                "exclusiveMinimum": 18,
                "multipleOf": 3
            },
            "month": {
                "type": "number",
                "exclusiveMaximum": "31"
            },
            "day": {
                "type": "integer"
            },
            "someNumbers": {
                "type": "array",
                "items": {
                    "type": "number"
                }
            }
        };

        const res: Map<string, object> = _invokeGenerator(properties);
        const result = TestUtil.convertMapToObject(res);

        expect((result['firstName'] + '').length).to.greaterThanOrEqual(5);
        expect(result['age']).to.greaterThanOrEqual(18);
        expect(result['voting-age']).to.equal(21);
        expect(Number.parseInt(result['voting-age'] + '') % 3).to.equal(0);
        expect(result['month']).to.lessThan(31);
        expect(typeof result['day']).to.equal(typeof 1);
        expect(result['someNumbers'][0]).to.equal(42);
    })

    it('should call object generator and its child generators', () => {
        const properties = {
            "order": {
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
          }
        };

        
        const res: Map<string, object> = _invokeGenerator(properties);
        const response = TestUtil.convertMapToObject(res).order;
        
        expect(response['id']).to.equal(10);
        expect(response['petId']).to.equal(198772);
        expect(response['quantity']).to.equal(7);
        expect(response['shipDate']).to.equal('2022-02-04T17:32:28Z');
        expect(response['status']).to.equal('approved');
    })
});
