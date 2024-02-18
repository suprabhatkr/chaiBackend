require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const fs = require('fs')
const index_html = __dirname + '/index.html';

var input_data = fs.readFileSync(index_html, 'utf8');

app.get('/', (req, res) => {
    // Send the HTML file using res.sendFile()
    res.sendFile(index_html);
  });

app.get('/twitter', (req, res) => {
    res.send('<h2> My twitter username is suprabhatsingh3 </h2>')
})

app.use(express.urlencoded({ extended: true }));

app.post('/endpoint', (req, res) => {
  // Process the request body here
  console.log('Received POST request body:', req.body);
  input_data = input_data.replace("<p class=\"postreq\">", "<p class=\"postreq\"><br>" + JSON.stringify(req.body));
  fs.writeFileSync(index_html, input_data, 'utf-8');
  res.send('Received POST request successfully\n');
});

var sampleJsonContent = {
    "glossary": {
        "title": "example glossary",
		"GlossDiv": {
            "title": "S",
			"GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
					"SortAs": "SGML",
					"GlossTerm": "Standard Generalized Markup Language",
					"Acronym": "SGML",
					"Abbrev": "ISO 8879:1986",
					"GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
						"GlossSeeAlso": ["GML", "XML"]
                    },
					"GlossSee": "markup"
                }
            }
        }
    }
}

app.get("/json", (req, res) => {
    res.json(sampleJsonContent)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})