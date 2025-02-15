
import React,{Component} from "react";
import http from "./services/httpService.js";
import auth from "./services/authService.js";
class Login extends Component
{   state=
    {   user:{email:"",password:""},
    }
    handleChange=(e)=>
    {   const {currentTarget:input}=e;
        let s1={...this.state};
        s1.user[input.name]=input.value;
        this.setState(s1);
    }
    async postData(url,obj)
    {   try{   
            let response=await http.post(url,obj);
            console.log(response)
            auth.login({token:response.data.token,user:response.data.user});
            window.location="/home";
        }
        catch(ex){
            if(ex.response && ex.response.status===400)
            {   let errors={};
                errors.email=ex.response.data;
                this.setState({errors:errors})
            }
        }
        
    }

    handleSubmit=(e)=>
    {   e.preventDefault();
        const {user}=this.state;
        console.log(user);
        this.postData(`/login`,user);
    }

    render()
    {   let{email,password}=this.state.user;
        let{errors=null}=this.state;
        return(
            <div className="container">
                <h1 className="text-center">Welcome to University Insight</h1>
                <div className="container bg-light">
                        <h1 className="text-center">Login</h1>
                        <div className="row">
                            <div className="col-4 text-end">UserName:</div>
                            <div className="col-8">
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={email}
                                    placeholder="Enter Username"
                                    onChange={this.handleChange}
                                    />
                                    {errors && errors.name && <span className="text-danger">{errors.email}</span>}
                                </div>
                            </div>
                        </div><br/>
                        <div className="row">
                            <div className="col-4 text-end">Password:</div>
                            <div className="col-8">
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <br/>
                        <h1 className="text-center mt-1"><button className="btn jobBtn border" onClick={this.handleSubmit}>Login</button></h1>
                </div>
            </div>
        )

    }

}export default Login;
