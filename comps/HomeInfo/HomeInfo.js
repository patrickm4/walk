import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput, Image, ScrollView } from 'react-native';

import {connect} from "react-redux";
import {ChangePage} from "../../redux/actions.js";
import {DisplayUserHomeInfo} from "../../redux/actions.js";
import {ChangeUserCName} from "../../redux/actions.js";
import {ChangeUserCPhone} from "../../redux/actions.js";
import {ChangeUserCMsg} from "../../redux/actions.js";

class HomeInfo extends React.Component {

  qBool = false;
  showHomeInp = true;
  homeInpGone = false;
  showContactInp = true;

  state = {
    homeInfo: "",
    dHomeInfo: "",
    homeButton: "SAVE",
    displayContactName: "",
    displayContactMsg: "",
    displayContactPhone: 0,
    refreshScreen: 0,
  }

  componentWillMount=()=>{
    // add user info on load
    // FIX need to show inp when new user
    if(this.props.currentUserHomeInfo != "" || null){
      this.showHomeInp = false;
      this.qBool = true;
      this.homeInpGone = true;
      this.setState({
        homeButton: "CHANGE"
      })
    }
    if(this.props.usersCPhone != "" || null){
      this.showContactInp = false;
    } else {
      this.showContactInp = true;
    }
  }

  handleHomeAdd=(text)=>{

    this.setState({
      homeInfo: text
    })
  }

  showHomeAdd=async ()=>{
    // fix empty field after user wants to change address after initiall home address save
    if(this.qBool){
      this.showHomeInp = true;
      this.qBool = false;
      this.setState({
        homeButton: "SAVE",
      })
      this.homeInpGone = false;
    }
    if(this.state.homeInfo == "" || null){
      alert("Please fill in home address")
    } else {
      if(this.homeInpGone == false){

        var fd = new FormData();
        fd.append("userId", this.props.usersId);
        fd.append("homeInfo", this.state.homeInfo);

        var resp = await fetch("https://walk2.herokuapp.com/mysql/AddHomeInfo.php",{
          method:"POST",
          body:fd
        });
        var json = await resp.json();
        if(json){
          this.qBool = true;
          this.showHomeInp = false;
          this.setState({
            dHomeInfo: this.state.homeInfo,
            homeButton: "CHANGE"
          })
          this.homeInpGone = true;
          this.props.dispatch(DisplayUserHomeInfo(this.state.dHomeInfo));
          this.props.dispatch(ChangePage(2));
          alert("Home Address Changed");
        } else {
          alert("Home Information Not Changed");
        }
      } else {
        this.showHomeInp = true;
        this.qBool = false;
        this.setState({
          homeButton: "SAVE",
        });
        this.homeInpGone = false;
        }
      }
    }

  addContactName=(text)=>{
    this.setState({
      displayContactName: text
    });
  }
  addContactPhone=(num)=>{
    this.setState({
      displayContactPhone: num
    });
  }
  addContactMsg=(text)=>{
    this.setState({
      displayContactMsg: text
    });
  }

  checkRedux=()=>{
    console.log(this.props.usersCName, this.props.usersCPhone, this.props.usersCMsg);
  }

  handleContactAdd=async ()=>{
    //FIX complete an add user contacts in php file
    console.log("chck inp", this.showContactInp);
    if(this.showContactInp){
      if(this.state.displayContactName == "" || this.state.displayContactPhone == "" || this.state.displayContactMsg == ""){
        alert("Please fill in all the fields");
      } else {
        if(this.state.displayContactPhone.toString().length != 10){
          alert("Pleace enter a valid phone number with no spaces and only numbers");
        } else {
          var fd = new FormData();
          fd.append("userId", this.props.usersId);
          fd.append("uCname", this.state.displayContactName);
          fd.append("uCphone", this.state.displayContactPhone);
          fd.append("uCmsg", this.state.displayContactMsg);

          console.log("homeinfo chck state", this.props.usersId, this.state.displayContactName, this.state.displayContactPhone, this.state.displayContactMsg);
          var resp = await fetch("https://walk2.herokuapp.com/mysql/UpdateContactInfo.php",{
            method:"POST",
            body:fd
          });
          var json = await resp.json();
          console.log("Homeinfo chckjson", json)
          if(json){
            this.showContactInp = false;
            this.props.dispatch(ChangeUserCName(this.state.displayContactName));
            this.props.dispatch(ChangeUserCPhone(this.state.displayContactPhone));
            this.props.dispatch(ChangeUserCMsg(this.state.displayContactMsg));
            this.props.dispatch(ChangePage(2));
            alert("Contact Information Changed");
          } else {
            alert("Contact Information Not Changed");
            this.showContactInp = true;
            this.setState({
              refreshScreen: 1
            })
          }
        }
        this.showContactInp = false;
      }
    } else {
      this.showContactInp = true;
      this.setState({
        refreshScreen: 1
      })
    }
  }


