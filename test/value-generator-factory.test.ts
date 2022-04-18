import {ValueGeneratorFactory} from "../src/value-generator-factory";

describe('value-generator-factory tests', () => {
    let factory = new ValueGeneratorFactory();

    function _invokeGenerator(parameters: Object) {
        return factory.parseSchema(parameters);
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

        expect(result.get('firstName').length).toBeGreaterThanOrEqual(5);
        expect(result.get('lastName').length).toBeLessThan(8);
        expect(result.get('city')).toEqual('Bangalore');
        expect(result.get('email').length).toBeGreaterThan(5);
    })
});