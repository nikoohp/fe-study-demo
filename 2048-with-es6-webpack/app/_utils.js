const $ = require('jquery')

const Utils = function () {}
Utils.prototype = {
  constructor: Utils,
  width() {
    return document.querySelector('.grid-cell').getBoundingClientRect().width
  },
  // 设置位置
  setPos(pos) {
    const padWidth = parseFloat(window.getComputedStyle(document.querySelector('.grid-container'), null).paddingLeft)
    return padWidth + pos * (this.width() + padWidth)
  },
  // 设置number背景颜色
  setNumberBgColor(num) {
    switch (num) {
      case 2:
        return '#eee4da';
        break;
      case 4:
        return '#ede0c8';
        break;
      case 8:
        return '#f2b179';
        break;
      case 16:
        return '#f59563';
        break;
      case 32:
        return '#f67e5f';
        break;
      case 64:
        return '#f65e3b';
        break;
      case 128:
        return '#edcf72';
        break;
      case 256:
        return '#edcc61';
        break;
      case 512:
        return '#9c0';
        break;
      case 1024:
        return '#33b5e5';
        break;
      case 2048:
        return '#09c';
        break;
      case 4096:
        return '#a6c';
        break;
      case 8192:
        return '#93c';
        break;
    }

    return '#000'
  },
  // 设置number前景色
  setNumberColor(num) {
    if (num <= 4) return '#776e65'
    return '#fff'
  },
  // 显示数字
  showNumWithAnimation(i, j, num) {
    const numCell = document.getElementById(`number-cell-${i}-${j}`)
    numCell.style.width = this.width() + 'px'
    numCell.style.height = this.width() + 'px'
    numCell.style.color = this.setNumberColor(num)
    numCell.style.backgroundColor = this.setNumberBgColor(num)
    numCell.innerText = num
  },
  // 游戏是否结束
  isGameOver() {
    let board = sessionStorage.getItem('board')
    console.log(board)
    return this.nospace(board) && this.nomove(board)
  },
  // 动画函数
  animate(elem, opt, t=200) {
    const startLeft = parseFloat(elem.style.left)
    const startTop = parseFloat(elem.style.top)

    let speedX = (opt.left - startLeft) / t
    let speedY = (opt.top - startTop) / t
    console.log(Math.abs(speedX + startLeft) >= opt.left)
    function animation() {
      if (!Math.abs(speedX + startLeft) >= opt.left && !Math.abs(speedY + startTop) >= opt.top) {
        console.log(`${startLeft}/speedX`)
        elem.style.left = speedX + startLeft + 'px'
        elem.style.top = speedY + startTop + 'px'
        speedX *=2
        speedY *=2
        requestAnimationFrame(animation)
      }

    }
    requestAnimationFrame(animation)
  },
  // 是否能移动
  canMove(board, parms) {
    switch (parms) {
      case 'left':
        for (let i = 0; i < 4; i++) {
          for (let j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
              if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j]) {
                return true
              }
            }
          }
        }
        return false
        break;

      case 'right':
        for (let i = 0; i < 4; i++) {
          for (let j = 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
              if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j]) {
                return true
              }
            }
          }
        }
        return false
        break;

      case 'up':
        for (let j = 0; j < 4; j++) {
          for (let i = 1; i < 4; i++) {
            if (board[i][j] !== 0) {
              if (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j]) {
                return true
              }
            }
          }
        }
        return false
        break;

      case 'down':
        for (let j = 0; j < 4; j++) {
          for (let i = 2; i >= 0; i--) {
            if (board[i][j] !== 0) {
              if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j]) {
                return true
              }
            }
          }
        }
        return false
        break;

      default:
        break;
    }

  },
  // 中间是否有障碍物 -- 横向
  noBlockHor(row, fromCol, toCol, board) {
    for (let i = fromCol + 1; i < toCol; i++) {
      if (board[row][i] !== 0) return false
    }
    return true
  },
  // 中间是否有障碍物 -- 纵向
  noBlockVer(col, fromRow, toRow, board) {
    for (let i = fromRow + 1; i < toRow; i++) {
      if (board[i][col] !== 0) return false
    }
    return true
  },
  // 移动动画
  showMoveAnimation(fromx, fromy, tox, toy) {
    const _this_ = this
    const numCell = document.getElementById(`number-cell-${fromx}-${fromy}`)
    // this.animate(numCell, {
    //   left: _this_.setPos(toy),
    //   top: _this_.setPos(tox)
    // })
    $(numCell).animate({
      left: _this_.setPos(toy),
      top: _this_.setPos(tox)
    }, 200, function() {
      let board = sessionStorage.getItem('board')
      console.log(`nospace: ${_this_.nospace(board)}`)
      console.log(`nomove: ${_this_.nomove(board)}`)

      if (_this_.isGameOver()) {
        alert(0)
      }
    })
  },
  // 设置分数
  setScore(score) {
    const scoreElem = document.querySelector('.score span')
    scoreElem.innerText = score
  },
  // 判断是否还有空余的位置
  nospace(board) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) return false
      }
    }
    return true
  },
  // 是否可移动
  nomove(board) {
    if (this.canMove(board, 'left') || this.canMove(board, 'right') || this.canMove(board, 'up') || this.canMove(board, 'down')) {
      return false
    }
    return true
  }
}

export default Utils