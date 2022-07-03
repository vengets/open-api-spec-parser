
# open-api-spec-parser <img src="https://raw.githubusercontent.com/vengets/open-api-spec-parser/main/images/banner.png" width=500 height=250 aligh=right>
This parser generates the sample request object for the requested api, by parsing the Open Api Specification json file.


## Usage

Consider you have the open API Specification as below:
  
### Example 1:
*petstore.json*
```json 
{
  "swagger": "2.0",
  "definitions": {
    "ApiResponse": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "type": {
          "type": "string"
        },
        "message": {
          "type": "string"
        }
      }
    }
  }
}

```

You can use OpenApiSpecParser object to parse and generate a sample ApiResponse as shown below:

```javascript
    const parser = new OpenApiParser(JSON.stringify(petstore));
    const response = parser.generateObjectFromSchema("#/definitions/ApiResponse");
    console.log(`RESPONSE = ${JSON.stringify(response)}`);
```

Output:

```json 
{
  "code": 42,
  "type": "a",
  "message": "a"
}
```

### Example 2:
*petstore.json*
```json
{
  "Pet": {
    "type": "object",
    "required": [
      "name",
      "photoUrls"
    ],
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "category": {
        "$ref": "#/definitions/Category"
      },
      "name": {
        "type": "string",
        "example": "doggie"
      },
      "photoUrls": {
        "type": "array",
        "xml": {
          "wrapped": true
        },
        "items": {
          "type": "string",
          "xml": {
            "name": "photoUrl"
          }
        }
      },
      "tags": {
        "type": "array",
        "xml": {
          "wrapped": true
        },
        "items": {
          "xml": {
            "name": "tag"
          },
          "$ref": "#/definitions/Tag"
        }
      },
      "status": {
        "type": "string",
        "description": "pet status in the store",
        "enum": [
          "available",
          "pending",
          "sold"
        ]
      }
    },
    "xml": {
      "name": "Pet"
    }
  },
  "Category": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "name": {
        "type": "string"
      }
    },
    "xml": {
      "name": "Category"
    }
  }
}
 ```

You can use OpenApiSpecParser object to parse and generate a sample ApiResponse as shown below:

```javascript
    const parser = new OpenApiParser(JSON.stringify(petstore));
    const response = parser.generateObjectFromSchema("#/Pet");
    console.log(`RESPONSE = ${JSON.stringify(response)}`);
```

Output:

```json 
{
  "id": 42,
  "category": {
    "id": 42,
    "name": "a"
  },
  "name": "doggie",
  "photoUrls": [
    "a"
  ],
  "tags": [
    {}
  ],
  "status": "available"
}
```
### Example 3:
This example shows how to get query parameter value for GET endpoint(s).
*petstore.json*
```json 
{
  "swagger": "2.0",
  "PageNumberQueryParam": {
    "name": "page",
    "in": "query",
    "required": false,
    "schema": {
      "type": "number",
      "default": 1,
      "minimum": 1
    },
    "description": "Page number. Starts from 1."
  }
}

```

You can use OpenApiSpecParser object to parse and generate a sample ApiResponse as shown below:

```javascript
    const parser = new OpenApiParser(JSON.stringify(petstore));
    const param = parser.getSingleSchemaValue("#/PageNumberQueryParam" + "/schema");
    console.log(`PARAM = ${JSON.stringify(param)}`);
```

Output:

``` 
PARAM = 1
```