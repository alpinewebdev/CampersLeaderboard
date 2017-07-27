import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import DOMPurify from 'dompurify'
import './index.css';


class Leaderboard extends React.Component{

    constructor(){
        super();

        this.state = {
        }  

        this.getTop();
    }
    

    resolveUsers(){
        return new Promise(function(resolve, reject){
            fetch("https://fcctop100.herokuapp.com/api/fccusers/top/alltime").then((value) => value.json()).then((value) => resolve(value))});
    };

    getTop(){

        const getData = async () => {this.setState({objectUsers : await this.resolveUsers()})
                                     return 'done'}
        getData();

    }

    reorderUsersAllTime(){
        this.setState({objectUsers : this.state.objectUsers.sort(function(a, b){return b.alltime - a.alltime})});
    }
    reorderUsersRecent(){
         this.setState({objectUsers : this.state.objectUsers.sort(function(a, b){return b.recent - a.recent})});
    }
   

    render(){
            return(
                <div>
                    <div className="header container-fluid d-flex justify-content-center align-items-center"><h3>Check out these valuable contributors to awesome freeCodeCamp!</h3></div>
                    <div className="table container">
                        <div className="row">
                            <div className="col-1 d-flex justify-content-center"> <b>#</b> </div>
                            <div className="col-4 d-flex justify-content-center"> <b>Camper Name</b> </div>
                            <div className="col-3 d-flex justify-content-center" id="reorderButtonUsersRecent" onClick={this.reorderUsersRecent.bind(this)}> <b>Points in past 30 days</b> </div>
                            <div className="col-4 d-flex justify-content-center" id="reorderButtonUsersAllTime" onClick={this.reorderUsersAllTime.bind(this)}> <b>All time points</b> </div>
                        </div>
                        <Table value={this.state.objectUsers} />
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