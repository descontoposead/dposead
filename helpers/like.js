const distanceOf = (str_left, str_right) => {
  str_left = str_left.toLowerCase()
  str_right = str_right.toLowerCase()

  var costs = new Array()
  for (var i = 0; i <= str_left.length; i++) {
    var lastValue = i
    for (var j = 0; j <= str_right.length; j++) {
      if (i == 0) costs[j] = j
      else {
        if (j > 0) {
          var newValue = costs[j - 1]
          if (str_left.charAt(i - 1) != str_right.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
          costs[j - 1] = lastValue
          lastValue = newValue
        }
      }
    }
    if (i > 0) costs[str_right.length] = lastValue
  }

  return costs[str_right.length]
}

const similarity = (str_left, str_right) => {
  var longer = str_left
  var shorter = str_right
  if (str_left.length < str_right.length) {
    longer = str_right
    shorter = str_left
  }
  var longerLength = longer.length
  if (longerLength == 0) {
    return 1.0
  }

  return (longerLength - distanceOf(longer, shorter)) / parseFloat(longerLength)
}

const like = (searching, wanted) => similarity(searching, wanted) > 0.3

export default like
