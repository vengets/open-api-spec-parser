
import { log } from "./util/logger";
import petstore from "./data/pet-store.json";
import factory from "./value-generator-factory";
import { OpenApiParser } from "./open-api-parser";

const logger = log.getChildLogger({ name: 'main'}); 
export function main() {
logger.info('Starting the parser!');
const parser = new OpenApiParser(JSON.stringify(petstore));
  const response = parser.generateObjectFromSchema("#/components/schemas/Order");
  console.log(`RESPONSE = ${JSON.stringify(response)}`);
  return true;
}

main();
