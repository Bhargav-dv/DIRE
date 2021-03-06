import React, { Component } from 'react';
import { Grid, Col, Container,List, ListItem, Text, Content, H1, H3, Card, CardItem, Body,Tabs,Tab} from 'native-base';
import{StyleSheet, View, TouchableOpacity,BackHandler} from 'react-native'
import Tab1 from './TabsForWeather/TempratureTab'
import Tab2 from './TabsForWeather/UvTab';
import Tab3 from './TabsForWeather/AirQuality'
import Tab4 from './heatFirstAid'
import { ScrollView } from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements'
import { HeaderBackButton } from 'react-navigation-stack';


import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import AppIntroSlider from 'react-native-app-intro-slider'

import axios from "axios";

const slides = [
  {
    key: 1,
    title: 'Introduction to Weather',
    text: 'The sun emits harmful radiation known as UV rays. Swipe right to learn more',
    backgroundColor: '#FAE5B6',
    icon: 'cloud',
    iconColor:"#ADD8E6"

  },
  {
    key: 2,
    title: 'What is U.V. Radiation',
    text: "It's harmful radiation emitted by the sun. If the UV reading on the next page is above 3, wear sunscreen. On higher readings, avoid going out.",
    icon: 'radiation-alt',
    backgroundColor: '#FAE5B6',
    iconColor:"#ADD8E6"
  },  
  {
    key: 3,
    title: 'Air Pollution',
    text: "Quality of air is an important factor when working outside. We gather data on air quality in your area and show you the results.",
    icon: 'smog',
    backgroundColor: '#FAE5B6',
    iconColor: '#ADD8E6'
  },
  {
    key: 4,
    title: 'Staying safe',
    text: "We've compiled a list of helpful tips to keep you safe in dangerous weather. The infromation is presented in the first aid section",
    icon: 'user-shield',
    backgroundColor: '#FAE5B6',
    iconColor: '#ADD8E6'
  },
];


export default class WeatherScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      showRealApp: false,
    }
  }

  
  _renderItem = ({item}) => {
    return (
      <View style={{ alignItems: 'center', backgroundColor: item.backgroundColor,flex:1}}>
        <H1 style={styles.slideHeader}>{item.title}</H1>
        {/* <Icon type="FontAwesome5" name='sun'  style={{color:'red', fontSize:60}}/> */}
        <FontAwesome5 solid name={item.icon} style={{color:item.iconColor, fontSize:80}}/>
        <View style={{flex:1}}>
          <Text style={styles.slideText}>{item.text}</Text>
        </View>
      </View>
    )
  }
  render() {
  //  const { showRealApp} = this.state;
    return (
      // !showRealApp ? <AppIntroSlider bottomButton showSkipButton renderItem={this._renderItem} 
      // data = {slides} onDone={() => {this.setState({showRealApp: true})}}/>
      // :
      <Container tabStyle={styles.contaierStyle}> 
        <Tabs tabBarUnderlineStyle={{backgroundColor:"white"}}  >
          <Tab tabStyle={{backgroundColor:"#F3BA36"}} activeTabStyle={{backgroundColor:"#F3BA36"}} 
            textStyle={{color:"black",fontSize:13}} activeTextStyle={{color:"white",fontSize:13}} heading="Temperature">
            <Tab1 />
          </Tab>
          <Tab tabStyle={{backgroundColor:"#F3BA36"}} activeTabStyle={{backgroundColor:"#F3BA36"}} 
          textStyle={{color:"black",fontSize:13}} activeTextStyle={{color:"white",fontSize:13}} heading="UV">
            <Tab2 />
          </Tab>
          <Tab tabStyle={{backgroundColor:"#F3BA36"}} activeTabStyle={{backgroundColor:"#F3BA36"}}
          textStyle={{color:"black",fontSize:13}} activeTextStyle={{color:"white",fontSize:13}}  heading="Air Quality">
            <Tab3 />
          </Tab>
          <Tab tabStyle={{backgroundColor:"#F3BA36"}} activeTabStyle={{backgroundColor:"#F3BA36"}}
          textStyle={{color:"black",fontSize:13}} activeTextStyle={{color:"white",fontSize:13}}  heading="FirstAid">
            <Tab4 />
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

WeatherScreen.navigationOptions = (navigationData) =>{
   return {
    headerLeft: () =>(<HeaderBackButton onPress={()=>{navigationData.navigation.popToTop()}}/>),
    headerRight: () => (
        <TouchableOpacity  onPress={() => {
           navigationData.navigation.navigate({routeName: 'HelpScreen'})
        }}>
          <View style={styles.headerText}>
           <Text style={{color:"black",fontWeight:"bold",fontSize:18,padding:4}}>Help</Text><Icon name="arrow-right" type='material-community'color="black"/>
           </View>
          </TouchableOpacity>)
       
     }
}
const styles = StyleSheet.create({
  containerStyle:{
    
    backgroundColor:"#FAE5B6",
  },
  septextStyle: {
    fontSize: 15
  },
  cardheader: {
    flexDirection: "column"
  },
  subheading: {
    color: '#3d3d3d'
  },
  slideHeader: {
    color: 'black',
    opacity: 0.8,
    marginTop: 30,
    marginBottom:"10%"
  },
  slideText: {
    color: 'black',
    opacity: 0.8,
    marginTop: 30,
    textAlign: 'center',
    fontSize:20 ,
    marginBottom:"30%"
   },
   headerText:{
    fontSize:18,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

  

//   componentDidMount(){
//     Geolocation.getCurrentPosition(res => {
//       let { latitude, longitude } = res.coords
//       axios.get(`https://dire-api.herokuapp.com/api/daily?lat=${latitude}&long=${longitude}`).then(tempdata => {
//         let { temp_max } = tempdata.data.data[0];
//         let temp_min = tempdata.data.data[0].now.temp_min;
//         let forecasts = tempdata.data.data.slice(1)
//         let forecastTemps = forecasts.slice(0, 3).map(obj => { return {'minTemp': obj.temp_min, 'maxTemp': obj.temp_max}})
//         this.setState({
//           showRealApp: false,
//           maxTemp: temp_max,
//           minTemp: temp_min,
//           forecastTemps: forecastTemps
//         });
//       })
//     }, err => {
//       console.log("ERRRR", err);
//     })
//   }
//   render() {
//     const { showRealApp, forecastTemps } = this.state;
//     return ( 
//         !showRealApp ? <AppIntroSlider bottomButton showSkipButton renderItem={this._renderItem} 
//         data = {slides} onDone={() => {this.setState({showRealApp: true})}}/>
//          : 
//           <Container>
//             <Content>
//               <ScrollView>
//                 <Card>
//                   <CardItem header bordered style={styles.cardheader}>
//                     <H3>Temperature</H3>
//                   </CardItem>
//                   <CardItem>
//                     {
//                       forecastTemps && 
//                       <Tab1 
//                         maxTemp={this.state.maxTemp} 
//                         minTemp={this.state.minTemp}
//                         forcasts={this.state.forecastTemps}
//                         ></Tab1>
//                     }
//                   </CardItem>
//                 </Card>
//                 <Card>
//                   <CardItem style={styles.cardheader} header bordered>
//                     <H3>UV Rays</H3>
//                     <Text style={styles.subheading}>Harmful rays from the sun</Text>
//                   </CardItem>
//                   <CardItem>
//                     <Tab2></Tab2>
//                   </CardItem>
//                 </Card>
//               </ScrollView>
//             </Content>
//           </Container>
//     )
//   }
// }

