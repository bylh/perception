import React from 'react'

// 类式组件
// interface SquareProps {
//   value: string,
//   onClick: () => void
// }
// interface SquareState {
//   value: string
// }
// class Square extends Component<SquareProps, SquareState> {
//   constructor(props: SquareProps) {
//     super(props);
//     this.state = {
//       value: null
//     }
//   }
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     )
//   }
// }
// export default Square

// 函数式组件
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}
export default Square
