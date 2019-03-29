import React, { Component } from 'react'
import './home.scss'
import Game from '../chess/game'
interface HomeProps {
  value: number
}
class Home extends Component<HomeProps> {
  constructor(props: HomeProps) {
    super(props)
    this.state = {
      value: 0
    }
  }
  test(): void {
    console.log(this.props)
  }
  render() {
    return (
      <div className="bylh-home">
        <p onClick={() => this.test()}>
          perceive everything + {this.props.value}
        </p>
        <Game history={[]} xIsNext={true} />
      </div>
    )
  }
}

export default Home
