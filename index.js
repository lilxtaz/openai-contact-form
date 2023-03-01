const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const configuration = new Configuration({
    organization: "org-ky6vlFY7VmfTrJnB21jZ79OF",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

//random

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 3080;

app.use(express.static('/build'));
    const path = require('path');
    app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });

app.post('/', async function(req, res){

    const { message } = req.body;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `\n\n${message}`,
        max_tokens: 3990,
        temperature: 0.5,

      });

      res.json({

        message: response.data.choices[0].text.trim()

      })

})

app.listen(process.env.PORT || port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});