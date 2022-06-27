import { log } from "./util/logger";
import ps from "./data/pet-store.json";
import factory from "./value-generator-factory";
import { OpenApiParser } from "./open-api-parser";

const logger = log.getChildLogger({ name: 'main' });
const separator = '"';
let petstore = ps;

export function main() {
    logger.info('Starting the parser!');
    const parser = new OpenApiParser(JSON.stringify(petstore));
    
    const response = parser.generateObjectFromSchema("#/definitions/Pet");
    console.log(`RESPONSE = ${JSON.stringify(response)}`);

    return true;
}

main();
