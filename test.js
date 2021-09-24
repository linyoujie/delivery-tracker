var tracker = require('./index.js')
var courier = tracker.courier(tracker.COURIER.KOREAPOST.CODE)

courier.trace({trace_number}, function (err, result) {
  console.log(result)
})