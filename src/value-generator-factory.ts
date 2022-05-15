// import {Logger} from "tslog";
import { ArrayGenerator } from "./generator/array-generator";
import { BooleanValueGenerator } from "./generator/boolean-value-generator";
import { IntegerValueGenerator } from "./generator/integer-value-generator";
import { NumberValueGenerator } from "./generator/number-value-generator";
import { ObjectGenerator } from "./generator/object-generator";
import { StringValueGenerator } from "./generator/string-value-generator";
import { ArraySchema } from "./schema/arraySchema";
import { BooleanSchema } from "./schema/booleanSchema";
import { IntegerSchema } from "./schema/IntegerSchema";
import { NumberSchema } from "./schema/numberSchema";
import { ObjectSchema } from "./schema/objectSchema";
import { Schema } from "./schema/schema";
import { StringSchema } from "./schema/StringSchema";
import { log } from "./util/logger";

const logger = log.getChildLogger({ name: "ValueGeneratorFactory" });

class ValueGeneratorFactory {

  public parseSchemas(schemas: Object) {
    let result: Map<string, object> = new Map<string, object>();
    Object.keys(schemas).forEach((key) => {
      let schema = schemas[key] as Schema;
      logger.debug(`${JSON.stringify(schema)}`);
      let generatedValue = this.parseSingleSchemaElement(schema);
      if (generatedValue != undefined) {
        result.set(key, generatedValue);
      }
    });
    return result;
  }

  public parseSingleSchemaElement(properties: Object) {
    logger.debug(`${JSON.stringify(properties)}`);
    let ppty = "type";
      let type: string = properties[ppty];
      let generatedValue;
      logger.info(`Parsing ${ppty} ${type}`);
      switch (type) {
        case "string":
          generatedValue = new StringValueGenerator(
            properties as StringSchema
          ).generate();
          break;
        case "number":
          generatedValue = new NumberValueGenerator(
            properties as NumberSchema
          ).generate();
          break;
        case "integer":
          generatedValue = new IntegerValueGenerator(
            properties as IntegerSchema
          ).generate();
          break;
        case "array":
          generatedValue = new ArrayGenerator(
            properties as ArraySchema
          ).generate();
          break;
        case "object":
          generatedValue = new ObjectGenerator(
            properties as ObjectSchema
          ).generate();
          break;
        case 'boolean':
            generatedValue = new BooleanValueGenerator(
                properties as BooleanSchema
            ).generate();
      }
      logger.debug(`Generated value ${generatedValue}`);
      return generatedValue;
    }
  }

export default new ValueGeneratorFactory();
