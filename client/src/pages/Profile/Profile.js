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
            <div>
            <UserSideBar/>
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
                <div className="widgetContainer">
                        <h5>Here is your weekly analysis of your likes and followers:</h5>

                    <Row>
                        <div className="widget tweets">
                            <Col size="xs-4" >
                                <span>XX</span> Tweets
                            </Col>
                        </div>
                        <div className="widget followers">
                            <Col size="xs-4">
                                <span>XX</span> Followers
                            </Col>
                        </div>         
                        <div className="widget likes">
                            <Col size="xs-4">
                                <span>XX</span> Likes
                            </Col>
                        </div>          
                    </Row>
                </div>
                <div className="graphContainer">
                    <Row>
                        <Col size="xs-12">
                        <h4>Weekly Tweet Data Example</h4>
                            <LineGraph id="linegraph"
                            labels={this.state.weekLabels}
                            graphData={this.state.weekData} 
                            />
                        </Col>
                    </Row>
                </div>
                
                    
                    
            </Container>


            </div>

            
        )
    }
}

export default Profile
