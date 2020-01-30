import React from 'react';
import RecommendedView from './../components/recommendations/recommendedView'
import Request from './../helpers/request'

class RecommendationsContainer extends React.Component{

  constructor(props){
  super(props);
  this.state = {
    recommendations: null,
    switch: false
  }
  this.reload = this.reload.bind(this);
  }

  componentDidMount(){
    // console.log(this.props.user);
    const request = new Request();
    request.get("http://134.209.17.105:8080/api/recommendations").then((data) => {
      this.setState({recommendations: data._embedded.recommendations})
    })
  }

  reload(){
    console.log("Reload function called");
    // this.setState({switch: !this.state.switch});
    const request = new Request();
    request.get("http://134.209.17.105:8080/api/recommendations").then((data) => {
      this.setState({recommendations: data._embedded.recommendations})
    })
  }




  render(){

    if(!this.props.user){
      return(
        <div>
          <p>Please log in to view your recommendations.</p>
        </div>
      )
    }

    return(
      <div>
        <RecommendedView reload={this.reload} recommendations={this.state.recommendations} user={this.props.user}/>
      </div>
    )
  }
}

export default RecommendationsContainer
