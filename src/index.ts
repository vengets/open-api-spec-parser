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
    
    // const response = parser.generateObjectFromSchema("#/components/schemas/Pet");
    let count = 0;

    let paths = [].concat(...getRefsPath(JSON.parse(JSON.stringify(petstore))));

    console.log(`RESPONSE = ${paths.length}`);
    while (paths.length > 0) {
        paths.forEach(path => {
            let p = (getJsonObject(path));
            const json = parser.getJsonFromPath(p['$ref']);
            delete p['$ref'];
            setJson(path, JSON.stringify(json));
            console.log('== ' + path + ' = ' + p + ' : ' + JSON.stringify(json));
        });
        paths = [].concat(...getRefsPath(JSON.parse(JSON.stringify(petstore))));
    }
    console.log('TEST=======' + JSON.stringify(petstore));
    return true;
}

function setJson(path: string, jsonString: string) {

    let parentObjPath = path.substring(0, path.lastIndexOf(separator));

    let leaf = path.substring(path.lastIndexOf(separator) + 1);
    let parentObj = getJsonObject(parentObjPath);
    parentObj[leaf] = JSON.parse(jsonString);
    console.log(`UPDATED =  ${parentObjPath} & (${leaf})`);
    // let p = getJsonObject(path);

}


function getJsonObject(path: string) {
    if (!path) {
        return;
    }
    const subPath = path.split(separator);
    let tmp = petstore;
    subPath.forEach(p => {
        tmp = tmp[p];
    });
    return tmp;
}

function getRefsPath(json: JSON, path = []) {
    let result = [];
    Object.keys(json).forEach(function (prop) {
        console.log(prop + '  ' + typeof json[prop] + " " + path);
        if (prop == '$ref') {
            console.log('TEST');
            result.push(path.join(separator));
        }
        if (typeof json[prop] == 'object') {
            const computedPath = getRefsPath(json[prop], [...path, prop]);
            if (computedPath.length > 0)
                result.push([].concat(...computedPath));
        }
        return result;
    });
    return result;
}

main();
