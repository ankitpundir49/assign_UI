
import React,{Component}from"react";
import http from "./services/httpService.js";
import auth from "./services/authService.js";
class Users extends Component
{   state={ data:[],
    user:{},
    updateUser:"",
    userIndex:"",
    edit:false,
    applicationstatus:["registration","profileEveluation","programShortlisting","offerLetter","initiation","profileCompletion","assistance","visaPrepration","visaApproval","arrivalAndSettlement","prepareToFly"],
        };
    async fetchData()
    {   let response=await http.get(`/users`);
        let {data}=response;
        this.setState({data:data,user:auth.getUser()
        });

    }
    componentDidMount()
    {   this.fetchData();
    }
    componentDidUpdate(prevProps,prevState)
    {   if(prevProps!==this.props) this.fetchData();
    }
     
    handleEdit=(index)=>{
        let s1={...this.state};
        s1.edit=true;
        s1.userIndex=index;
        this.setState(s1);
}   
    handleChange=(e)=>
    {   const {currentTarget:input}=e;
        console.log(e.target.index,input.index)
        let s1={...this.state};
        s1.updateUser=input.value;
        console.log(s1.updateUser )
        this.setState(s1);
    }
    async putData(url,obj)
    {   let response=await http.put(url,obj);
        window.alert("Details Successfully added");
        window.location="/admin/users";
        
    }
    handleSubmit=(updateUser,email)=>
        {   
            let s1={...this.state};
            let user=s1.data.find((st)=>{
                return st.email===email
            })
            user.applicationstatus=updateUser;
            s1.edit=false;
            this.setState(s1);
            this.putData(`/updateUser`,user);
        }
    makeDrop=(arr,value,name,lable,index)=>
        (  <div className="row roundes">
               <select 
               className="form-control"
               name={name+index}
               value={value}
               onChange={this.handleChange}
               >
                   <option value="">{lable}</option>
                   {arr.map((opt,index)=>(
                       <option onClick={()=>this.handleClick(index)}>{opt}</option>
                   ))}
               </select>
           </div>
       )
    render(){
        let {data,edit,user,userIndex,updateUser,applicationstatus}=this.state;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-1 border">S No.</div>
                    <div className="col-1 border">Name</div>
                    <div className="col-1 border">Mobile</div>
                    <div className="col-2 border">Email</div>
                    <div className="col-2 border">Address</div>
                    <div className="col-1 border">Date Of Birth</div>
                    {user.role==="admin"?
                        <div className="col-3 border">Application Status</div>
                    :""}
                    
                </div>
                {data.map((st,index)=>(
                <div className="row" key={index}>
                    <div className="col-1 border">{index}</div>
                    <div className="col-1 border">{st.name}</div>
                    <div className="col-1 border">{st.mobile}</div>
                    <div className="col-2 border">{st.email}</div>
                    <div className="col-2 border">{st.address1+" "+st.address2}</div> 
                    <div className="col-1 border">{st.dob}</div> 
                    {user.role==="admin"?
                        <div className="col-3 border">
                            <div className="row">
                                <div className="col-5">{st.applicationstatus}</div>
                                <div className="col-7">
                                    {index===userIndex&&edit===true?
                                            <div className="row">
                                                <div className="col-6">
                                                    {this.makeDrop(applicationstatus,updateUser,"applicationstatus","Selet Status")}
                                                </div>
                                                <div className="col-6">
                                                    <button className="btn border" onClick={()=>this.handleSubmit(updateUser,st.email)}>Submit</button>
                                                </div>
                                            </div>
                                            
                                        :
                                        <button onClick={()=>this.handleEdit(index)}>Edit</button>
                                        }
                                </div>
                            </div>
                            
                        </div>
                    :""}  
                </div>)) 
                } 
                
            </div>
        )
    }
}
export default Users;
