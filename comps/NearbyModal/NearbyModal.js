import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import {connect} from "react-redux";
import {ChangeCrimeBool} from "../../redux/actions.js";
import {ChangeEventBool} from "../../redux/actions.js";

class NearbyModal extends React.Component {

  handleCrimeDisp=()=>{
    if(this.props.ctoShow){
      this.props.dispatch(ChangeCrimeBool(true));
      console.log("handlecrimedisp nearbymodal", this.props.dCrimeShow);
    } else {
      alert("No Recent Crimes Nearby");
      console.log("NEARBY MODAL Crimes json grab none");
    }
  }

  handleEventDisp=()=>{
    if(this.props.etoShow){
      this.props.dispatch(ChangeEventBool(true));
      console.log("handleEventdisp nearbymodal");
    } else {
      alert("No Events Nearby");
      console.log("NEARBY MODAL Events json grab none");
    }
  }

  render() {
    return (
      <View style={styles.modalcontainer}>
        <View style={{flex:0.5, aligntItems: 'center' }}>
          <Text style={{fontSize: 24, lineHeight: 70, color:"white"}}>Show nearby:</Text>
        </View>
        <View
          style={{flex: 1, aligntItems: 'center', flexDirection: 'row', justifyContent: "space-between"}}
          >
          <TouchableOpacity
            style={{alignItems: 'center', width: '49%',backgroundColor: '#336D68'}}
            onPress={this.handleCrimeDisp}
            >
            <View style={{flex:1, aligntItems: 'center'}}>
                <Text style={{fontSize:18, lineHeight: 100, padding: 10, color: 'white'}}>Crime</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{alignItems: 'center', width: '49%',backgroundColor: '#336D68'}}
            onPress={this.handleEventDisp}
            >
            <View style={{flex:1, aligntItems: 'center'}}>
                <Text style={{fontSize:18, lineHeight: 100, padding: 10, color: 'white'}}>Events</Text>
            </View>
          </TouchableOpacity>

      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  modalcontainer: {
    backgroundColor: '#013b36',
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity:50,
    position: 'absolute',
    zIndex: 50,
  },

});

function mapStateToProps(state){
  return {
    dCrimeShow:state.Page.dShowCrimes,
    ctoShow:state.Page.anyCrimetoShow,
    etoShow:state.Page.anyEventtoShow,
  }
}

export default connect(mapStateToProps)(NearbyModal);
