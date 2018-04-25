// 引入工具函数
import Utils from './_utils.js'

const board = []
const hasConflicted = []
let score = 0


const _ = new Utils()

/**
 * 主逻辑对象
 */
const GAME = {
  grid: document.querySelector('.grid-container'),
  start() {
    // 初始化得分
    _.setScore(0)
    // 初始化棋盘格
    this.initGrid()
    // 随机生成两个格子并生成数字
    this.generaterNumber()
    this.generaterNumber()
  },
  // 初始化棋盘格
  initGrid() {
    let gridCell
    for (let i = 0; i < 4; i++) {
      board[i] = []
      hasConflicted[i] = []
      for (let j = 0; j < 4; j++) {
        board[i][j] = 0
        hasConflicted[i][j] = false
        gridCell = document.getElementById(`grid-cell-${i}-${j}`)
        gridCell.style.top = `${_.setPos(i)}px`
        gridCell.style.left = `${_.setPos(j)}px`
      }
    }
    this.updateBoardView(board)
  },
  updateBoardView(boards) {
    // 如果已存在，先删除
    const numberContainer = document.querySelector('.number-container')
    let numberCellHTML = ''

    if (numberContainer.innerHTML !== '') numberContainer.innerHTML = ''
    // 
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        numberCellHTML += `<div class="number-cell" id="number-cell-${i}-${j}"></div>`
      }
    }
    // 添加到页面中
    numberContainer.innerHTML = numberCellHTML

    // 设置属性
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let theNumberCell = document.getElementById(`number-cell-${i}-${j}`)
        if (boards[i][j] === 0) {
          theNumberCell.style.width = 0
          theNumberCell.style.height = 0
        } else {
          theNumberCell.style.width = _.width() + 'px'
          theNumberCell.style.height = _.width() + 'px'
          theNumberCell.style.backgroundColor = _.setNumberBgColor(boards[i][j])
          theNumberCell.style.color = _.setNumberColor(boards[i][j])
          if (board[i][j].toString().length == 3) {
            theNumberCell.style.fontSize = '35px'
          }
          else if (board[i][j].toString().length == 3) {
            theNumberCell.style.fontSize = '24px'
          }
          theNumberCell.innerText = boards[i][j]
          hasConflicted[i][j] = false
        }
        theNumberCell.style.top = `${_.setPos(i)}px`
        theNumberCell.style.left = `${_.setPos(j)}px`
      }
    }
    // 写入sessionStorge
    sessionStorage.setItem('board', JSON.stringify(board))
  },
  // 生成随机数字
  generaterNumber() {
    // 判断是否有空位生成数字
    if (_.nospace(board)) return false
    // 随机一个位置
    let posx = Math.floor(Math.random() * 4)
    let posy = Math.floor(Math.random() * 4)
    while (true) {
      // 判断随机的位置上是否为0
      if (board[posx][posy] === 0) break
      posx = Math.floor(Math.random() * 4)
      posy = Math.floor(Math.random() * 4)
    }
    // 随机一个数字
    let randomNum = board[posx][posy] = Math.random() < 0.5 ? 2 : 4
    // 在随机的位置显示随机的数字
    _.showNumWithAnimation(posx, posy, randomNum)
    
    return true
  },
  // 移动
  move(parms) {
    const _this_ = this
    const isCanMove = _.canMove(board, parms)

    if (!isCanMove) {
      return false
    }
    
    switch (parms) {
      case 'left':
        this.moveLeft()
        break;
      case 'right':
        this.moveRight()
        break;
      case 'up':
        this.moveUp()
        break;
      case 'down':
        this.moveDown()
        break;

      default:
        break;
    }

    setTimeout(function () {
      _this_.updateBoardView(board)
    }, 200)
    return true
  },
  // 向左移动
  moveLeft() {
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        if (board[i][j] !== 0) {
          for (let k = 0; k < j; k++) {
            if (board[i][k] === 0 && _.noBlockHor(i, k, j, board)) {
              // move
              _.showMoveAnimation(i, j, i, k)
              board[i][k] = board[i][j]
              board[i][j] = 0
              continue
            } else if (board[i][k] === board[i][j] && _.noBlockHor(i, k, j, board) && !hasConflicted[i][k]) {
              // move
              _.showMoveAnimation(i, j, i, k)
              // add
              board[i][k] *= 2
              board[i][j] = 0
              // add score
              score += board[i][k]
              _.setScore(score)
              // setConflicted
              hasConflicted[i][k] = true
              continue
            }
          }
        }
      }
    }
  },
  // 向右移动
  moveRight() {
    for (let i = 0; i < 4; i++) {
      for (let j = 2; j >= 0; j--) {
        if (board[i][j] !== 0) {
          for (let k = 3; k > j; k--) {
            if (board[i][k] === 0 && _.noBlockHor(i, j, k, board)) {
              _.showMoveAnimation(i, j, i, k)
              board[i][k] = board[i][j]
              board[i][j] = 0
              continue
            } else if (board[i][k] === board[i][j] && _.noBlockHor(i, j, k, board) && !hasConflicted[i][k]) {
              _.showMoveAnimation(i, j, i, k)
              board[i][k] *= 2
              board[i][j] = 0
              // add score
              score += board[i][k]
              _.setScore(score)
              //setConflicted
              hasConflicted[i][k] = true
              continue
            }
          }
        }
      }
    }
  },
  // 向上移动
  moveUp() {
    for (let j = 0; j < 4; j++) {
      for (let i = 1; i < 4; i++) {
        if (board[i][j] !== 0) {
          for (let k = 0; k < i; k++) {
            if (board[k][j] === 0 && _.noBlockVer(j,k,i, board)) {
              _.showMoveAnimation(i, j, k, j)
              board[k][j] = board[i][j]
              board[i][j] = 0
              continue
            } else if (board[k][j] === board[i][j] && _.noBlockVer(j,k,i, board) && !hasConflicted[k][j]) {
              _.showMoveAnimation(i, j, k, j)
              board[k][j] *= 2
              board[i][j] = 0
              // add score
              score += board[k][j]
              _.setScore(score)
              // setConflicted
              hasConflicted[k][j] = true
              continue
            }
          }
        }
      }
    }
  },
  // 向下移动
  moveDown() {
    for (let j = 0; j < 4; j++) {
      for (let i = 2; i >= 0; i--) {
        if (board[i][j] !== 0) {
          for (let k = 3; k > i; k--) {
            if (board[k][j] === 0 && _.noBlockVer(j, i, k, board)) {
              _.showMoveAnimation(i, j, k, j)
              board[k][j] = board[i][j]
              board[i][j] = 0
              continue
            } else if (board[k][j] === board[i][j] && _.noBlockVer(j, i, k, board) && !hasConflicted[k][j]) {
              _.showMoveAnimation(i, j, k, j)
              board[k][j] *= 2
              board[i][j] = 0
              // add score
              score += board[k][j]
              _.setScore(score)
              // setConflicted
              hasConflicted[k][j] = true
              continue
            }
          }
        }
      }
    }
  },
  // 移动完成后再生成数字
  keydownGeneraterNumber(t = 240) {
    const _this_ = this
    let num = 
    setTimeout(function() {
      _this_.generaterNumber()
    }, t)
  }
}



