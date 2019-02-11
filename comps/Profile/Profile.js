import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

import {connect} from "react-redux";
import {ChangePage} from "../../redux/actions.js";
import {ChangeDisplay} from "../../redux/actions.js";
import {ChangeNameToUser} from "../../redux/actions.js";
import {ChangeShowTips} from "../../redux/actions.js";

class Profile extends React.Component {

  state = {
    numTip: "Be aware of your surroundings!",
  }

  handleButton=(switchPageNum, switchDispNum)=>{
    this.props.dispatch(ChangePage(switchPageNum));
    this.props.dispatch(ChangeDisplay(switchDispNum));
  }

  handleTips=()=>{
    var x = Math.floor((Math.random() * 5) + 1)
    if(x == 1){
      this.setState({
        numTip: "Let others know where you are."
      })
    } else if(x == 2){
      this.setState({
        numTip: "Look confident when you walk."
      })
    } else if(x == 3){
      this.setState({
        numTip: "Walk in a group."
      })
    } else if(x == 4){
      this.setState({
        numTip: "Follow a well lit path."
      })
    } else if(x == 5){
      this.setState({
        numTip: "Look confident when you walk."
      })
    }

  }

  // <Image
  //   style={{width:100, height:100, borderRadius:50}}
  //   source={require('./assets/img/default.jpg')} />

  render() {

    var safetyTips = null;
    var yellowIcon = null;
    if(this.props.sTips){
      safetyTips = <View style={{height: 100, flexDirection: "row"}}>

          <Text style={{color: 'white', lineHeight: 50, fontSize: 18}}>{this.state.numTip}</Text>
        </View>;
      yellowIcon = <Image style={{marginLeft: -10, width: 18, height: 18, resizeMode: 'contain', opacity: 0.5}} source={require('./assets/img/info.png')} />;
    } else {
      safetyTips = null;
      yellowIcon = null;
    }

    return (
      <View style={styles.pcontainer}>

        <View
          style={{height:100, alignItems: "center"}}
          >
          <TouchableOpacity
            style={styles.destinations}
            onPress={this.handleButton.bind(this, 6, 6)}
            >
            {/*page 3 is the settings page*/}
            <Image style={{width: 80, height: 80}} source={require('./assets/img/dest1.png')} />
          </TouchableOpacity>
          <Text style={styles.destText}>Destinations</Text>
        </View>

        <View
          style={{flex:0, alignItems: 'center', flexDirection:"row"}}
          >
          <View
            style={{flex:1, alignItems: 'center'}}
            >
            <TouchableOpacity
              onPress={this.handleButton.bind(this, 6, 8)}
              >
              <Image style={{width: 90, height: 90, borderRadius: 50}} source={require('./assets/img/homeinfo.png')} />
            </TouchableOpacity>
            <Text style={styles.destText}>HomeInfo</Text>
          </View>

          <View
            style={{flex:0, width: 100, flexWrap: 'wrap', alignItems: 'center'}}
            >
            <View
              style={{flexDirection: 'row'}}
              >
              {yellowIcon}
              <TouchableOpacity
                onPress={this.handleTips}
                >
                <Text style={{color: 'white', fontSize: 24}}>Hello </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>{this.props.usersFullName}</Text>
            {/*^^we can decide later on how we are going to input the user's name into this text, like a function*/}
          </View>

          <View
            style={{flex:1, alignItems: 'center'}}
            >
            <TouchableOpacity
              onPress={this.handleButton.bind(this, 6, 7)}
              >
              {/*page 3 is the settings page*/}
              <Image style={{width: 90, height: 85, resizeMode: 'contain'}} source={require('./assets/img/settings.png')} />
            </TouchableOpacity>
            <Text style={styles.destText}>Settings</Text>
          </View>

         </View>

         {safetyTips}

        <View style={styles.logoutButton}>
          <TouchableOpacity
            style={{width: 120, height: 45, backgroundColor: '#33936F', alignItems: 'center'}}
            onPress={this.handleButton.bind(this, 1)}
            >
            <Text style={{color:'white', fontSize: 16, lineHeight: 50}}>LOG OUT</Text>
          </TouchableOpacity>
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  pcontainer: {
    flex: 1,
    backgroundColor: '#33936F',
    width: 425,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    alignItems: 'center',
    bottom: -130,
    //display: 'flex',
    //flexDirection: 'row',
    //height: 40,
    backgroundColor: "#ECF0F1",
    borderRadius: 50,
   // width: 10,
    //height: 10
  },
  name: {
    color: "#ECF0F1",
    top: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  pImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  destinations: {
    width: 80,
    height: 80,
    borderRadius: 80,
    justifyContent: 'center',
   // marginBottom: 5
  },
  destText: {
    color: "#ECF0F1",
    top: -5,
    fontSize: 16
  },
  homeSett: {
   flexDirection: 'row',
    //justifyContent: 'space-evenly',
    //alignContent: 'space-between',
   //alignItems: 'baseline',
   // alignItems: 'stretch',
   // flex: .5
  //display: 'flex',

  },
  homeInfo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    //justifyContent: 'flex-start',
    left: 5,


  },
  settings: {
    width: 90,
    height: 80,
    //justifyContent:'space-between',
   // alignItems: 'flex-start'
  },

});

function mapStateToProps(state){
  return {
    usersFullName:state.Fullname.userFullname,
    sTips:state.Page.showTips
  }
}

export default connect(mapStateToProps)(Profile);
