import React, {Component} from "react";
import {Container, Row, Col} from "../../components/Grid/index";
import loginAPI from "../../utils/loginAPI";
import {Redirect} from "react-router-dom";
import "../Profile/style.css";
import UserSideBar from "../../components/UserSidebar/index"
import sideBarScript from "../../components/Sidebar/logic"
import LineGraph from "../../components/Graphs/LineGraph"

class Profile extends Component{

    state = {
        username: "",
        isAuthenicated: true,
        weekLabels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        weekData: [
            {
                label: "Likes",
                backgroundColor: "#CC000044",
                primaryColor: "#CC0000",
                data: [1, 2, 100, 4, 5, 6, 200]                
            },
            {
                label: "Retweets",
                backgroundColor: "#00FF0044",
                primaryColor: "#00FF00",
                data: [400, 6, 200, 4, 3, 2, 1]
            }
        ]

    }

    componentDidMount = () => {
        console.log(document.querySelector(".wrapper").offsetHeight)
        document.querySelector("body").style.height = document.querySelector(".wrapper").offsetHeight;
    
       sideBarScript.sideBarController()

        loginAPI.checkSession()
        .then((res)=> {
            if(!res.data){
                this.setState({isAuthenicated: false})
            }
            else{
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
            <div>
            <UserSideBar/>
            <Container>
                <div className = "profileContainer">
                    <Row >
                            <Col size = "xs-3" >
                                <img src="https://via.placeholder.com/100" alt="profile-pic"></img>
                            </Col>
                            <div className = "userInfo">
                                <Col size="xs-9">
                                    <Row>               
                                        <Col size = "xs-12">
                                            <h5>Welcome back, {this.state.username}</h5>
                                        </Col>
                                    </Row>
                                    <Row>               
                                        <Col size = "xs-12">
                                            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </div>
                    </Row>
                </div>
                <div className="widgetContainer">
                        <h5>Here is your weekly analysis of your likes and followers:</h5>

                    <Row>
                        <div className="widget tweets">
                            <Col size="xs-4" >
                                <span>XX</span> Retweets
                            </Col>
                        </div>
                        <div className="widget followers">
                            <Col size="xs-4">
                                <span>XX</span> Followers
                            </Col>
                        </div>         
                        <div className="widget likes">
                            <Col size="xs-4">
                                <span>XX</span> Favorites
                            </Col>
                        </div>          
                    </Row>
                </div>
                <div className="graphContainer">
                        <h4>Weekly Tweet Data Example</h4>
                            <LineGraph id="linegraph"
                            labels={this.state.weekLabels}
                            graphData={this.state.weekData} 
                            />
                </div>
            </Container>


            </div>

            
        )
    }
}

export default Profile
