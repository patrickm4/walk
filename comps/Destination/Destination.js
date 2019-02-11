import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator, ScrollView, ToastAndroid, AppRegistry } from 'react-native';

import DangerModal1 from '../DangerModal1/DangerModal1';
import EventsModal1 from '../EventsModal1/EventsModal1';
import NearbyModal from '../NearbyModal/NearbyModal';
import PasswordChangedModal from '../PasswordChangedModal/PasswordChangedModal';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import Geolocation from 'react-native-geolocation-service';
import getDirections from "react-native-google-maps-directions";
import SendSMS from 'react-native-sms-x';
import proj4 from 'proj4';

import {connect} from "react-redux";
import {ChangePage} from "../../redux/actions.js";
import {ChangeDangerModal} from "../../redux/actions.js";
import {ChangeEventModal} from '../../redux/actions.js';
import {ChangeCrimeBool} from "../../redux/actions.js";
import {ChangeEventBool} from "../../redux/actions.js";
import {ChangeCrimetoShow} from "../../redux/actions.js";
import {ChangeEventtoShow} from "../../redux/actions.js";

class Destination extends React.Component {

  x = 491104.5;
  y = 5456842.89;
  nearCrimes = [];
  nearCrimesLongLat = [];
  nearEvents = [];
  nearEventsLongLat = [];
  locationObj = {};
  mapFlex = 4;
  scrollMargin = -50;

  state = {
    showDInputArea: true,
    showRoute: false,
    showPassChange: false,
    mapRegion: null,
    error: null,
    latitude: null,
    longitude: null,
    currentLat: null,
    currentLng: null,
    convertedUTM: [],
    modal: false,
    mapRef: null,
    newArr: [],
    newEArr: [],
    modalCrimeType: "",
    modalCrimeHunnit: "",
    modalCrimeNeigh: "",
    crimeData: [],
    eventData: [],
    coords: [],
    crimeOpen: false,
    eventOpen: false,
    curLONG: 0,
    curLAT: 0,
    userDest: "",
    loadAnimating:false,

    InitialPosition: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },

    markerPosition :{
      latitude: 49.2567,
      longitude: -123.0073
    },

    endPos :{
      latitude: 49.2567,
      longitude: -123.0073
    },

    VGHmarker: {
      latitude: 49.2616,
      longitude:-123.1239
    },

    langara: {
      latitude: 49.2246,
      longitude: -123.1086
    },

