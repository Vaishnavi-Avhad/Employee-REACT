import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { Link } from "react-router-dom";



class listComponent extends React.Component  {

    constructor(props){
        super(props);
        this.state = {
          listUser:[]
        }
      }
    
      componentDidMount(){
    
        axios.get("http://localhost:5000/Getusers")
        .then(res => {
          const data = res.data.data;
          this.setState({ listUser:data });
        })
        .catch(error => {
          alert(error)
        });
    
      }

  render()
  {
    return (
      <table class="table table-hover table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Address</th>
            <th scope="col">Orgname</th>
            <th colspan="2">Salary</th>
            <th colspan="2">Action</th>

          </tr>
        </thead>
        <tbody>
            {this.listdata()}
        </tbody>
      </table>
    );
  }
  listdata(){

    return this.state.listUser.map((data)=>{
      return(
        <tr>
          <th>{data.ID}</th>
          <td>{data.FIRSTNAME}</td>
          <td>{data.LASTNAME}</td>
          <td>{data.ADDRESS}</td>
          <td>{data.ORGNAME}</td>
          <td>{data.SALARY}</td>
          <td>
            <Link class="btn btn-outline-info "  to={"/edit/"+data.ID} >Edit</Link>
          </td>
          <td>
          <button class="btn btn-outline-danger" onClick={()=>this.Delete(data.ID)}> Delete </button>
          </td>
        </tr>
      )
    });
  }
  Delete(userId){

    const baseUrl = "http://localhost:5000/user/" +userId  
    axios.delete(baseUrl)
    .then(response =>{
      if (response.data.success) {
        alert('sucess!!');
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }
}

export default listComponent;