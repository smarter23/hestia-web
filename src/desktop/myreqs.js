import React from 'react';
import deletez from '../assets/delete.png';
import { Card, Row, Col } from 'antd';
import {withAlert} from "react-alert";
import Loader1 from '../loader'


class Myreqs extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Requests: [],
            loading: false

        }
    }

    deleterequest = (id) => {
        // console.log(id)
                postForm('https://akina.ayushpriya.tech/api/requests/item_requests/'+id+'/')
                    .then(data => {
                        // console.log(data)
                        this.props.alert.show("Item deleted")
                    })
                    .catch(error => console.error(error))

                    function postForm(url) {
                    

                    return fetch(url, {
                        method: 'DELETE', // or 'PUT'
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem("token")
                            }),
                        
                    })
                    .then(response => response.json())
                    }


        let newarr = this.state.Requests.filter( request =>{
            return request.id !==id
        })
        this.setState({
            Requests: newarr
        })


    }
    componentDidMount(){
        this.setState({
            loading: true
        })

        if(localStorage.getItem("token")){
        //  console.log("someone's logged in")
        }else{
            this.props.history.push("/login");
        }

        fetch('https://akina.ayushpriya.tech/api/requests/my_requests/', {
            headers: new Headers({
            'Authorization': localStorage.getItem("token")
            })
            })
            .then(res => res.json())
            .then(data => {
                //  console.log(data)
            this.setState({
                Requests: data.Request,
                loading: false
            });
            // console.log(this.state)
            })
            .catch(error => console.error(error))


     }

    render(){

        const {Requests} = this.state;
        const {loading} = this.state;
        const mssg = loading?(''):('No requests made by you');

        const reqlist = Requests.length ? (
            Requests.map(
                request =>{
                    if(request.description == null){
                        request.description = "NA"
                    }
                    return(
                        <Card key={request.id}>
                        <Row>
                            <Col span={17}>
                                <div className="feed-card-header">
                                    <span>
                                    <strong>{request.item_name}</strong>
                                    </span>
                                        <p>{request.quantity}</p>
                                        <p style={{width:"100%"}}><b>Description - </b>{request.description}</p>
                                </div>
                                <div className="feed-card-date">
                                        <p>{request.date_time_created.slice(0,10)}</p>
                                </div>
                            </Col>
                            <Col span={7} className="iconz">
                                <div className="imgback" onClick={()=>{this.deleterequest(request.id)}}>
                                    <img src={deletez} alt="location"></img>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                    )
                }
            )
        ) : (
            <div>{mssg}</div>
        )
            return(
            <div className="myreqs">
                <div className="main-title">    
                <Row>
                    <Col span={18}>
                        <h1>My Requests</h1>
                    </Col>
                </Row>
 
                </div>

                <div className="main-content">
                {loading && <Loader1 />}
                    {reqlist}
                </div>
                {/* <div className="addReq">
                        <img src={plus} alt="add req"></img>
                </div> */}
            </div>              
        );
        }
}
export default withAlert()(Myreqs);
