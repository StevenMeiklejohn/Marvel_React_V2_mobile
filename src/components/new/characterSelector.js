import React from 'react';
import thanosGif from './../../images/thanos.gif';
import comicGif from './../../images/comicCrop.gif';
// import Request from './../../helpers/request'
const _ = require('lodash');
// const writeFileP = require("write-file-p");



class CharacterSelector extends React.Component{

  constructor(props){
  super(props);
  this.flattenCharactersObject = this.flattenCharactersObject.bind(this);
  this.contains = this.contains.bind(this);
  this.sorted_options = [];
  }

  flattenCharactersObject(object){
      let flattened = _.flattenDeep(object);
  }

  contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}



  render(){
    // console.log("Character Selector character props", this.props.characters);
    // if(this.props.characters.length < 10){
    if(this.props.characters.length < 2){
      return(
        <div className="holding">
          <img src={comicGif} />
        </div>
      )
    }
    let characters = this.props.characters;
    // console.log("Character props", this.props.characters);


// #############################################
// Use this code when fetching data from the API
// #############################################
    // this.flattenCharactersObject(characters);
    // let flatChars = [];
    // let orderedChars = [];
    // let ordered_options = [];
    // if(characters.length === 15){
    //   characters.forEach(function(element) {
    //     element.forEach(function(item){
    //         flatChars.push(item)
    //     })
    //   });
    //   orderedChars = _.sortBy(flatChars, [function(o) { return o.name; }]);
    //
    //   orderedChars.forEach(function(item){
    //     let itemForDb = {
    //       "marvelId": item.id,
    //       "name": item.name,
    //       "description": item.description,
    //       "modified": item.modified,
    //       "resourceURI": item.resourceURI
    //     }
    //     ordered_options.push(<option key={item.id} value={item.name}>{item.name}</option>)
    //   })
    //   this.sorted_options = ordered_options
    //   console.log("sorted options", this.sorted_options);
    // }
    // #####################################################
    // #####################################################


    // #########################################
    // Use this code if using data from db.
    // ########################################
    let flatChars = [];
    if(characters.length === 2){
      var characters1 = characters[0]._embedded.marvelCharacters
      for (var i = 0; i < characters1.length; i++) {
        var obj = characters1[i]
        flatChars.push(obj)
    }
    var characters2 = characters[1]._embedded.marvelCharacters
    for (var i = 0; i < characters2.length; i++) {
      var obj = characters2[i]
      if(this.contains(characters2, obj)){
        continue
      } else {
        flatChars.push(obj)
      }
  }

  console.log("Data acquisition complete", flatChars);
  flatChars.sort(function(a, b) {
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
  var orderedChars = flatChars;

      var ordered_options = [];
        orderedChars.forEach(function(item){
          ordered_options.push(<option key={item.id} value={item.name}>{item.name}</option>)
        })
        this.sorted_options = ordered_options
        // console.log("sorted options", this.sorted_options);
      }
      // ##############################################
      // ##############################################






      // ###########################################
      // Code used for testing data fetch from DB.
      // ###########################################

    // if(characters.length === 2){
    //   characters.forEach((element._embedded.marvelCharacters) => {
    //     console.log("element._embedded.marvelCharacters", element._embedded.marvelCharacters);
    //     console.log("First loop element._embedded.marvelCharacters", element._embedded.marvelCharacters);
    //     characters.forEach((element._embedded) =>{
    //       console.log("Second loop element ._embedded", element2._embedded);
    //       characters.forEach((element3) => {
    //       console.log("Third loop element ._embedded.marvelCharacters", element3._embedded.marvelCharacters);
    //       })
    //     })
    //   })
    // }

      // for(var characterObject in characters){
      //   console.log("characterObject", characterObject);
      //    for(var characterArray in characterObject){
      //      console.log("characterArray", characterArray);
      //         for(var character in characterArray){
      //           flatChars.push(character);
      //         }
      //     }
      // }
      // this.setState({characters: flatChars}, console.log("data formatting complete"));
    // }
    // ###############################################
    // ###############################################


    return(

      <div className="characterSelector">
        <h6>Select a Character</h6>
      <select className="select-css" onChange={this.props.onChange}>
      {this.sorted_options}
      </select>

      </div>
    )
  }
}

export default CharacterSelector
