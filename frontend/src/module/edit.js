import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
const baseUrl = "http://localhost:5000"

class EditComponent extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        dataEmployee:{},
        FName: "",
        LName: "",
        Address:"",
        Org:"",
        Salary:"",
    }
  }

  componentDidMount(){
    let userId = this.props.match.params.ID;
    //http://localhost:5000/user/17
    const url = "http://localhost:5000/user/"+userId
    axios.get(url)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data[0]
        this.setState({
          dataEmployee:data,
          Id : data.ID,
          FName: data.FIRSTNAME,
          LName:data.LASTNAME,
          Address:data.ADDRESS,
          Org:data.ORGNAME,
          Salary:data.SALARY
        })
      }
      else {
        alert("Error web service")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })

  }

  render(){
    return (
        <div>
            <div class="form-row justify-content-center">
                <div class="form-group col-md-6">
                    <label for="firstname">FIRSTNAME </label>
                    <input type="text" class="form-control"  placeholder="Enter your FirstName" 
                    value={this.state.FName} onChange={(value)=> this.setState({FName:value.target.value})}/>
                </div>
                <div class="form-group col-md-6">
                    <label for="lastname">LASTNAME</label>
                    <input type="text" class="form-control"  placeholder="Enter your LastName" 
                    value={this.state.LName} onChange={(value)=> this.setState({LName:value.target.value})}/>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="address">ADDRESS</label>
                    <input type="address" class="form-control"  placeholder="Enter your Address" 
                    value={this.state.Address} onChange={(value)=> this.setState({Address:value.target.value})}/>
                </div>
                <div class="form-group col-md-6">
                    <label for="orgname">ORGNAME</label>
                    <input type="text" class="form-control"  placeholder="Organisation name" 
                    value={this.state.Org} onChange={(value)=> this.setState({Org:value.target.value})}/>
                </div>
            </div>
            <div class="form-group">
                <label for="salary">SALARY</label>
                <input type="number" class="form-control" id="salary" placeholder="salary in Rs." 
                value={this.state.Salary} onChange={(value)=> this.setState({Salary:value.target.value})}/>
            </div>
            <button type="submit" class="btn btn-primary" onClick={()=>this.Update()}>Update</button>
        </div>
        );
  }

  Update(){
    let userID = this.props.match.params.ID;

    const baseUrl = "http://localhost:5000/updateuser"
    const datapost = {
        "ID" : userID,  
        "FIRSTNAME" : this.state.FName,
        "LASTNAME" : this.state.LName,
        "ADDRESS" : this.state.Address,
        "ORGNAME": this.state.Org,
        "SALARY" : this.state.Salary,
    }

    axios.put(baseUrl,datapost)
    .then(response => {
      if (response.data.success) {
        alert("updated successfully!!")
      }
      else {
        alert("Error")
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })

  }


}


export default EditComponent;