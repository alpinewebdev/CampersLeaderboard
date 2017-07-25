import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import DOMPurify from 'dompurify'

import './index.css';


class Leaderboard extends React.Component{

    constructor(){
        super();

        this.state = {
            objectMonth : {},
            numbers : [],
            names : [],
            pointsMonth : [],
            pointsAllTime : []
        }  

        this.getTopAllTime();
        this.getTopMonth();
    }
    

    resolveUsersMonth(){
        return new Promise(function(resolve, reject){
            fetch("https://fcctop100.herokuapp.com/api/fccusers/top/recent").then((value) => value.json()).then(function(value){resolve(value);});
        });
    };

    getTopMonth(){
        
        this.state.objectMonth = this.resolveUsersMonth().then(function(value){
                                                        return value;
                                                      });
    }

    resolveUsersAllTime(){
        return new Promise(function(resolve, reject){
            fetch("https://fcctop100.herokuapp.com/api/fccusers/top/alltime").then((value) => value.json()).then((value) => resolve(value))});
    };

    getTopAllTime(){

        const getData = async () => {this.setState({objectAllTime : await this.resolveUsersAllTime()})
                                     return 'done'}
        //const setData = () => this.setState({objectAllTime : getData()});  
        getData();

    }

   

    render(){
            return(
                <div>
                    <div className="header container-fluid d-flex justify-content-center align-items-center"><h3>Check out these valuable contributors to awesome freeCodeCamp!</h3></div>
                    <div className="table container">
                        <div className="row">
                            <div className="col-1 d-flex justify-content-center"> <b>#</b> </div>
                            <div className="col-4 d-flex justify-content-center"> <b>Camper Name</b> </div>
                            <div className="col-3 d-flex justify-content-center"> <b>Points in past 30 days</b> </div>
                            <div className="col-4 d-flex justify-content-center"> <b>All time points</b> </div>
                        </div>
                        <Table value={this.state.objectAllTime} />
                    </div>
                </div>
            );
    }
}

function Table(props){
    var renderString = "";
    function createHTML(){
        return {__html: renderString}
    }
    if(props.value !== undefined){   
        props.value.forEach(function(element, index) {
                    renderString += "<div class='row'><div class='col-1 d-flex justify-content-center'>" +  (index + 1) + "</div><div class='col-4 d-flex justify-content-center'>" + element.username + "</div><div class='col-3 d-flex justify-content-center'>" + element.recent + "</div><div class='col-4 d-flex justify-content-center'>" + element.alltime + "</div></div>";
                });
        renderString = DOMPurify.sanitize(renderString);
        console.log(DOMPurify.removed);
        
        return(
            <div dangerouslySetInnerHTML={createHTML()}></div>
        );
    } 
    else{
        return(
            <div className="row">
                            <div className="col-1 d-flex justify-content-center"> 1 </div>
                            <div className="col-4 d-flex justify-content-center"> Waiting for Campers... </div>
                            <div className="col-3 d-flex justify-content-center"> Waiting for points... </div>
                            <div className="col-4 d-flex justify-content-center"> Waiting for points... </div>
            </div>
        );
    }
   
}

class Webpage extends React.Component{

    render(){
        return (
            <div className="webpage">
                    <Leaderboard />
            </div>
        );
    }
}

ReactDOM.render(
    <Webpage />,
    document.getElementById('root')
);