  render() {

    var homeAdd = null;
    if(this.qBool == true){
      homeAdd = <Text>{this.props.currentUserHomeInfo}</Text>
    } else{
      homeAdd = null;
    }

    var homeInp = null;

    if(this.showHomeInp == false){
      homeInp = null;
    } else {
      homeInp = <TextInput
        placeholder="123 Main Street"
        style={{margin:15, alignSelf:'center', borderColor:'gray',borderWidth:1,width:150, height:40}}
        onChangeText={this.handleHomeAdd}
        >
      </TextInput>;
    }

    var cN = null;
    var cP = null;
    var cM = null;

    if(this.showContactInp){
      cN = <TextInput
        placeholder="Name"
        style={{margin:5,alignSelf:'center', borderColor:'gray', borderWidth:1,width:150, height:40}}
        onChangeText={this.addContactName}
        >
      </TextInput>;
      cP = <TextInput
        placeholder="Phone Number"
        style={{margin: 5,alignSelf:'center', borderColor:'gray', borderWidth:1,width:150, height:40}}
        keyboardType='phone-pad'
        onChangeText={this.addContactPhone}
        >
      </TextInput>;
      cM = <TextInput
        placeholder="Message to Send"
        style={{margin:5,alignSelf:'center', borderColor:'gray', borderWidth:1,width:150, height:40}}
        editable={true}
        maxLength={100}
        onChangeText={this.addContactMsg}
        >
      </TextInput>;
    } else {
      cN = <Text>{this.props.usersCName}</Text>;
      cP = <Text>{this.props.usersCPhone}</Text>;
      cM = <Text>{this.props.usersCMsg}</Text>;
    }

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          >
        <View style={{alignItems:'center'}}>
        <Text style={{fontSize:25, flex:0, height:50}}>Home Information</Text>

        <Text>Home Address:</Text>
        {homeAdd}

        {homeInp}

      <View style={styles.butView}>
        <TouchableOpacity
          style={styles.butBox}
          onPress={this.showHomeAdd}
          >
        <Text style={{color:'white',lineHeight: 30, alignSelf:'center'}}>{this.state.homeButton}</Text>
        {/* When clicking "SAVE", user's home address will appear inside the text input......same with emergency contact*/}
        </TouchableOpacity>
      </View>

      <Text style={{margin:15}}>Emergency Contact Information:</Text>

      {cN}
      {cP}
      {cM}

      <View style={styles.butView}>
        <TouchableOpacity
          style={styles.butBox2}
          onPress={this.handleContactAdd}
          >
          <Image style={{width: 50, height: 50}} source={require('./assets/img/add.png')} />
        </TouchableOpacity>
      </View>


          </View>
          </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  butView: {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'center',
    margin: 15
  },
  butBox: {
    backgroundColor: '#013b36',
    alignItems: 'center',
    width: 80,
    height: 30,
    borderRadius: 50,
  },
  butBox2: {
    //backgroundColor: '#013b36',
    alignItems: 'center',
    //width: 80,
   // height: 30,
   // borderRadius: 50,
  }


});


function mapStateToProps(state){
  return {
    usersId:state.Fullname.currentUserId,
    currentUserHomeInfo:state.Fullname.currentUserHomeInfo,
    usersCPhone:state.Fullname.currentUserCphone,
    usersCName:state.Fullname.currentUserCname,
    usersCMsg:state.Fullname.currentCmsg
  }
}

export default connect(mapStateToProps)(HomeInfo);
