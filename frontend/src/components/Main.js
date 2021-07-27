import axios from "axios";
import React, { Component } from "react";
import { Card,Button } from "react-bootstrap";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: process.env.REACT_APP_BACKEND_URL,
      listData: [],
      showData: false,
    };
  }
  componentDidMount = async () => {
    axios.get(`${this.state.url}/retreive`).then((result) => {
      this.setState({
        listData: result.data,
        showData: true,
      });
    });
  };
  creatFav = async (item) => {
    const reqBody = item;
    await axios.post(`${this.state.url}/create`, reqBody);
  };
  render() {
    return (
      <>
      <h1>Coffee Shop</h1>
        {this.state.showData &&
          this.state.listData.map((item, indx) => {
            return (
              <>
                

                <Card style={{ width: "18rem" ,margin:"1.5rem" ,display:"inline-block" }}>
                  <Card.Img variant="top" src={item.img} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                    {/* {item.description} */}
                    {item.ingredients}
                    </Card.Text>
                    <Button variant="success" onClick={() => {
                    this.creatFav(item);
                  }} >add to fav</Button>
                  </Card.Body>
                </Card>
              </>
            );
          })}
      </>
    );
  }
}

export default Main;
