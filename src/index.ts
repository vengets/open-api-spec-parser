
import { log } from "./util/logger";
import petstore from "./data/pet-store.json";
import factory from "./value-generator-factory";

export function main() {
  const stringProperties =
    petstore.components.schemas["Order"];
  const stringValues = factory.parseSingleSchemaElement(stringProperties);
  const obj = Object.fromEntries(stringValues);
  console.log(JSON.stringify(obj));
  return true;
}

main();
