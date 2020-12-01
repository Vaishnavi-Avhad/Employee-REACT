import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';


class EditComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          FName: "",
          LName: "",
          Address:"",
          Org:"",
          Salary:"",
          Id:0
        }
      }
/*
    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }
    onSubmit = (e) => {
        e.preventDefault();
        const {FName,LName,Address,Org, Salary} = this.state;
        axios.post('http://localhost:5000/adduser',{FName,LName,Address,Org, Salary})
            .then((result)=>{
                if (result.data.success===true) {
                    alert(result.data.message)
                  }
                  else {
                    alert(result.data.message)
                  }
                }).catch(error=>{
                  alert("Error 34 "+error)
            });

    }
    
    render(){
        const {FName,LName,Address,Org, Salary} = this.state;
        return(
            <form onSubmit={this.onSubmit}>
                <input type= "text" name="FName" value= {FName} onChange={this.onChange}/>
                <input type= "text" name="LName" value= {LName} onChange={this.onChange}/>
                <input type= "text" name="Address" value= {Address} onChange={this.onChange}/>
                <input type= "text" name="Org" value= {Org} onChange={this.onChange}/>
                <input type= "text" name="Salary" value= {Salary} onChange={this.onChange}/>
                <button type="submit" >Submit</button>
            </form>
        );
    }
 */
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
            <button type="submit" class="btn btn-primary" onClick={()=>this.Save()}>Save</button>
        </div>
        );
    }    
    Save(){

       if (this.state.FName==="") {
          alert("Please enter first name");
        }
        else if (this.state.LName==="") {
           alert("please enter last name");
        }
        else if (this.state.Address==="") {
           alert("please enter address");
        }
        else if (this.state.Org==="") {
           alert("please enter org name");
        }
        else if (this.state.Salary==="") {
           alert("please enter salary");
        }
        else {
     
          const baseUrl = "http://localhost:5000/adduser"
     
          const datapost = {

            "ID" : 0 ,  
            "FIRSTNAME" : this.state.FName,
            "LASTNAME" : this.state.LName,
            "ADDRESS" : this.state.Address,
            "ORGNAME": this.state.Org,
            "SALARY" : this.state.Salary,
              
          }
          axios.post(baseUrl,datapost)
          .then(response=>{
            if (response.data.success===true) {
              alert("user added successfully!!!");
            }
            else {
              alert(response.data.message);
            }
          }).catch(error=>{
            alert("Error 34 "+error);
          })
     
       }
     
      }
    

}
export default EditComponent;