window.onload = function () {
  GAME.start()
  // 开启新游戏
  document.querySelector('button.button').addEventListener('click', () => {
    GAME.start()
  })

  // 玩游戏
  document.addEventListener('keydown', (e) => {
    const left = 'ArrowLeft'
    const right = 'ArrowRight'
    const up = 'ArrowUp'
    const down = 'ArrowDown'

    switch (e.key) {
      case left:
        // if (!GAME.isGameOver()) {
          GAME.move('left')
          GAME.keydownGeneraterNumber()
        // }
        break;
      case right:
        // if (!GAME.isGameOver()) {
          GAME.move('right')
          GAME.keydownGeneraterNumber()
        // }
        break;
      case up:
        // if (!GAME.isGameOver()) {
          GAME.move('up')
          GAME.keydownGeneraterNumber()
        // }
        break;
      case down:
        // if (!GAME.isGameOver()) {
          GAME.move('down')
          GAME.keydownGeneraterNumber()
        // }
        break;

      default:
        break;
    }
  })


  // 
  const DIS_SIZE = 20
  let startX = 0
  let startY = 0
  let endX = 0
  let endY = 0
  let disX = 0
  let disY = 0

  // 移动端手指滑动
  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX
    startY = e.touches[0].pageY
  })
  document.addEventListener('touchmove', (e) => {
    e.preventDefault()
  })
  document.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].pageX
    endY = e.changedTouches[0].pageY

    disX = endX - startX
    disY = endY - startY

    if (Math.abs(disX) > Math.abs(disY)) {
      // X轴
      // 如果滑动距离过短则视为点击
      if (Math.abs(disX) < DIS_SIZE) return false

      if (disX > 0) {
        // 向右滑动
        if (!GAME.isGameOver()) {
          GAME.move('right')
          GAME.keydownGeneraterNumber()
        }
      }
      else {
        // 向左滑动
        if (!GAME.isGameOver()) {
          GAME.move('left')
          GAME.keydownGeneraterNumber()
        }
      }
    }
    else {
      // Y轴
      // 如果滑动距离过短则视为点击
      if (Math.abs(disY) < DIS_SIZE)  return false
      
      if (disY < 0) {
        // 向上
        if (!GAME.isGameOver()) {
          GAME.move('up')
          GAME.keydownGeneraterNumber()
        }
      }
      else {
        // 向下
        if (!GAME.isGameOver()) {
          GAME.move('down')
          GAME.keydownGeneraterNumber()
        }
      }
    }
  })

  // 缩放
  window.addEventListener('resize', () => {
    GAME.initGrid()
    GAME.updateBoardView(JSON.parse(sessionStorage.getItem('board')))
  })
}