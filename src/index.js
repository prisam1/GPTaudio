
const express = require('express')
const app = express()
const {OpenAIApi, Configuration} = require('openai')
const bodyParser = require('body-parser')

 const configuration = new Configuration({
  organization: 'org-GBMaHI2JjIbYo0ffAWLmfgiT',
  apiKey: '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'
})


  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{

    res.render('home.ejs');
})

app.post('/response',async (req, res) => {
    const  transcript  = req.body.transcript;
    const result = await processText(transcript);
    res.render('result.ejs' , {result});

});

const openai = new OpenAIApi(configuration);

const processText = async (text) => {

    try {
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: text}],
          });
        
          return chatCompletion.data.choices[0].message.content;
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

 const port =5000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
 



 