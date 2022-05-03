
import { log } from "./util/logger";
import petstore from "./data/pet-store.json";
import factory from "./value-generator-factory";

export function main() {
  const stringProperties =
    petstore.components.schemas["StringSchema"].properties;
  const stringValues = factory.parseSchemas(stringProperties);
  log.silly(
    `Parsing stringProperties ${JSON.stringify(
      stringProperties,
      null,
      2
    )} => ${stringValues}`
  );

  const arrayOfSchema =  [
      {
        firstName: {
          type: "string",
          minLength: "5",
        },
        age: {
          type: "integer",
          maxLength: "18",
        },
      },
      {
        firstName: {
          type: "string",
          minLength: "5",
        },
        age: {
          type: "integer",
          maxLength: 12,
        },
      },
    ];

    log.info(` Type is ==${typeof arrayOfSchema}== ${Array.isArray(arrayOfSchema)}`);


  return true;
}

main();
