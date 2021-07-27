import axios from "axios";
import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import UpdateFav from "./UpdateFav";

export class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: process.env.REACT_APP_BACKEND_URL,
      listData: [],
      showData: false,
    };
  }

  componentDidMount = async () => {
    axios.get(`${this.state.url}/fav-list`).then((result) => {
      this.setState({
        listData: result.data,
        showData: true,
      });
    });
  };
  deletFav = async (item) => {
    const id = item.id;
    axios.delete(`${this.state.url}/delete/${id}`).then((result) => {
      this.setState({
        listData: result.data,
        showData: true,
      });
    });
  };
  render() {
    return (
      <>
      <h1>Favorite Shop</h1>
        {this.state.showData &&
          this.state.listData.map((item, indx) => {
            return (
              <>
                <Card
                  style={{
                    width: "18rem",
                    margin: "1.5rem",
                    display: "inline-block",
                  }}
                >
                  <Card.Img variant="top" src={item.img} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.ingredients}</Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => {
                        this.deletFav(item);
                      }}
                      style={{
                        margin: "10px",
                      }}
                    >
                      delete
                    </Button>
                    <UpdateFav
                      title={item.title}
                      ingredients={item.ingredients}
                      img={item.img}
                      id={item.id}
                      description={item.description}
                      listData={this.state.listData}
                    />
                  </Card.Body>
                </Card>
              </>
            );
          })}
      </>
    );
  }
}

export default Favorite;
