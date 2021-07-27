import axios from "axios";
import React, { Component } from "react";
import { Modal,Button } from "react-bootstrap";

class UpdateFav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: process.env.REACT_APP_BACKEND_URL,
      listData: this.props.listData,
      show: false,
      title:"",
      ingredients:""
    };
  }

  showModel=()=>{
      this.setState({
          show:!this.state.show
      })
  }
  getTitle=(e)=>{
      this.setState({
        title:e.target.value
      })
  }
  getIngredients=(e)=>{
      this.setState({
        ingredients:e.target.value
      })
  }

  updateFav=async(e)=>{
      const reqBody={
        title:this.state.title,
        ingredients:this.state.ingredients,
        img:this.props.img,
        description:this.props.description,
        id:this.props.id
      }
      axios.put(`${this.state.url}/update/${this.props.id}`,reqBody).then(result=>{
        this.setState({
            listData: result.data,
            show: false,
          });
      })
  }
  render() {
    return (
      <>
        <Button variant="warning" onClick={()=>{this.showModel()}}>
          update
        </Button>

        <Modal show={this.state.show} onHide={()=>{this.showModel()}}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form onSubmit={(e)=>{this.updateFav(e)}}>
                  <label for="title">Title </label>
                  <br/>
                  <input type="text" name="title" onChange={(e)=>{this.getTitle(e)}} placeholder={this.props.title}/>
                  <br/>
                  <br/>
                  
                  <label for="ingredients">Ingredients </label>
                  <br/>
                  <input type="text"  name="ingredients" onChange={(e)=>{this.getIngredients(e)}} placeholder={this.props.ingredients}/>
                  <br/>
                  <br/>
                 
                  <Button variant="primary" type="submit">
              Save Changes
            </Button>
              </form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={()=>{this.showModel()}}>
              Close
            </Button>
           
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default UpdateFav;
