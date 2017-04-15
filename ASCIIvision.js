
module.exports = (function () {
  var simple_trim = function (shape) { // function for trim space around
    var sides = { top: 0, right: 0, bottom: 0, left: 0 },
      out = false,
      tmp_shape = []

    // find how deep cut in top
    for (var i = 0, i_lim = shape.length; i < i_lim; i++) {
      for (var j = 0, lim = shape[i].length; j < lim; j++) {
        if (shape[i][j] != ' ') {
          sides.top = i
          out = true
          break
        }
      }
      if (out == true) {
        break
      }
    }
    out = false

    // find how deep cut in right
    for (var j = shape[0].length - 1; j >= 0; j--) {
      for (var i = 0, i_lim = shape.length; i < i_lim; i++) {
        if (shape[i][j] != ' ') {
          sides.right = shape[0].length - j - 1
          out = true
          break
        }
      }
      if (out == true) {
        break
      }
    }
    out = false

    // find how deep cut in bottom
    for (var i = shape.length - 1; i > 0; i--) {
      for (var j = 0, lim = shape[ i ].length; j < lim; j++) {
        if (shape[i][j] != ' ') {
          sides.bottom = shape.length - i - 1
          out = true
          break
        }
      }
      if (out == true) {
        break
      }
    }
    out = false

    // find how deep cut in left
    for (var j = 0, lim = shape[0].length; j < lim; j++) {
      for (var i = 0, i_lim = shape.length; i < i_lim; i++) {
        if (shape[i][j] != ' ') {
          sides.left = j
          out = true
          break
        }
      }
      if (out == true) {
        break
      }
    }
    out = false

    // cut by
    if (sides.top > 0) {
      tmp_shape = []
      for (var i = 0, lim = shape.length; i < lim; i++) {
        if (i >= sides.top) {
          tmp_shape.push(shape[i])
        }
      }
      shape = tmp_shape
    }
    if (sides.bottom > 0) {
      tmp_shape = []
      for (var i = 0, lim = shape.length; i < lim; i++) {
        if (i <= (shape.length - sides.bottom - 1)) {
          tmp_shape.push(shape[i])
        }
      }
      shape = tmp_shape
    }
    if (sides.left > 0) {
      tmp_shape = []
      for (var i = 0, lim = shape.length; i < lim; i++) {
        tmp_shape.push(shape[i].substr(sides.left, shape[i].length - sides.left))
      }
      shape = tmp_shape
    }
    if (sides.right > 0) {
      tmp_shape = []
      for (var i = 0, lim = shape.length; i < lim; i++) {
        tmp_shape.push(shape[i].substr(0, shape[i].length - (sides.right)))
      }
      shape = tmp_shape
    }

    return shape
  }

  var give_position_closer_plus = function (shape) { // return position the nearest +
    var pos_x = null
    var pos_y = null

    for (var i = 0, i_lim = shape.length; i < i_lim; i++) {
      for (var j = 0, j_lim = shape[i].length; j < j_lim; j++) {
        if (shape[i][j] === '+') {
          pos_x = i
          pos_y = j
          break
        }
      }
      if (pos_x !== null && pos_y !== null) {
        break
      }
    }

    if (pos_x !== null && pos_y !== null) {
      return [ pos_x, pos_y ]
    } else {
      return false
    }
  }

  var find_new_shape = function (shape) { // find shape from image
    shape = simple_trim(shape)

    var
      we_have_figure = false,
      while_break_error = false,
      cur_position = false,
      arr_tmp = [],
      new_shape_list = [],
      new_shape_positions = [],
      max_x = shape[0].length,
      max_y = shape.length,
      plus_directions = [],
      cur_direction = 'r',
      last_direction = null,
      direction_rules = {
        't': [ 'r', 't', 'l' ],
        'r': [ 'b', 'r', 't' ],
        'b': [ 'l', 'b', 'r' ],
        'l': [ 't', 'l', 'b' ]
      }

    cur_position = give_position_closer_plus(shape)
    if (cur_position !== false) {
      new_shape_positions.push([ cur_position[0], cur_position[1] ])
      new_shape_list.push(shape[ cur_position[0] ][ cur_position[1] ])

      do {
        // do new step
        switch (cur_direction) {
          case 't': cur_position[0] -= 1
            break
          case 'r': cur_position[1] += 1
            break
          case 'b': cur_position[0] += 1
            break
          case 'l': cur_position[1] -= 1
            break
          default:
            break
        }

        if (
          cur_position[0] < 0 || cur_position[0] >= max_y ||
          cur_position[1] < 0 || cur_position[1] >= max_x
        ) {
          throw new Error('#3 shape is incorrect')
          return false
        }

        if (shape[ cur_position[0] ][ cur_position[1] ] === '+') {
          last_direction = cur_direction
          if (new_shape_positions[0][0] == cur_position[0] && new_shape_positions[0][1] == cur_position[1]) {
            // we returned - need to collect shape
            we_have_figure = true
          } else {
            // find paths

            switch (cur_direction) {
              case 't': arr_tmp = ['r', 't', 'l']
                break
              case 'r': arr_tmp = ['t', 'b', 'r']
                break
              case 'b': arr_tmp = ['r', 'b', 'l']
                break
              case 'l': arr_tmp = ['t', 'b', 'l']
                break
              default:
                break
            }

            plus_directions = []
            for (var ii = 0, ii_lim = arr_tmp.length; ii < ii_lim; ii++) {
              switch (arr_tmp[ii]) {
                case 't':
                  if (cur_position[0] !== 0 &&
                  (shape[ cur_position[0] - 1 ][ cur_position[1] ] === '|' ||
                    shape[ cur_position[0] - 1 ][ cur_position[1] ] === '+')
                ) {
                    plus_directions.push(arr_tmp[ii])
                  }

                  break
                case 'b':
                  if (cur_position[0] !== max_y - 1 &&
                  (shape[ cur_position[0] + 1 ][ cur_position[1] ] === '|' ||
                    shape[ cur_position[0] + 1 ][ cur_position[1] ] === '+')
                ) {
                    plus_directions.push(arr_tmp[ii])
                  }

                  break
                case 'r':
                  if (cur_position[1] !== max_x - 1 &&
                  (shape[ cur_position[0] ][ cur_position[1] + 1 ] === '-' ||
                    shape[ cur_position[0] ][ cur_position[1] + 1 ] === '+')
                ) {
                    plus_directions.push(arr_tmp[ii])
                  }

                  break
                case 'l':
                  if (cur_position[1] !== 0 &&
                  (shape[ cur_position[0] ][ cur_position[1] - 1 ] === '-' ||
                    shape[ cur_position[0] ][ cur_position[1] - 1 ] === '+')
                ) {
                    plus_directions.push(arr_tmp[ii])
                  }

                  break
                default:
                  break
              }
            }

            // find new path and change direction
            if (plus_directions.length > 1) {
              for (var ii = 0, ii_lim = direction_rules[ cur_direction ].length; ii < ii_lim; ii++) {
                if (
                  plus_directions.filter(function (dir) {
                    return dir == direction_rules[ cur_direction ][ii]
                  }).length > 0
                ) {
                  cur_direction = direction_rules[ cur_direction ][ii]
                  break
                }
              }
            } else if (plus_directions.length == 1) {
              cur_direction = plus_directions[0]
            } else {
              throw new Error('#1 shape is incorrect')
              while_break_error = true
            }
          }
        }

        if (we_have_figure === false && while_break_error === false) {
          new_shape_positions.push([ cur_position[0], cur_position[1] ])

          if (last_direction !== null && last_direction === cur_direction) {
            // replace +
            new_shape_list.push(new_shape_list[ new_shape_list.length - 1 ])
          } else {
            new_shape_list.push(shape[ cur_position[0] ][ cur_position[1] ])
          }

          if (last_direction !== null) {
            last_direction = null
          }
        }
      } while (we_have_figure === false && while_break_error === false)

      if (while_break_error === false) {
        // return path and lines
        return { positions: new_shape_positions, lists: new_shape_list}
      } else {
        return false
      }
    } else {
      return false
    }
  }

  var replaceAt = function (str, index, new_str) { // replace the 'index'th character of 'str' with 'new_str'
    return str.substring(0, index) + new_str + str.substring(index + 1)
  }

  var create_figure = function (shape_obj) { // create preshape for new shape
    var max_x = 0,
      max_y = 0,
      shape = [],
      str = ''

    // forming x and y for array
    for (var i = 0, i_lim = shape_obj.positions.length; i < i_lim; i++) {
      if (shape_obj.positions[i][0] + 1 > max_y) {
        max_y = shape_obj.positions[i][0] + 1
      }
      if (shape_obj.positions[i][1] + 1 > max_x) {
        max_x = shape_obj.positions[i][1] + 1
      }
    }

    // create empty array
    for (var i = 0; i < max_y; i++) {
      str = ''
      for (var j = 0; j < max_x; j++) {
        str += ' '
      }
      shape.push(str)
    }

    // fill array
    for (var i = 0, i_lim = shape_obj.positions.length; i < i_lim; i++) {
      shape[ shape_obj.positions[i][0] ] = replaceAt(
        shape[ shape_obj.positions[i][0] ],
        shape_obj.positions[i][1],
        shape_obj.lists[i]
      )
    }

    return shape
  }

  var cut_figure = function (shape, first_position) { // cut needless
    var cur_direction = 'r',
      plus_directions = [],
      cur_position = [],
      max_x = shape[0].length,
      max_y = shape.length,
      arr_tmp = [],
      is_clockwise_done = false,
      is_counterclockwise_done = false,
      system_error = false

    cur_position[0] = first_position[0]
    cur_position[1] = first_position[1]

    while (is_counterclockwise_done === false && system_error === false) {
      switch (cur_direction) {
        case 'r':
          cur_position[1] += 1
          break
        case 'b':
          cur_position[0] += 1
          break
        case 'l':
          cur_position[1] -= 1
          break
        case 't':
          cur_position[0] -= 1
          break
        default:
          break
      }

      if (shape[ cur_position[0] ][ cur_position[1] ] === '+') {
        arr_tmp = []
        switch (cur_direction) {
          case 'r':
            arr_tmp = [ 't', 'r', 'b' ]
            break
          case 'b':
            arr_tmp = [ 'r', 'b', 'l' ]
            break
          case 'l':
            arr_tmp = [ 't', 'b', 'l' ]
            break
          case 't':
            arr_tmp = [ 't', 'r', 'l' ]
            break
          default:
            break
        }

        plus_directions = []
        for (var ii = 0, ii_lim = arr_tmp.length; ii < ii_lim; ii++) {
          switch (arr_tmp[ii]) {
            case 'r':
              if (cur_position[1] !== max_x - 1 &&
              (shape[ cur_position[0] ][ cur_position[1] + 1 ] === '-' ||
                shape[ cur_position[0] ][ cur_position[1] + 1 ] === '+')
            ) {
                plus_directions.push('r')
              }
              break
            case 'b':
              if (cur_position[0] !== max_y - 1 &&
              (shape[ cur_position[0] + 1 ][ cur_position[1] ] === '|' ||
                shape[ cur_position[0] + 1 ][ cur_position[1] ] === '+')
            ) {
                plus_directions.push('b')
              }
              break
            case 'l':
              if (cur_position[1] !== 0 &&
              (shape[ cur_position[0] ][ cur_position[1] - 1 ] === '-' ||
                shape[ cur_position[0] ][ cur_position[1] - 1 ] === '+')
            ) {
                plus_directions.push('l')
              }
              break
            case 't':
              if (cur_position[0] !== 0 &&
              (shape[ cur_position[0] - 1 ][ cur_position[1] ] === '|' ||
                shape[ cur_position[0] - 1 ][ cur_position[1] ] === '+')
            ) {
                plus_directions.push('t')
              }
              break
            default:
              break
          }
        }

        // to plus_directions
        if (plus_directions.length > 1) {
          if (is_clockwise_done === false) {
            // finished trim figure in a clockwise
            is_clockwise_done = true

            cur_position = []
            cur_position[0] = first_position[0]
            cur_position[1] = first_position[1]
            cur_direction = 'b'
          } else if (is_counterclockwise_done === false) {
            // finished trim shape counter clockwise
            is_counterclockwise_done = true
          } else {
            throw new Error('#2 shape is incorrect')
            system_error = true
          }
        } else if (plus_directions.length == 1) {
          // change direction
          cur_direction = plus_directions[0]
          shape[ cur_position[0] ] = replaceAt(shape[ cur_position[0] ], cur_position[1], ' ')
        } else {
          // shape is empty
          return []
        }
      } else {
        // cut
        shape[ cur_position[0] ] = replaceAt(shape[ cur_position[0] ], cur_position[1], ' ')
      }
    }

    if (system_error === true) {
      return false
    } else {
      // cut first position
      shape[ first_position[0] ] = replaceAt(shape[ first_position[0] ], first_position[1], ' ')

      shape = simple_trim(shape)
      return shape
    }
  }

  var is_valide_shapes = function (shape) {
    if (
      !(shape instanceof Array && shape.length > 0 && typeof shape[0] === 'string' && shape[0].length > 0)
    ) {
      return false
    }
    for (var i = 0, i_lim = shape.length; i < i_lim; i++) {
      for (var j = 0, j_lim = shape[i].length; j < j_lim; j++) {
        if (!(shape[i][j] === '+' || shape[i][j] === '-' || shape[i][j] === '|' || shape[i][j] === ' ')) {
          return false
        }
      }
    }
    return true
  }

  return {
    breakPieces: function (shape) {
      // validation
      if (!is_valide_shapes(shape)) {
        console.log('[Error: #4 shape is incorrect]')
        return ({ type: 'error', msg: 'Error: #4 shape is incorrect' })
      }

      var sh_array = [],
        answer = [],
        tmp_answer = [],
        tmp = {},
        err_tmp = false,
        err_sh_a = false,
        break_circle = false

      try {
        sh_array = simple_trim(shape)
        // loop for break shape
        while (err_sh_a === false && err_tmp === false && break_circle === false) {
          tmp = find_new_shape(sh_array)
          if (tmp !== false) {
            // save shape in array
            tmp_answer = []
            tmp_answer = simple_trim(create_figure(tmp))
            answer.push(tmp_answer)

            sh_array = cut_figure(sh_array, tmp.positions[0])

            if (sh_array.length === [].length) {
              break_circle = true
            } else if (sh_array === false) {
              // error from cut_figure
              err_sh_a = true
            }
          } else {
            // error from find_new_shape
            err_tmp = true
          }
        }
      } catch (error) {
        console.log(error)
        return ({ type: 'error', msg: String(error) })
      }

      return answer
    },

    // for debugging
    show_figure: function (shape) {
      if (shape[0] instanceof Array) {
        if (shape.length > 1) {
          for (i = 0, limit = shape.length; i < limit; i++) {
            for (j = 0, jlim = shape[i].length; j < jlim; j++) {
              console.log(shape[i][j])
            }
          }
        }
      } else {
        for (var i = 0, i_lim = shape.length; i < i_lim; i++) {
          console.log(shape[i])
        }
      }
    }

  }
})()
