#! /usr/bin/env node
module.exports = {

 search: async (tracecode,courier,apikey) => { 

// var program = {
//   "tracecode": "1z647r9x3523137178",
//   "courier": "UPS",
//   "apikey": "inspirecloud"
// }


var tracker = require('..')

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
var result2 = await courier.trace(tracecode,  function (err, result) {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  // console.log(result2result, null, 2))
  // return JSON.stringify(result, null, 2)
  // process.exit(0)
}

)

console.log("result2", JSON.stringify(result2))



}
}