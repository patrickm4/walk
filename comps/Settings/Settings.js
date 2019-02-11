import React from 'react';
import { StyleSheet, Text, View, Image, Switch, Button, TouchableOpacity, ScrollView} from 'react-native';
//import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {connect} from "react-redux";
import {ChangePage} from "../../redux/actions.js";
import {ChangeDisplay} from "../../redux/actions.js";
import {ChangeShowTips} from "../../redux/actions.js";

class Settings extends React.Component {

  handleChangePass=()=>{
    this.props.dispatch(ChangeDisplay(9));
  }

  handleChangeEmail=()=>{
    this.props.dispatch(ChangeDisplay(10));
  }

  handleTipSwitch=(b)=>{
    if(b){
      this.props.dispatch(ChangeShowTips(false));
      this.changeTips(0);
    } else {
      this.props.dispatch(ChangeShowTips(true))
      this.changeTips(1);
    }
  }

  async changeTips(num){
    var fd = new FormData();
    fd.append("userId", this.props.usersId);
    fd.append("SafetyTipBool", num);
    var resp = await fetch("https://walk2.herokuapp.com/mysql/ChangeCurrentUserTipSetting.php",{
      method:"POST",
      body:fd
    });
    var json = await resp.json();
    if(json){
      console.log("Setting Changetip Success")
    } else {
      console.log("Setting ChangeTip Fail")
    }
  }

  //
  //
  //   {/*MAP SETTINGS*/}
  //    <View style={{flex:0,alignSelf:'flex-start'}}>
  //      <Text style={styles.mapHeader}>Map Settings</Text>
  //    </View>
  //
  //    <View style={styles.subHead}>
  //      <View style={{flex:0,alignItems:'flex-start',flexDirection:'row'}}>
  //        <Text style={styles.DAbody}>Show Nearby Crimes</Text>
  //      </View>
  //      <View style={{flex:0, alignSelf:'flex-start'}}>
  //        <Switch/>
  //      </View>
  //    </View>
  //
  //    <View style={styles.subHead}>
  //      <View style={{flex:0,alignItems:'flex-start',flexDirection:'row'}}>
  //        <Text style={styles.NBEbody}>Show Nearby Events</Text>
  //      </View>
  //      <View style={{flex:0, alignSelf:'flex-start'}}>
  //        <Switch/>
  //      </View>
  //    </View>
  //
  //    <View style={styles.subHead}>
  //      <View style={{flex:0,alignItems:'flex-start',flexDirection:'row'}}>
  //        <Text style={styles.STbody}>Allow Safety Tips</Text>
  //      </View>
  //      <View style={{flex:0, alignSelf:'flex-start'}}>
  //        <Switch/>
  //      </View>
  //    </View>

  render() {

    var sBool = this.props.shTips;

    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        >


        {/* GENERAL  */}
           <View style={{flex:0,alignSelf:'flex-start'}}>
             <Text style={styles.genHeader}>General Settings</Text>
           </View>

           <View style={styles.subHead}>
             <View style={{flex:0,alignItems:'flex-start',flexDirection:'row'}}>
               <Text style={{fontSize:16}}>Show Safety Tips</Text>
             </View>

             <View style={{flex:0, alignSelf:'flex-start'}}>
               <Switch
                 value={sBool}
                 onValueChange={this.handleTipSwitch.bind(this, sBool)}
                 />
             </View>
           </View>

        {/*PROFILE SETTINGS*/}
        <Text style={styles.profileHeader}>Profile Settings</Text>

        <View style={{flex:1, alignItems:'flex-start'}}>
          <View style={{height:40}}>
            <TouchableOpacity
              onPress={this.handleChangePass}
              ><Text style={{color:'#99ccff'}}>Change Password</Text></TouchableOpacity>
          </View>
          <View style={{height:40}}>
            <TouchableOpacity
                onPress={this.handleChangeEmail}
                ><Text style={{color:'#99ccff'}}>Change Email</Text></TouchableOpacity>
          </View>
        </View>
      </ScrollView>



    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    width: '95%',
    backgroundColor: '#fff',
   flexWrap: 'wrap',
   },
   subHead: {
     height:60,
     flexDirection:"row",
     width:'82%',
     justifyContent: 'space-between'
   },
genHeader: {
    fontSize: 25,
    //height: -10

},

locationBody: {
    fontSize: 16,

},

mapHeader: {

    fontSize: 25,

},
DAbody: {

    fontSize: 16
},

NBEbody: {
    fontSize: 16
},

STbody: {

    fontSize: 16
},

Checkbody:{
    fontSize: 16,

},

profileHeader: {
    fontSize: 25,

}


});

function mapStateToProps(state){
  return {
    usersId:state.Fullname.currentUserId,
    shTips:state.Page.showTips
  }
}

export default connect(mapStateToProps)(Settings);
