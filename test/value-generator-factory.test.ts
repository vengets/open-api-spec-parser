import factory from '../src/value-generator-factory';
import {expect} from "chai";

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

        const result: Map<string, string> = _invokeGenerator(properties);
        expect(result.get('firstName').length).to.greaterThanOrEqual(5);
        expect(result.get('lastName').length).to.lessThanOrEqual(8);
        expect(result.get('city')).to.equal('Bangalore');
        expect(result.get('email').length).to.greaterThan(5);
    })

    it('should call string, number and integer value generator when type is string', () => {
        const properties = {
            "firstName": {
                "type": "string",
                "minLength": "5"
            }
            ,
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

        const result: Map<string, string> = _invokeGenerator(properties);
        expect(result.get('firstName').length).to.greaterThanOrEqual(5);
        expect(result.get('age')).to.greaterThanOrEqual(18);
        expect(result.get('voting-age')).to.equal(21);
        expect(Number.parseInt(result.get('voting-age')) % 3).to.equal(0);
        expect(result.get('month')).to.lessThan(31);
        expect(typeof result.get('day')).to.equal(typeof 1);
        expect(result.get('someNumbers')[0]).to.equal(42);
    })
});