    guildford: {
      latitude: 49.1987,
      longitude: -122.8125
    }
  }

  componentWillMount(){
    //utm to latlong
    //var utm = "+proj=utm +zone=10";
    //var wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
    //console.log(proj4(utm,wgs84,[491104.5, 5456842.89]));

    // var latlong = "+proj=longlat +no_defs";
    // var wgs84 = "+proj=utm +zone=10 +ellps=WGS84 +datum=WGS84 +no_defs";

    // this.setState({
      //convertedUTM: proj4(utm,wgs84,[491104.5, 5456842.89])
      //convert current position lat lng when loaded
      //convertedUTM: proj4(latlong,wgs84,[-123.1239, 49.2616])
      //convertedUTM: proj4(latlong,wgs84,[this.state.langara.longitude, this.state.langara.latitude])
    //})

    console.log("Destination chck", this.props.usersCPhone, this.props.usersCMsg);
  }

  handleNearby=async ()=>{
    // console.log("handleCrimeCall");
    // //console.log(this.state.convertedUTM[0]);
    // var inLong = this.state.convertedUTM[0];
    // var inLat = this.state.convertedUTM[1]
    // var inMark = {
    //   latitude: inLat,
    //   longitude: inLong
    // }
    // var zoomMark = {
    //   latitude: inLat,
    //   longitude: inLong,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // }
    // this.setState({
    //   markerPos: inMark
    // })
    //console.log("handle current long lat", this.state.currentLng, this.state.currentLat);

    var cLng = this.state.currentLng;
    var cLat = this.state.currentLat;

    var latlong = "+proj=longlat +no_defs";
    var wgs84 = "+proj=utm +zone=10 +ellps=WGS84 +datum=WGS84 +no_defs";

    var cutm = proj4(latlong,wgs84,[cLng, cLat]);
    this.setState({
      convertedUTM: cutm,
      curLONG: cLng,
      curLAT: cLat,
    });

    //console.log("utm x y", cutm[0], cutm[1] );

    this.x = cutm[0];
    this.y = cutm[1];

    // console.log("converted long to utm x",this.x);
    // console.log("converted lat to utm y", this.y);

    // @@@@@@@@@@@@@@@@@@@@@@@
    // Crime marker handle @@
    // @@@@@@@@@@@@@@@@@@@@@
    if(this.state.crimeOpen == false){
    var fd = new FormData();

    fd.append("x", this.x);
    fd.append("y", this.y);

    var resp = await fetch("https://walk2.herokuapp.com/mysql/searchCrimeData.php",{
      method:"POST",
      body:fd
    })

    var json = await resp.json();

    if(json == false){
      //alert("There are no recent crimes nearby")
      this.props.dispatch(ChangeCrimetoShow(false));
      console.log("DEST cjlength 0");
    } else {
      this.nearCrimes = json;
      console.log("Crimeyeetyaw", this.nearCrimes);

      for(var i = 0 ; i < this.nearCrimes.length ;i++){
        var convertedLongLat = [];
        var utm = "+proj=utm +zone=10";
        var wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
        var newX = parseInt(this.nearCrimes[i].x);
        var newY = parseInt(this.nearCrimes[i].y);
        var newType = this.nearCrimes[i].type;
        var newHunnit = this.nearCrimes[i].hundred_block;
        var newNeigh = this.nearCrimes[i].neighbourhood;
        // console.log("parsed", newX, newY, "desrap");
        // console.log("converted x and y", proj4(utm,wgs84,[newX, newY]));
        convertedLongLat = proj4(utm,wgs84,[newX, newY]);

        var cMonth = this.nearCrimes[i].month;
        var cYear = this.nearCrimes[i].year;
        var cDay = this.nearCrimes[i].day;
        var cDate = cMonth+'-'+cDay+'-'+cYear;
        var crimestr = cDate.replace(/-/g, "/")+" 00:00:00 PST";
        var dCrimeDate = new Date(crimestr).toString();
        var newCrimestr = dCrimeDate.split(' ').slice(0, 4).join(' ');


        this.nearCrimesLongLat.push({
          lat:convertedLongLat[1],
          lng:convertedLongLat[0],
          type:newType,
          hundredBlock:newHunnit,
          neigh:newNeigh,
          CrmeDate:newCrimestr
        })
      }
      this.setState({
        newArr:this.nearCrimesLongLat,
        crimeOpen:true
      })
      console.log("handleCrime");
    }
  } else {
    this.setState({
      crimeOpen: false,
    })
    this.props.dispatch(ChangeCrimeBool(false));
  }

    // @@@@@@@@@@@@@@@@@@@@@@@
    // Event marker handle @@
    // @@@@@@@@@@@@@@@@@@@@@
    if(this.state.eventOpen == false){

    var fd = new FormData();

    fd.append("x", cLng);
    fd.append("y", cLat);

    var resp = await fetch("https://walk2.herokuapp.com/mysql/SearchEventData.php",{
      method:"POST",
      body:fd
    })

    var json = await resp.json();

    if(json == false){
      //alert("There are no recent Events nearby")
      this.props.dispatch(ChangeEventtoShow(false));
      console.log("DEST ejlength 0");
    } else {
        this.nearEvents = json;
        console.log("Eventsyeetyaw", this.nearEvents);

        for(var i = 0 ; i < this.nearEvents.length ;i++){
          var newX = parseFloat(this.nearEvents[i].lng);
          var newY = parseFloat(this.nearEvents[i].lat);
          var newType = this.nearEvents[i].type;
          var newHunnit = this.nearEvents[i].hundred_block;
          var newNeigh = this.nearEvents[i].neighbourhood;
          var eMonth = this.nearEvents[i].month;
          var eYear = this.nearEvents[i].year;
          var eDay = this.nearEvents[i].day;

          var eDate = eMonth+'-'+eDay+'-'+eYear;
          var eventstr = eDate.replace(/-/g, "/")+" 00:00:00 PST";
          var dEventDate = new Date(eventstr).toString();
          var newEventstr = dEventDate.split(' ').slice(0, 4).join(' ');

          this.nearEventsLongLat.push({
            lat:newY,
            lng:newX,
            type:newType,
            hundredBlock:newHunnit,
            neigh:newNeigh,
            evntDate: newEventstr
          })
          console.log("dest EVENZT check array", this.nearEventsLongLat);
        }
        this.setState({
          newEArr:this.nearEventsLongLat,
          eventOpen:true
        })
        console.log("handleEvent");
      }
    } else {
      this.setState({
        eventOpen: false,
      })
      this.props.dispatch(ChangeEventBool(false));
    }

  }

  handleUserDestination=(loc)=>{
    this.setState({
      userDest: loc
    })
  }

  handleDestInput=()=>{
    this.setState({
      showDInputArea: true
    })
  }

  handleDirections=async ()=>{

    if(this.state.userDest == "" || null){
      alert("Type in a destination")
    } else {
      var resp = await fetch("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyAjmeDspw7sOJc5knFHDAw0XOnBB1cVA70&fields=name,geometry&inputtype=textquery&input="+this.state.userDest);
      var json = await resp.json();

      if(json.candidates.length > 0){
        console.log("dest direc chck json", json);
        var destLat = json.candidates[0].geometry.location.lat;
        var destLng = json.candidates[0].geometry.location.lng;
        this.setState({
          endPos: {
            latitude: destLat,
            longitude: destLng
          }
        })
      } else {
        alert(this.state.userDest+" Does not exist");
      }

      console.log("handledirec chck currrentlatlong", this.state.currentLat, this.state.currentLng);
      console.log("handledirec chck deslatlong", destLat, destLng);
      this.getDirections(this.state.currentLat+","+this.state.currentLng , destLat+","+destLng);
      console.log("DESTINATION direction1");
      if(this.state.showDInputArea == true){
        this.setState({
          showDInputArea: false
        })
      }
    }
  }

  handleHomeDest=async ()=>{
    console.log("homeButton");
    if(this.props.userHomeInfo == "No Address Saved" || null || 0){
      alert("No Address Saved");
    } else {
        var resp = await fetch("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyAjmeDspw7sOJc5knFHDAw0XOnBB1cVA70&fields=name,geometry&inputtype=textquery&input="+this.props.userHomeInfo);
        var json = await resp.json();

        if(json.candidates.length > 0){
          var destLat = json.candidates[0].geometry.location.lat;
          var destLng = json.candidates[0].geometry.location.lng;
          this.setState({
            endPos: {
              latitude: destLat,
              longitude: destLng
            }
          })
        } else {
          alert(this.state.userDest+" Does not exist");
        }
      this.getDirections(this.state.currentLat+","+this.state.currentLng , destLat+","+destLng);
      if(this.state.showDInputArea == true){
        this.setState({
          showDInputArea: false
        })
      }
    }
  }

  handleCheckpoint=()=>{
    // this.setState({
    //   showPassChange: true
    // })

    alert("Notify In Development");
    date = new Date().getDate();
    month = new Date().getMonth()+1;
    year = new Date().getYear()+1900;
    today = month+'-'+date+'-'+year;
    todaystr = today.replace(/-/g, "/")+" 00:00:00 PST";
    todaysDate = new Date(todaystr);
    // date of the obj to compare
    //exp = obj.expiry_date;
    //datestr = exp.replace(/-/g, "/")+"00:00:00 PST"
    console.log("date formated", todaysDate);
    console.log("date unformated", new Date());


    console.log("DESTINATION direction2", this.state.showRoute);
  }

  componentDidMount() {
    // this.getDirections(this.state.langara.latitude,this.state.langara.longitude , this.state.VGHmarker.lat,this.state.VGHmarker.long);
    // console.log("yes");
    this.setState({
      loadAnimating: true
    });
    setInterval(()=>{
      if(this.watchID){
        return false;
      }
      //console.log("getLoc");
      this.watchID = Geolocation.getCurrentPosition((position) => {
        //console.log("geowatch", position);
        var initialRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }

        this.setState({
             InitialPosition: initialRegion,
             markerPosition: initialRegion,
             currentLat: position.coords.latitude,
             currentLng: position.coords.longitude,
             loadAnimating: false
           });
      },
        (error) => {
          clearInterval(this.watchID)
          this.watchID = null;
          console.log(error);
          this.setState({ error: error.message })},
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 },
      );
    }, 1000)
  }

  async getDirections(startLoc, destinationLoc){
    try {
      console.log("GetDirections async", startLoc, destinationLoc);
      var resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&mode=walking&key=AIzaSyAjmeDspw7sOJc5knFHDAw0XOnBB1cVA70`);
      var respJson = await resp.json();
      var points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      var coords = points.map((point, i)=>{
        return{
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({
        coords:coords,
        showRoute: true
      })
      return coords
    }
    catch(error){
      console.log("getDirectionsERROR", error)
      return error
    }

    this.setState({
      showRoute: true
    })

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange = (InitialPosition) => {
  this.setState({ InitialPosition });
}

  handlePage=(num)=>{
    this.props.dispatch(ChangePage(num))
  }

  handleMarkerModal=(cName, cWhereH, cWhereN, When, showType)=>{
    //alert(cName+' OCCURED HERE');
    console.log("destination marker handle");
    if(showType === "crime"){
      this.state.crimeData.push({
        type:cName,
        hundredb:cWhereH,
        hood:cWhereN,
        date:When
      })
      this.props.dispatch(ChangeDangerModal(true));
    } else if(showType === "event"){
      this.state.eventData.push({
        type:cName,
        hundredb:cWhereH,
        hood:cWhereN,
        date:When
      })
      this.props.dispatch(ChangeEventModal(true));
    }

  }

  sendSMSFunction=()=> {
    // console.log("sms");
    // // \n is the return key in messages
    // SendSMS.send(123, "+"+this.props.usersCPhone+"", ""+this.props.usersCMsg+"",
    //   (msgid)=>{
    //     ToastAndroid.show("Message sent", ToastAndroid.SHORT);
    //   }
    // );
    // console.log("sms after");
    alert("Background SMS removed due to Google policy changes");
  }



  // var passchangeModal = null;
  // if(this.state.showPassChange) {
  //   passchangeModal = <PasswordChangedModal />;
  // } else {
  //   passchangeModal = null;
  // }

  render() {

    if(this.state.loadAnimating){
      return(
        <ActivityIndicator
          animating={true}
          size="large"
          style={styles.indicator}
          />
      );
    }

    var nearbyModal = null;
    if(this.state.crimeOpen == true){
      nearbyModal = <NearbyModal />;
    } else if(this.state.crimeOpen == false){
      nearbyModal = null;
    }


    var newPoints = null;
    if(this.props.dCrimeShow == true){nearbyModal = null;}
    newPoints = this.state.newArr.map((obj, i)=>{
      return(
        <MapView.Marker
          key={i}
          coordinate={{
            latitude: obj.lat,
            longitude: obj.lng
          }}
          opacity={(this.props.dCrimeShow)?1:0}
          onPress={this.handleMarkerModal.bind(this, obj.type, obj.hundredBlock, obj.neigh, obj.CrmeDate, "crime")}
          >
          <Image
            source={require('./img/danger.png')}
            style={{width:32, height:45}}
            />
          </MapView.Marker>
      )
    });


    var newEPoints = null;
    if(this.props.dEventShow == true){nearbyModal = null;}
    newEPoints = this.state.newEArr.map((obj, i)=>{
      return(
        <MapView.Marker
          key={i}
          coordinate={{
            latitude: obj.lat,
            longitude: obj.lng
          }}
          opacity={(this.props.dEventShow)?1:0}
          onPress={this.handleMarkerModal.bind(this, obj.type, obj.hundredBlock, obj.neigh, obj.evntDate, "event")}
          >
          <Image
            source={require('./img/event.png')}
            style={{width:45, height:45}}
            />
          </MapView.Marker>
      )
    });




    var modal = null;
    if(this.props.dangerModal === true){
      modal = this.state.crimeData.map((obj, i)=>{
        return (
          <DangerModal1
            key={i}
            obj={obj}/>
        )
      })
    }
    else {
      modal = null;
    }

    var Emodal = null;
    if(this.props.eventModal === true){
      Emodal = this.state.eventData.map((obj, i)=>{
        return (
          <EventsModal1
            key={i}
            obj={obj}/>
        )
      })
    }
    else {
      Emodal = null;
    }

    const GOOGLE_MAPS_APIKEY  = "AIzaSyAjmeDspw7sOJc5knFHDAw0XOnBB1cVA70";


    var eRoute = null;
    var fRoute = null;
    if(this.state.showRoute){
      eRoute =
      <MapView.Marker
        coordinate={this.state.endPos}
        title="End"
        />;
      fRoute =
      <MapView.Polyline
        coordinates={this.state.coords}
        strokeWidth={2}
        strokeColor="rgb(241,184,27)"/>;
    } else {
      eRoute = null;
      fRoute = null;
    }

    var dClose = null;

    if(this.state.showDInputArea){
    this.mapFlex = 4;
    this.scrollMargin = -50;
    var destInputArea = <View style={{flex: 6, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', backgroundColor: "white"}}>
      <View
        style={{height:170, width: 30}}
        >
        <Text>Recent</Text>
      </View>
      <View
        style={{height:230, alignItems: 'center', justifyContent: 'flex-end'}}
        >
          <TextInput
            style={{height: 40, width: 150, borderColor: 'gray', borderWidth: 1, marginBottom: 20, textAlign: 'center'}}
            placeholder="Destination"
            underlineColorAndroid='transparent'
            onChangeText={this.handleUserDestination}
            />
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={{width:70, height: 40, borderRadius: 50, marginBottom: -20, backgroundColor: '#013b36', justifyContent: 'center', alignItems: 'center'}}
              onPress={this.handleDirections}
              >
              <Text style={{color: 'white'}}>Go</Text>
            </TouchableOpacity>
          </View>
        <Text> {this.state.error} </Text>
      </View>
      <View
        style={{height:170, alignItems: 'center', justifyContent: 'flex-end'}}
        >
        <TouchableOpacity
          onPress={this.handleHomeDest}
          >
          <Image style={{width:30, height: 40}} source={require('./img/homeicon.png')}/>
        </TouchableOpacity>
      </View>
    </View>
    ;
  } else {
      destInputArea = <View style={{flex:1.5}}></View>;
      this.mapFlex = 5;
      this.scrollMargin = 50;
      dClose =<View
          style={{padding: 15, alignItems: 'center'}}
          >
          <TouchableOpacity
            onPress={this.handleDestInput}
            >
            <Image
              style={{width:90, height: 90, marginTop: -40, resizeMode: 'contain'}}
              source={require('./img/close.png')}
              />
          </TouchableOpacity>

        </View>;
    }



    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // Destination Return Area Below @@
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    return (
      <View style={styles.container}>
        {nearbyModal}
        {modal}
        {Emodal}
      <ScrollView
        style={{flex:0, zIndex: -1, marginBottom: this.scrollMargin}}
        >
        {destInputArea}
      </ScrollView>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={[styles.map, {flex: this.mapFlex}]}
        initialRegion={this.state.InitialPosition}
        region={this.state.InitialPosition}
        >
        {newPoints}
        {newEPoints}
        {eRoute}
        {fRoute}
        <MapView.Marker
          coordinate={this.state.markerPosition}
          title="Current Location"
          description="Press nearby to show events or crime near you!"
          >
          <Image
            source={require('./img/currentlocation.png')}
            style={{width:32, height:45, resizeMode: 'contain'}}
            />
        </MapView.Marker>
      </MapView>

      <View
        style={styles.destNav}
        >
        <View
          style={{padding: 15, alignItems: 'center'}}
          >
          <TouchableOpacity
            onPress={this.sendSMSFunction.bind(this)}
            >
            <Image
              style={{width:70, height: 70}}
              source={require('./img/Checkpoint.png')}
              />
          </TouchableOpacity>
          <Text style={{fontSize: 16}}>Notify</Text>
        </View>

        {dClose}

        <View
          style={{padding: 15, alignItems: 'center'}}
          >
          <TouchableOpacity
            onPress={this.handleNearby}
            >
            <Image
              style={{width:70, height: 70}}
              source={require('./img/Nearby.png')}
              />
          </TouchableOpacity>
          <Text style={{fontSize: 16}}>Nearby</Text>
        </View>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   ...StyleSheet.absoluteFillObject,
   flex: 1,
   flexDirection: 'column',
   alignItems: 'stretch',
 },
 map: {
   //...StyleSheet.absoluteFillObject,
   //position: 'absolute',
   //bottom: 0,
   //justifyContent: 'flex-end',
   //height: 100,
   //width: 400,
   backgroundColor: '#333',
   zIndex: -5,
 },
 destNav: {
   height:25,
   backgroundColor: "#fff",
   flex: 1.7,
   flexDirection: "row",
   justifyContent: "space-between",
 },
 indicator: {
   flex:1,
   alignItems: 'center',
   justifyContent: 'center',
   height: 80,
 },
});

AppRegistry.registerComponent('Destination', () => Destination);

function mapStateToProps(state){
  return {
    dangerModal:state.Page.dangerModal,
    eventModal:state.Page.eventModal,
    dCrimeShow:state.Page.dShowCrimes,
    dEventShow:state.Page.dShowEvents,
    userHomeInfo:state.Fullname.currentUserHomeInfo,
    usersCPhone:state.Fullname.currentUserCphone,
    usersCMsg:state.Fullname.currentCmsg
  }
}

export default connect(mapStateToProps)(Destination);
