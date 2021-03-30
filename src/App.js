import logo from './assets/bitcoin.jpg';
import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Button, Div, Card, Jumbotron, Accordion } from 'react-bootstrap';

//https://e0lqpvvmr7.execute-api.us-east-2.amazonaws.com/default/get_rate_of_bitcoin


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []//{statusCode,body}
    }

    this.getCurrency = this.getCurrency.bind(this)
    this.getView = this.getView.bind(this)
    this.viewType = this.viewType.bind(this)

  }

  componentDidMount() {
    this.getCurrency()
  }


  getCurrency() {
    const url = 'https://e0lqpvvmr7.execute-api.us-east-2.amazonaws.com/default/get_rate_of_bitcoin'
    axios.get(url).then(response => {
      if (response.status === 200) {
        this.setState({ data: response.data })
      } else {
        this.setState({ data: [] })
      }
    })
  }

  viewType(key, value) {
    if (key.toLowerCase() !== 'timestamp') {
      return parseFloat(value).toFixed(2);
    }

    //its a timestamp
    return parseFloat(value).toFixed(0)
  }

  getView(data) {
    const dataKeys = Object.keys(data)
    const dataValues = Object.values(data)

    return (
      <Card className='col-sm-3 m-2' style={{  clear: 'both' }}>
        <Card.Img variant="top" src={logo} style={{ width: '18rem', height: '20vmin' }} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>

            <table className="table w-100" >
              <tbody>
                {
                  dataValues && dataValues.map((key, index) => {
                    return (
                      <tr key={key}>
                        <td className="text-muted">{dataKeys[index].toUpperCase()}:</td>
                        <td className="font-weight-bold">{this.viewType(dataKeys[index], dataValues[index])}</td>
                      </tr>);
                  })
                }

              </tbody>
            </table>
          </Card.Text>
        </Card.Body>
      </Card>

    )
  }

  render() {



    return (

      <div className='container-fluid'>
        <div className='row'>
          {
            this.state.data && this.state.data.map((item, index) => {
              return (this.getView(item))
            })
          }
        </div>
      </div>

    );
  }
}

export default App;
