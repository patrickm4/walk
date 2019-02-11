import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput } from 'react-native';

import {connect} from "react-redux";
import {ChangePage} from "../../redux/actions.js";

class Password_Profile_Settings extends React.Component {

  pass=null;
  cPass=null;

  handlePass=(text)=>{
    this.pass = text;
  }

  handleConfirmPass=(text)=>{
    this.cPass = text;
  }

  handleChangePass=async ()=>{
    if(this.pass == null || this.pass == "" || this.cPass == null || this.cPass == "" ){
      alert("Please fill in the fields")
    } else if(this.pass === this.cPass){
    var fd = new FormData();
    fd.append("userId", this.props.usersId);
    fd.append("userPass", this.pass);

    var resp = await fetch("https://walk2.herokuapp.com/mysql/changePass.php",{
      method:"POST",
      body:fd
    });
    var json = await resp.json();
    if(json){
      alert("Password change success");
      this.props.dispatch(ChangePage(2));
    }
    else{
      alert("Password change did not go through. Please try again.")
      this.props.dispatch(ChangePage(2));
    }
  } else {
    alert("Passwords do not match");
  }

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems:'center'}}>
        <Text style={{fontSize:25, flex:0, height:50}}>Profile Settings</Text>

        <Text>New Password:</Text>

      <TextInput
        style={{margin:15, alignSelf:'center', color:'gray', borderColor:'gray', borderWidth:1,width:150, height:40}}
        placeholder="New Password"
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={this.handlePass}
        ></TextInput>

      <Text>Confirm New Password:</Text>

      <TextInput
        style={{margin:15,alignSelf:'center', color:'gray', borderColor:'gray', borderWidth:1,width:150, height:40}}
        placeholder="Confirm New Password"
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={this.handleConfirmPass}
        ></TextInput>

        <View style={styles.butView}>

        <TouchableOpacity
          style={styles.butBox}
          onPress={this.handleChangePass}
          >
          <Text style={{color:'white',lineHeight: 50, alignSelf:'center'}}>SAVE</Text>


          </TouchableOpacity>



          </View>

          </View>
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
    zIndex: -1
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
    width: 125,
    height: 50,
    borderRadius: 50,

  }

});

function mapStateToProps(state){
  return {
    usersId:state.Fullname.currentUserId
  }
}

export default connect(mapStateToProps)(Password_Profile_Settings);
