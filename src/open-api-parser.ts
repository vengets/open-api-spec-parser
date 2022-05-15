import { DataUtil } from "./util/data-util";
import { log } from "./util/logger";
import valueGeneratorFactory from "./value-generator-factory";

const logger = log.getChildLogger({ name: 'OpenApiParser'}); 
export class OpenApiParser {
    openapispec: JSON;

    constructor(openapispec: string) {
        this.openapispec = JSON.parse(openapispec);
    }

    public generateObjectFromSchema(schemaPath: string) {
        const jsonObject = this.getJsonFromPath(schemaPath);
        const generatedObject = valueGeneratorFactory.parseSingleSchemaElement(jsonObject);
        if(generatedObject instanceof Map) {
            return DataUtil.convertMapToObject(generatedObject);
        }
        return generatedObject;
    }
    public getJsonFromPath(ref: string) {
        ref = ref.replace('#/','');
        logger.debug(`parsing ref ${ref}`);
        const refSegments = ref.split('/');
        let tmp = this.openapispec;
        for(let idx=0; idx<refSegments.length; idx++){
            tmp = tmp[refSegments[idx]];
        }
        return tmp;
    }

}