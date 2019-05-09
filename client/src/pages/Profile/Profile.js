import React, {Component} from "react";
import {Container, Row, Col} from "../../components/Grid/index";
import loginAPI from "../../utils/loginAPI";
import {Redirect} from "react-router-dom";
import "../Profile/style.css";
import sideBarScript from "../../components/Sidebar/logic"

class Profile extends Component{

    state = {
        username: "",
        isAuthenicated: true,

    }

    componentDidMount = () => {
       sideBarScript.sideBarController()

        loginAPI.checkSession()
        .then((res)=> {
            if(!res.data){
                this.setState({isAuthenicated: false})
            }
            else{
                console.log(res.data)
                this.setState({username: res.data.username})
            }
        })
        .catch((err) => console.log(err))
    }



    render(){  

       

        if(!this.state.isAuthenicated){
            return <Redirect to="/login"/>
        }

        return(
            
            <Container>
                <div className = "profileContainer">
                    <Row >
                            <Col size = "xs-5" >
                                <img src="https://via.placeholder.com/100" alt="profile-pic"></img>
                            </Col>
                            <Col size = "xs-4">
                                <h5>Welcome back, {this.state.username}</h5>
                            </Col>
                    
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col size="xs-12">
                                <h5>Here is your weekly analysis of your likes and followers:</h5>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <div className="categories tweets">
                    <Col size="xs-4" >
                    <span>XX</span> Tweets
                    </Col>

                    </div>
                    <div className="categories tweets">
                    <Col size="xs-4" className="categories followers">
                    <span>XX</span> Followers
                    </Col>

                    </div>         
                    <div className="categories tweets">
                    <Col size="xs-4" className="categories likes">
                    <span>XX</span> Likes
                    </Col>
                    </div>          

     

                </Row>

                <Row>
                    <Col size="xs-12">
                    <div className="graphContainer">
                        <img src="https://via.placeholder.com/300X400" alt="profile-pic"></img>
                        <h5>Data goes here</h5>
                    </div>
                    </Col>
                </Row>
                    
                    
            </Container>
            
        )
    }
}

export default Profile
