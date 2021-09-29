const express = require('express')
// app.use(bodyParser.urlencoded({ extended: false }));
var bodyParser = require('body-parser')
// const bodyParser = require("body-parser");
const app = express()

// const postAPI = require('./bin/function');
const func = require('./bin/function')

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
    var inputcourier = req.body.courier;
    var apikey = req.body.apikey;
    
    var tracker = require('./index')

    // const tracecode = program.tracecode
    console.log(courier)
    var guessCourier = func.courierGuess(tracecode)
    if (inputcourier && !tracker.COURIER[inputcourier]) {
    //   console.error('The Company is not supported.')
      console.log('The Company is not supported.')
      res.send({'code': '404','message' : 'The Company is not supported.'})

      // process.exit(1)
    } else if (!inputcourier && guessCourier !== 'Error') {
        inputcourier = guessCourier
      // process.exit(1)
    } else if (!inputcourier && !guessCourier) {
        console.error('Fail to trace package please enter a correct courier.')
        res.send({'code': '403','message' : 'Fail to trace package please enter a correct courier.'})
        // console.log('Please enter a courier.')
        return
      } 
    


    var opts = {}
    if (apikey) {
      opts.apikey = apikey
    }
    const trackcourier = await tracker.COURIER[inputcourier]
    var courier 
    if(trackcourier)
    {
        courier = await tracker.courier(trackcourier.CODE, opts)
    }
    if (courier)
    await courier.trace(tracecode, function (err, result) {
      if (err) {
        // console.error(err)
        console.log(err)
        if (err.message == 'Unauthorized')
            res.send({"code" : err.code, "message" : "API called exceed limits, please apply your own API",})
        else
            res.send(err)
        // process.exit(1)
      }


    //   console.log(JSON.stringify(result, null, 2))
    //   return JSON.stringify(result, null, 2)
    // res.send(JSON.stringify(result, null, 2))
    res.send(JSON.stringify(result, null, 2))
      // process.exit(0)
    }

    )})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})