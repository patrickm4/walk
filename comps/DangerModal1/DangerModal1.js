import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import {connect} from "react-redux";
import {ChangeDangerModal} from "../../redux/actions.js";



class DangerModal1 extends React.Component {

  handleDisp = () => {
    this.props.dispatch(ChangeDangerModal(false));
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.handleDisp}
        >

      <View style={styles.modalcontainer}>
        <View style={{flex:1, width:'100%', backgroundColor: '#013b36'}}>
          <View style={{flex:1,alignSelf:'center'}}>
            <Image style={styles.image} source={require('./assets/img/danger.png')}/>
          </View>

          <View style={{flex:4,alignItems:'center'}}>
            <Text style={{color:'white', fontWeight:'bold',fontSize:32, margin:10,textTransform:'uppercase'}}>Danger!</Text>
            <Text
              style={{color:'white', fontSize:20}}
              >
              Within 1km away from you
            </Text>

            <Text style={{color:'white', margin: 5}}>{this.props.obj.hundredb}, {this.props.obj.hood}</Text>
            <Text style={{color:'white',margin:5,fontStyle:'italic'}}>Burnaby, BC, Canada</Text>
            <Text style={{color:'white',margin:20}}>{this.props.obj.type}</Text>
            <Text style={{color:'white'}}>{this.props.obj.date}</Text>

          </View>
        </View>


      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  modalcontainer: {
    height:300,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity:50,
    position: 'absolute',
    zIndex: 50,
  },
  image: {
    width:40,
    height:60,
    margin:15

  }
});

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps)(DangerModal1);
