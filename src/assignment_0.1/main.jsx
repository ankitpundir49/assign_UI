import React,{Component} from "react";
import { Routes,Route} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText,faSquarePhone } from '@fortawesome/free-solid-svg-icons'
import auth from "./services/authService.js"; 
import Home from "./home";
import Login from "./login";
import Logout from "./logout";
import Navbar1 from "./navbar1.jsx";
import Users from "./users.jsx";
class MainView extends Component
{   
    render()
    {   const user=auth.getUser();
        return(
            <div className="container-fill m-0 p-0">
                <div className="row">
                    <div className="col-6"></div>
                    <div className="col-2 text-gray-400"><FontAwesomeIcon icon={faEnvelopeOpenText} /> info@universityinsights.in</div>
                    <div className="col-2 text-gray-400"><FontAwesomeIcon icon={faSquarePhone} /> +91 98182 59770</div>
                    <div className="col-2 text-gray-400"><FontAwesomeIcon icon={faSquarePhone} /> +91 88827 45479</div>
                </div>
                <Navbar1 user={user}/>
                <Routes>
                    <Route path="/home" element={<Home />}/>
                    <Route path="/admin/users"  element={<Users user={user}/>}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/logout" element={<Logout />}/>
                </Routes>
            </div>
        )
    }

}
export default MainView;
