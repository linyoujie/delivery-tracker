#! /usr/bin/env node
module.exports = {


  //NO using this function
  search: async (tracecode, courier, apikey) => {

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
    var result2 = await courier.trace(tracecode, function (err, result) {
      if (err) {
        console.error(err)
        // process.exit(1)
      }

      // console.log(result2result, null, 2))
      // return JSON.stringify(result, null, 2)
      // process.exit(0)
    }

    )

    console.log("result2", JSON.stringify(result2))



  },

  courierGuess: (tracecode) => {

    var matchUPS1 = '^1[zZ][0-9A-Za-z]{3}[0-9A-Za-z]{3}[0-9A-Za-z]{2}[0-9A-Za-z]{4}[0-9A-Za-z]{3}[0-9A-Za-z]{1}';
    var matchUPS2 = '^[kKJj]{1}[0-9]{10}$';

    var matchUSPS1 = '(^\\d{30}$)|(^91\\d+$)|(^\\d{20}$)|(^\\d{26}$)| ^E\\d{1}\\d{9}\\d{2}$|^9\\d{15,21}$| ^91[0-9]+$| ^[A-Za-z]{2}[0-9]+US$/i';

    var matchFedex1 = '(^96\\d{20}$)|(^\\d{15}$)|(^\\d{12}$)|(^98\\d{20}$)';
    var matchDHL = '^[0-9]{10,11}$'

    var matchCAPost = '^[0-9]{16}$|^[A-Z]{2}[0-9]{9}[A-Z]{2}$'

    var matchRoyalmail = '^[A-Za-z]{2}[0-9]{9}[Gg][Bb]$'


    const upsRegrex = new RegExp( matchUPS1 + '|' + matchUPS2);
    // const userIDRegex = new RegExp('^[1-9]');
    const uspsRegex = new RegExp(matchUSPS1);
    const fedexRegex = new RegExp(matchFedex1);
    const dhlRegex = new RegExp(matchDHL);
    const capostRegex = new RegExp(matchCAPost);
    const royalmail = new RegExp(matchRoyalmail);

    // console.log(tracecode)
    if (upsRegrex.test(tracecode)) {
      return "UPS"
    }
    else if (uspsRegex.test(tracecode)) {
      return "USPS"
    }
    else if (fedexRegex.test(tracecode)) {
      return "FEDEX"
    }
    else if (dhlRegex.test(tracecode)) {
      return "DHL"
    }
    else if (royalmail.test(tracecode)) {
      return "ROYALMAIL"
    }

    else {
      // console.log(fedexRegex.test('283090198425'))
      return "Error"
    }
  }
}