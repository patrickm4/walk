import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';

import Profile from "./Profile/Profile";
import Settings from "./Settings/Settings";
import Destination from './Destination/Destination';
import HomeInfo from './HomeInfo/HomeInfo';
import Password_Profile_Settings from './Password_Profile_Settings/Password_Profile_Settings';
import Email_Profile_Settings from './Email_Profile_Settings/Email_Profile_Settings';


import {connect} from "react-redux";
import {ChangePage} from "../redux/actions.js";
import {ChangeDisplay} from "../redux/actions.js";


class Central extends React.Component {

  state ={
    settbgColor: "#fff",
    settfontColor: "#000",
    destbgColor: "#fff",
    destfontColor: "#000",
  }

  componentWillMount=()=>{
    if(this.props.cDisp == 6){
      this.setState({
        destbgColor: "#013B36",
        destfontColor: "#fff",
      })
    } else if(this.props.cDisp == 7){
      this.setState({
        settbgColor: "#013B36",
        settfontColor:"#fff",
      })
    }
  }

  handleButton=(page)=>{
    this.props.dispatch(ChangePage(page));
  }

  handleDisplay=(n)=>{
    this.props.dispatch(ChangeDisplay(n));
    if(n == 6){
      this.setState({
        destbgColor: "#013B36",
        destfontColor: "#fff",
        settbgColor: "#fff",
        settfontColor:"#000",
      })
    } else if(n == 7){
      this.setState({
        settbgColor: "#013B36",
        settfontColor:"#fff",
        destbgColor: "#fff",
        destfontColor: "#000",
      })
    }
  }



  render() {

    var curDisplay = null;

    switch (this.props.cDisp){
      case 7:
      curDisplay = <Settings/>
        break;
      case 6:
      curDisplay = <Destination/>
          break;
      case 8:
      curDisplay = <HomeInfo />
        break;
      case 9:
      curDisplay = <Password_Profile_Settings />
        break;
      case 10:
      curDisplay = <Email_Profile_Settings />
        break;
    }

    return (
      <View style={styles.container}>
        {/* TOP BAR  */}

          <View style={{marginTop: 10, height: 100, width: '95%', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff',}}>

            <View style={{height: 100, alignItems:'center'}}>
              <TouchableOpacity
                onPress={this.handleButton.bind(this, 2)}
                >
                <Image style={styles.profileIcon} source={require('./Settings/assets/img/profile.png')}/>
              </TouchableOpacity>
                <Text style={styles.pCaption}>Profile</Text>
            </View>

            <View style={{height: 100, alignItems:'center', borderRadius:50, backgroundColor: "#fff"}}>
              <TouchableOpacity
                onPress={this.handleDisplay.bind(this, 6)}
                >
                <Image style={styles.destIcon} source={require('./Settings/assets/img/dest1.png')}/>
              </TouchableOpacity>
              <Text style={{borderRadius: 10, backgroundColor: this.state.destbgColor, paddingLeft: 5, paddingRight: 5}}><Text style={{color: this.state.destfontColor}}>Destinations</Text></Text>
            </View>

            <View style={{height: 100, alignItems:'center'}}>
              <TouchableOpacity
                onPress={this.handleDisplay.bind(this, 7)}
                >
                <Image style={styles.settIcon} source={require('./Settings/assets/img/settings.png')}/>
              </TouchableOpacity>
              <Text style={{borderRadius: 10, backgroundColor: this.state.settbgColor, paddingLeft: 5, paddingRight: 5}}><Text style={{color: this.state.settfontColor}}>Settings</Text></Text>
            </View>

          </View>
          {curDisplay}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: "#fff",
    zIndex: 55,
  },
  profileIcon: {
    width: 65,
    height: 65,
    padding:10
  },
  pCaption: {

  },
  destIcon: {
    width: 65,
    height: 65,
    padding:10,
  },
  dCaption: {

  },
  settIcon:  {
      width: 68,
      height: 65,
      padding:10,
      resizeMode: 'contain',
  },
  sCaption: {

  },
});

function mapStateToProps(state){
  return {
    page:state.Page.page,
    cDisp:state.Page.centralPage
  }
}

export default connect(mapStateToProps)(Central);
