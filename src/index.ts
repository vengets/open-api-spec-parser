import {StringSchema} from "./schema/StringSchema";

import petstore from './data/pet-store.json';
import factory from "./value-generator-factory";

export function main() {

    const stringProperties = petstore.components.schemas['StringSchema'].properties;
    const stringValues = factory.parseSchema(stringProperties);
    console.log(`Parsing stringProperties ${JSON.stringify(stringProperties, null, 2)} => ${stringValues}`);

    return true;
}

main();
