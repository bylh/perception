import React, { Component } from 'react'
import Square from './square'
import './chess.scss'
interface BoardProps {
  squares: Array<string>
  onClick: (i: string) => void
}
interface BoardState {
  squares: Array<string>
  xIsNext: boolean
}
class Board extends Component<BoardProps, BoardState> {
  renderSquare(i: string) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare('0')}
          {this.renderSquare('1')}
          {this.renderSquare('2')}
        </div>
        <div className="board-row">
          {this.renderSquare('3')}
          {this.renderSquare('4')}
          {this.renderSquare('5')}
        </div>
        <div className="board-row">
          {this.renderSquare('6')}
          {this.renderSquare('7')}
          {this.renderSquare('8')}
        </div>
      </div>
    )
  }
}

export default Board
