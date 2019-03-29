import React, { Component } from 'react'
import './home.scss'
import Game from '../chess/game'
import axios from 'axios'
interface HomeProps {
  name: string
}
class Home extends Component<HomeProps> {
  constructor(props: HomeProps) {
    super(props)
    this.state = {
      name: '井字棋'
    }
  }
  test(): void {
    console.log(this.props)
    axios.request({
      method: 'get',
      url: '/about'
    }).then((data) => {
      console.log(data);
    });
  }
  render() {
    return (
      <div className="bylh-home">
        <p onClick={() => this.test()}>
          {this.props.name}
        </p>
        <Game history={[]} xIsNext={true} />
      </div>
    )
  }
}

export default Home
