import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput } from 'react-native';

import {connect} from "react-redux";
import {ChangePage} from "../../redux/actions.js";

class Email_Profile_Settings extends React.Component {

  uEmail=null;
  cEmail=null;

  handleEmailChange=(text)=>{
    this.uEmail=text;
  }

  confirmEmailChange=(text)=>{
    this.cEmail=text;
  }

  changeEmail=async ()=>{
    if(this.uEmail == null || this.uEmail == "" || this.cEmail == null || this.cEmail == "" ){
      alert("Please fill in the fields")
    } else if(this.uEmail === this.cEmail){
    var fd = new FormData();
    fd.append("userId", this.props.usersId);
    fd.append("userEmail", this.uEmail);

    var resp = await fetch("https://walk2.herokuapp.com/mysql/changeEmail.php",{
      method:"POST",
      body:fd
    });
    var json = await resp.json();
    if(json){
      alert("Email change success");
      this.props.dispatch(ChangePage(2));
    }
    else{
      alert("Email change did not go through. Please try again.")
      this.props.dispatch(ChangePage(2));
    }
  } else {
    alert("Emails do not match");
  }
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems:'center'}}>
        <Text style={{fontSize:25, flex:0, height:50}}>Profile Settings</Text>

        <Text>New Email:</Text>

      <TextInput
        style={{margin:15, alignSelf:'center', color:'gray', borderColor:'gray', borderWidth:1,width:150, height:40}}
        placeholder="New Email"
        autoCapitalize="none"
        onChangeText={this.handleEmailChange}
        ></TextInput>

      <Text>Confirm New Email:</Text>

      <TextInput
        style={{margin:15,alignSelf:'center', color:'gray', borderColor:'gray', borderWidth:1,width:150, height:40}}
        placeholder="Confirm New Email"
        autoCapitalize="none"
        onChangeText={this.confirmEmailChange}
        ></TextInput>

        <View style={styles.butView}>

        <TouchableOpacity
          style={styles.butBox}
          onPress={this.changeEmail}
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

export default connect(mapStateToProps)(Email_Profile_Settings);
