import { DataUtil } from "./util/data-util";
import { log } from "./util/logger";
import valueGeneratorFactory from "./value-generator-factory";

const logger = log.getChildLogger({ name: 'OpenApiParser'});
const refSeparator = '"';

export class OpenApiParser {
    openapispec: JSON;
    isFlattened: boolean;

    constructor(openapispec: string) {
        this.openapispec = JSON.parse(openapispec);
        this.isFlattened = false;
    }

    private flattenReferences() {
        let paths = [].concat(...OpenApiParser.getRefsPath(this.openapispec));

        while (paths.length > 0) {
            paths.forEach(path => {
                let p = (this.getJsonFromPath(path, refSeparator));
                const json = this.getJsonFromPath(p['$ref'], '/');
                delete p['$ref'];
                this.setJson(path, JSON.stringify(json));
                console.log('== ' + path + ' = ' + p + ' : ' + JSON.stringify(json));
            });
            paths = [].concat(...OpenApiParser.getRefsPath(JSON.parse(JSON.stringify(this.openapispec))));
        }
        this.isFlattened = true;
    }

    public getSingleSchemaValue(schemaPath: string, separator: string = '/') {
        if(!this.isFlattened) this.flattenReferences();
        const jsonObject = this.getJsonFromPath(schemaPath, separator);
        console.log(JSON.stringify(jsonObject));
        return valueGeneratorFactory.parseSingleSchemaElement(jsonObject);
    }

    public generateObjectFromSchema(schemaPath: string, separator: string = '/') {
        if(!this.isFlattened) this.flattenReferences();
        const jsonObject = this.getJsonFromPath(schemaPath, separator);
        const generatedObject = valueGeneratorFactory.parseSingleSchemaElement(jsonObject);
        if(generatedObject instanceof Map) {
            return DataUtil.convertMapToObject(generatedObject);
        }
        return generatedObject;
    }

    public getJsonFromPath(ref: string, separator: string) {
        ref = ref.replace('#/','');
        logger.debug(`parsing ref ${ref}`);
        const refSegments = ref.split(separator);
        let tmp = this.openapispec;
        for(let idx=0; idx<refSegments.length; idx++){
            tmp = tmp[refSegments[idx]];
        }
        return tmp;
    }

    private setJson(path: string, jsonString: string) {
        let parentObjPath = path.substring(0, path.lastIndexOf(refSeparator));
        let leaf = path.substring(path.lastIndexOf(refSeparator) + 1);
        let parentObj = this.getJsonFromPath(parentObjPath, refSeparator);
        parentObj[leaf] = JSON.parse(jsonString);
        console.log(`UPDATED =  ${parentObjPath} & (${leaf})`);
    }

    private static getRefsPath(json: JSON, path = []) {
        let result = [];
        if(!json) {
            logger.debug(`Skipping getRefsPath`);
            return result;
        }
        Object.keys(json).forEach(function (prop) {
            if (prop == '$ref') {
                console.log('TEST');
                result.push(path.join(refSeparator));
            }
            if (typeof json[prop] == 'object') {
                const computedPath = OpenApiParser.getRefsPath(json[prop], [...path, prop]);
                if (computedPath.length > 0)
                    result.push([].concat(...computedPath));
            }
            return result;
        });
        return result;
    }
}
