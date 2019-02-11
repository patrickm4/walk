import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import proj4 from 'proj4';

import {connect} from "react-redux";
import {ChangePage} from "../../redux/actions.js";
import {ChangeNameToUser} from "../../redux/actions.js";
import {ChangeCurrentId} from "../../redux/actions.js";
import {DisplayUserHomeInfo} from "../../redux/actions.js";
import {ChangeShowTips} from "../../redux/actions.js";
import {ChangeUserCName} from "../../redux/actions.js";
import {ChangeUserCPhone} from "../../redux/actions.js";
import {ChangeUserCMsg} from "../../redux/actions.js";

class Login extends React.Component {

  email="";
  password="";


  state = {
    users:[],
    dlatlng:"",
    x: 491104.5,
    y: 5456842.89,
    zone:10,
    zoneL:'U',
    loadAnimating:false,
  }

  handleEmail=(text)=>{
    console.log("email", text);
    this.email = text;
  }

  handlePass=(text)=>{
    this.password = text;
  }

  handleSelect=async ()=>{
    if(this.email == "" || this.password == ""){
      alert('Please fill out all fields')
    }
    else {
      this.setState({
        loadAnimating: true
      });
      var fd = new FormData();
      console.log("handleSelectStart", this.state.loadAnimating);
      fd.append("email", this.email);
      fd.append("password", this.password);

      var resp = await fetch("https://walk2.herokuapp.com/mysql/selectuser.php",{
        method:"POST",
        body:fd
      })


      var json = await resp.json();
      if(json.length == 0 || "" || null){
        console.log("ifistrue");
        this.setState({
          loadAnimating: false
        });
        alert("Incorrect email or password");
      }
      else {
        console.log("ifisfalse");
        this.setState({
          loadAnimating: false
        });
        this.props.dispatch(ChangeNameToUser(json[0].full_name));
        this.props.dispatch(ChangeCurrentId(json[0].id));
        if(json[0].address != null){
          this.props.dispatch(DisplayUserHomeInfo(json[0].address));
        }
        if(json[0].contactname != null){
          this.props.dispatch(ChangeUserCName(json[0].contactname));
        } else {
          this.props.dispatch(ChangeUserCName(""));
        }
        if(json[0].contactmsg != null){
          this.props.dispatch(ChangeUserCMsg(json[0].contactmsg));
        } else {
          this.props.dispatch(ChangeUserCMsg(""));
        }
        if(json[0].contactphone != null){
          this.props.dispatch(ChangeUserCPhone(json[0].contactphone));
        } else {
          this.props.dispatch(ChangeUserCPhone(""));
        }
        if(json[0].tipsetting != null){
          if(json[0].tipsetting == 1){
            this.props.dispatch(ChangeShowTips(true));
          } else if(json[0].tipsetting == 0){
            this.props.dispatch(ChangeShowTips(false));
          }
        }
        this.props.dispatch(ChangePage(2));
      }
      console.log("handleSelectEND");
    }
  }

  handlePage=()=>{
    this.props.dispatch(ChangePage(2));
  }


    handlePage=()=>{
      this.props.dispatch(ChangePage(2));
    }

    handleSignUp=()=>{
      this.props.dispatch(ChangePage(5));
    }

  render() {

    if(this.state.loadAnimating){
      return(
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          />
      );
    }

    var users = this.state.users.map((obj, i)=>{
      return(
        <View key={i} style={{flexDirection:"row"}}>
        <Text>{obj.email}</Text>
        <Text>{obj.password}</Text>
        </View>
      )
    })

    return (
      <View style={styles.container}>
        <ScrollView
          style={{flex:2}}
          showsVerticalScrollIndicator={false}
          >

        <View style={{flex:2, alignItems: 'center', marginTop: '20%'}}>
          <Image
            style={{width:200, height:200}}
            source={require("./img/logo.png")}
            />
        </View>
        <View style={{flex:1, alignItems: 'center'}}>
          <Text
            style={[styles.walkRed, {padding: 20, marginBottom: 30, fontSize:50}]}
            >WALK</Text>
        </View>
        <View style={{flex:2}}>
          <View style={styles.textInputBox}>
            <TextInput
              placeholder="Email"
              style={{height: 40, width: 250, borderColor: 'gray', borderWidth: 1}}
              underlineColorAndroid='transparent'
              autoCapitalize="none"
              onChangeText={this.handleEmail}
              />
          </View>
          <View style={styles.textInputBox}>
            <TextInput
              placeholder="Password"
              style={{height: 40, width: 250, borderColor: 'gray', borderWidth: 1}}
              underlineColorAndroid='transparent'
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={this.handlePass}
              />
          </View>
        </View>


      <View style={{flex:2, alignItems: 'center', justifyContent: "space-between"}}>
      <View style={styles.butView}>
        <TouchableOpacity
          style={styles.butBox}
          onPress={this.handleSelect}
          >
          <Text
            style={[styles.textContainer, {color:'white',}]}
            >
            LOGIN</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{flex:2, marginTop:15}}
        >
        <View
            style={{flexDirection: "row"}}
            >
            <Text>Dont have an account?</Text>
            <TouchableOpacity
              onPress={this.handleSignUp}
              >
              <Text

                >Sign up</Text>
            </TouchableOpacity>
          </View>
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
  },

  bottomStick :{
    //flex:1,
    justifyContent: 'space-between'
  },

  butBox: {
    backgroundColor: '#013b36',
    alignItems: 'center',
    width: 125,
    height: 50,
    borderRadius: 50
  },

  butView: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center'
  },

  walkRed: {
    color: '#DB504A'
  },

  textInputBox: {
    padding: 10
  },

  textContainer: {
    lineHeight: 50,
  },

  indicator: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
});

function mapStateToProps(state){
  return {
    usersCPhone:state.Fullname.currentUserCphone,
    usersCName:state.Fullname.currentUserCname,
    usersId:state.Fullname.currentUserId
  }
}

export default connect(mapStateToProps)(Login);
