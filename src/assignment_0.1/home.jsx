import React,{Component} from "react"; 
import http from "./services/httpService";
import ProgressBar from "./progressBar";

class Home extends Component
{   state={
    applicationstatus:["registration","profileEveluation","programShortlisting","offerLetter","initiation","profileCompletion","assistance","visaPrepration","visaApproval","arrivalAndSettlement","prepareToFly"],
    user:[]
        }; 
    async fetchData()
        {   let response=await http.get(`/user`);
            let {data}=response;
            console.log(data)
            this.setState({user:data[0]})
        };
    componentDidMount()
        {   this.fetchData();
        }
    componentDidUpdate(prevProps,prevState)
        {   if(prevProps!==this.props) this.fetchData();
        }     
    render(){
        let {user,applicationstatus}=this.state;
        return(
            <div className="container-fill border-red-100">
                <div className="row">
                    <div className="col-2 ">
                    </div>
                    <div className="col-2 border-l p-4">
                        <img className="rounded" src="data:image/png;base64,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"></img>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-4">Name</div>
                            <div className="col-8">{user.name}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Email</div>
                            <div className="col-8">{user.email}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Mobile</div>
                            <div className="col-8">{user.mobile}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">D.O.B.</div>
                            <div className="col-8">{user.dob}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Address</div>
                            <div className="col-8">{user.address2+" "+user.address1}</div>
                        </div>
                        <br/><br/>
                        {user.applicationstatus?
                        <React.Fragment>
                            <div className="row">
                                <div className="col-12">Application Status</div>
                            </div>
                            <br/>
                            <div className="row border">
                                <div className="col-12">
                                    <ProgressBar applicationStatus={applicationstatus} currentStatus={user.applicationstatus}/>
                                </div>
                            </div>
                        </React.Fragment>
                        :""}
                    </div>
                </div>
            </div>
        )
    }

}

export default Home;
