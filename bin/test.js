
//  const { contains } = require('cheerio')
// const { combineFlagAndOptionalValue } = require('commander')
// var tracker = require('..')
//  module.exports = async function(params, context) {
//    // console.log(params);
//    // return {
//    //   test: "Hello World!",
//    // };
 
//      const paratracecode = "1z647r9x3523137178"
//      const paracourier = "UPS"
//      const paraapikey = await params.apikey
 
//      if (!paracourier) {
//        console.error('The Company is not supported.')
//        process.exit(1)
//      } else if (!paratracecode) {
//        console.error('Please enter a tracecode.')
//        process.exit(1)
//      }
 
//      var opts = {}
//      if (paraapikey) {
//        opts.apikey = paraapikey
//      }
//     console.log("123")
//      const courier = await tracker.getCourier(tracker.COURIER[paracourier].CODE, opts)
//      return  courier.trace(paratracecode, async function (err, result) {
//        if (err) {
//          console.error(err)
//          process.exit(1)
//        }
//         console.log(JSON.stringify(result, null, 2))
//           console.log(result)
//                console.log("123")
//         await JSON.stringify(result, null, 2)
//        process.exit(0)
 
//      })
 
 
//      console.log()
//  // return {
//  //     res

//  //   };z
 
courier = require("../lib/courier/ups")
   courier.trace({trace_number:"1Z647R9X4206592758"}, function (err, result) {
   console.log(result)
   console.log("123")
 })

//  }
 