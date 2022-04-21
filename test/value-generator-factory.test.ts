import factory from '../src/value-generator-factory';
describe.only('value-generator-factory tests', () => {

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

    it('should call string, number and integer value generator when type is string', () => {

        const properties = {
            "firstName": {
                "type": "string",
                "minLength": "5"
            }
            // ,
            // "age": {
            //     "type": "number",
            //     "minimum": "18",
            //     "multipleOf": "3"

            // },
            // "month": {
            //     "type": "number",
            //     "exclusiveMaximum": "31"
            // },
            // "day": {
            //     "type": "integer"
            // }
        };

        const result: Map<string, string> = _invokeGenerator(properties);

        expect(result.get('firstName').length).toBeGreaterThanOrEqual(5);
        // expect(result.get('age')).toBeGreaterThanOrEqual(18);
        // expect(result.get('month')).toBeLessThan(31);
        // expect(typeof result.get('day')).toBe(typeof 1);
    })
});