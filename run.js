import {toDiv, toData} from "./index.js"
import * as fs from "fs"

if (!fs.existsSync('./public')){
    fs.mkdirSync('./public');
}

const data = {
    "intro": {
    "title": "Hello world",
    "body": "Lorem ipsum dolor site amet",
    },
    "posts": [{"title":"First post", "body":"Lulala"}, {"title":"Second post", "body":"Lorem lala"}]
  };

const config = {
    "title": "h1",
    "body": "p",
}


var html = toDiv(data, config);

var doc = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Data to div</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
  </head>

  <body>
  <div class="container mt-5" id="page">
  ${html}
  </div>
  </body>
</html>
`

fs.writeFileSync('./public/index.html', doc, 'utf8')


// convert back to data

var html2 = fs.readFileSync("./public/index.html", "utf8");

console.log(JSON.stringify(toData(html2)))