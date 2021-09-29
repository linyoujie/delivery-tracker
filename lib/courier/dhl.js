'use strict'

var request = require('request')
var moment = require('moment')

var tracker = require('../')

const loadHandler = function (opts) {
  
  return {
    trackingInfo: function (number) {
      var apikey = 'BGUpAbTSPTajadxXrH0mRUQWQDpnjod5'
      if (opts.apikey)
      apikey = opts.apikey
      return {
        method: 'GET',
        url: 'https://api-eu.dhl.com/track/shipments?trackingNumber=' + number +  '&language=en&offset=0&limit=5',
        json: true,
        headers: {
          'DHL-API-Key': apikey,
          // 'Accept': 'application/json',
        }
      }
    },
    parser: {
      trace: function (data) {
        var courier = {
          code: tracker.COURIER.DHL.CODE,
          name: tracker.COURIER.DHL.NAME
        }

        var result = {
          courier: courier,
          number: data.id,
          status: tracker.STATUS.PENDING
        }

        var checkpoints = []
        for (var i = 0; i < data.events.length; i++) {
          var item = data.events[i]
          var checkpoint = {
            courier: courier,
            message: item.description,
            status: tracker.STATUS.IN_TRANSIT,
            time: moment(item.timestamp).utc().format('YYYY-MM-DDTHH:mmZ')
          }

          const location = item.location && item.location.address && item.location.address.addressLocality

          if (location) {
            checkpoint.location = location
          }

          if (item.statusCode === 'delivered') {
            checkpoint.status = tracker.STATUS.DELIVERED
          } else if (item.statusCode === 'returned') {
            checkpoint.status = tracker.STATUS.RETURNED
          }
          checkpoints.push(checkpoint)
        }

        result.checkpoints = checkpoints
        result.status = tracker.normalizeStatus(result.checkpoints)

        return result
      }
    }
  }
}

module.exports = function (opts = {}) {
  const handler = loadHandler(opts)
  return {
    trackingInfo: handler.trackingInfo,
    trace: function (number, cb) {
      console.log("Tracking DHL packge:", number)
      if (!opts.apikey) {
        // return cb(null, tracker.error(tracker.ERROR.REQUIRED_APIKEY))
        // Not going to throw error, and using my API
      }

      var tracking = handler.trackingInfo(number, opts.consumerKey, cb)
      // console.log("API key ", opts.apikey)
      request(tracking, function (err, res, body) {
        if (err) {

          return cb(err)
        }

        try {

          if (res.statusCode !== 200) {
            console.log("Unauthorized?")
            

            return cb(tracker.error(res.statusMessage))
          }

          var result = handler.parser.trace(body.shipments[0])
          cb(result ? null : tracker.error(tracker.ERROR.INVALID_NUMBER), result)
        } catch (e) {
          cb(tracker.error(e.message))
        }
      })
    }
  }
}
