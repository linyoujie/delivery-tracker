const express = require('express')
// app.use(bodyParser.urlencoded({ extended: false }));
var bodyParser = require('body-parser')
// const bodyParser = require("body-parser");
const app = express()

// const postAPI = require('./bin/function');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//Provide the api for post check
app.post('/', async function (req, res) {
    var tracecode = req.body.tracecode;
    var courier = req.body.courier;
    var apikey = req.body.apikey;
    
    var tracker = require('./index')

    // const tracecode = program.tracecode


    if (!tracker.COURIER[courier]) {
      console.error('The Company is not supported.')
      // process.exit(1)
    } else if (!tracecode) {
      console.error('Please enter a tracecode.')
      // process.exit(1)
    }

    var opts = {}
    if (apikey) {
      opts.apikey = apikey
    }

    var courier = await tracker.courier(tracker.COURIER[courier].CODE, opts)
    await courier.trace(tracecode, function (err, result) {
      if (err) {
        console.error(err)
        process.exit(1)
      }

    //   console.log(JSON.stringify(result, null, 2))
    //   return JSON.stringify(result, null, 2)
    res.send(JSON.stringify(result, null, 2))
      // process.exit(0)
    }

    )})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})