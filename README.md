# Data to div

DataToDiv automatically generates html based on a data object. What's more: it can also generate data based on html that was previously generateed with DataToDiv :-) This can be useful for quick prototyping or even an on-page cms (if you change the html contents on the page, you can later convert it back to data to save the changes!).

## SSR and CSR

This module supports both server-side rendering and client-side rendering, so you could just supply data and generate HTML pages on the server, than allow the user to make changes and rteurn the data (client-side).

## How does it work?

run.js contains a demo, but here's the rundown:

### toDiv
toDiv converts the data to HTML

```
// import the module
import {toDiv, toData} from "./index.js"
import * as fs from "fs"

if (!fs.existsSync('./public')){
    fs.mkdirSync('./public');
}

// provide the data
const data = {
    "intro": {
    "title": "Hello world",
    "body": "Lorem ipsum dolor site amet",
    },
    "posts": [{"title":"First post", "body":"Lulala"}, {"title":"Second post", "body":"Lorem lala"}]
  };

// the config object allows you to map html tags to keys in the data
const config = {
    "title": "h1",
    "body": "p",
}

// run it
var html = toDiv(data, config);

// return the generated html
console.log(html);

```

### toData

toData converts the HTML back to data

```
console.log(JSON.stringify(toData(html)));

```