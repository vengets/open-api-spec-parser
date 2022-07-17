'use strict';
import ps from './data/pet-store.json';
import { OpenApiParser } from './open-api-parser';

function test() {
    const parser = new OpenApiParser(JSON.stringify(ps));
    const response = parser.generateObjectFromSchema("#/components/requestBodies/RegisterSimRequest");
    console.log(`RESPONSE = ${JSON.stringify(response)}`);
}

test();

module.exports = {
    OpenApiParser: require('./open-api-parser')
}