export class DataUtil {
    public static convertMapToObject(map: Map<string, object>) {
        const responseObject = Object.fromEntries(map);
    
        Object.keys(responseObject).forEach((key) => {
          if (typeof map.get(key) == "object" && !Array.isArray(map.get(key))) {
            responseObject[key] = Object.fromEntries(
              map.get(key) as Map<string, object>
            );
          }
        });
        return responseObject;
      }
}