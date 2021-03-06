import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image,ScrollView, Dimensions,TouchableOpacity,SafeAreaView,Modal} from "react-native";
import TextTicker from 'react-native-text-ticker'
import Carousel from 'react-native-snap-carousel';
import {Icon} from 'react-native-elements'
import { WebView } from 'react-native-webview';

import MenueItem from '../components/menuItem'
import {getArticles} from "../components/articleFarm"
import {ListItem} from 'react-native-elements'



const DEVICE_WIDTH = Dimensions.get("window").width
export default class MainScreen extends PureComponent{
  // scrollRef = React.createRef()
    constructor(props){ 
        super(props);
        this.screens = ['MachineList', 'Camera', 'Hospitals']
        this.state ={   
            data: [],
            sortData:[],
            activeIndex:0,
            modalVisible:false,
            activeAnimationType:'decay'
        }
    }
   
    componentDidMount(){
        getArticles().then(result => {
            this.setState({data: result})
            this.setState({sortData: this.state.data.map(m => ({"title": m.title, "url": m.url, "urlToImage": m.urlToImage}))})
        },error =>{
            Alert.alert("Error","Was not able to load News Check Internet Connectivity")
        }
         )
    }


     _renderItem = ({item}) => {
        // console.log("ITEM", item)
        //console.log(item.url)
        //const { modalVisible } = this.state;
        if(item.url != undefined){
        return (
            <TouchableOpacity onPress={() => {  
                this.props.navigation.navigate({
                    routeName: "FarmingNews",
                    params: {
                        url: item.url,
                        title: item.title
                    }
                })
                
                }}>
            <View style={{flexDirection:"row"}}>
           <Image source = {{uri: item.urlToImage != null ? 
            item.urlToImage:"https://unsplash.com/photos/WYd_PkCa1BY/download?force=true&w=640"}}
           style={{width:"20%",height:60,marginLeft:10,marginTop:10}} />
           <View style={{width:"90%",marginLeft:10}}>
           <Text numberOfLines={3} style={{
               fontSize: 17,
               //padding:5,
               shadowColor: "black",
               shadowOpacity: 0.7,
               width:"70%",
               shadowOffset: { width: 10, height: 10 },
            }} >{item.title} </Text>
                
          </View>
            </View>
          </TouchableOpacity>
        ) }else {
                    return null
                }   
    }
    render(){
        let titleData = this.state.sortData
        //console.log(titleData)
    //calling menue item to get format with image to diplay here
    return(
        <View style ={styles.overlayContainer}>
        <View style = {styles.top}>
        <Image source={require("../Images/MainScreenImage2.jpeg")} style={styles.mainImage}/>
        </View>
        <View style={{flexDirection: "row",justifyContent: "space-between",alignItems: 'baseline',backgroundColor:"#F3BA36"}}>
        <Text style={{fontWeight:"bold",fontSize:17,padding:2}}>News</Text>
        <TouchableOpacity onPress={() => {
            this.props.navigation.navigate({routeName: 'News'})
         }}>
        <View style={{flexDirection:"row",}}>
        <Text style={{color:"black",fontWeight:"bold",fontSize:17,padding:2}}>More</Text><Icon name="arrow-right" type='material-community' color="black" />
        </View>
        </TouchableOpacity>
        </View>
         <View style={styles.ScrollTextContainer} >
         <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.sortData}
                 sliderWidth={300}
                itemWidth={DEVICE_WIDTH}
                 loop={true}
                  renderItem={this._renderItem}
                  autoplay={true}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />   
      </View>
        <View style={styles.menueContainer}>
            <MenueItem icon = 'tractor'
            iconName = "Machine List"
                onSelect = {() => {
                this.props.navigation.navigate({
                    routeName: "MachineList"
                })
            }}>
            </MenueItem>
            <MenueItem icon='camera'
            iconName = "Machine Auto-Identify"

                onSelect = {() => {
                this.props.navigation.navigate({
                    routeName: "Camera",
                })
            }}/>
           <MenueItem icon='hospital'
                iconName ="Nearby Hospitals"
                onSelect = {() => {
                this.props.navigation.navigate({
                    routeName: "Hospitals",
                })
            }}/>
           <MenueItem icon='weather-sunny'
                iconName ="Weather"
                onSelect = {() => {
                this.props.navigation.navigate({
                    routeName: "TutorialScreen",
                })
            }}/>
        </View>
        </View>
    )
    
}}


MainScreen.navigationOptions = (navigationData) =>{
    return {
        headerTitle: 'Welcome To Dire'
    }
 }
 const styles = StyleSheet.create({
    overlayContainer:{
        //backgroundColor:'rgba(47,163,218, .4)'
    },
    top:{
        height:"45%",
        alignItems:"center",
        justifyContent:"center",
    },
    mainImage:{
        width:"100%",
        height:"100%"
    },
    header: {
        color: "#F3BA36",
        fontSize: 28,
        //borderColor:"#F3BA36",
        //borderWidth:2,
        //padding:20,
        //paddingLeft:40,
       // paddingRight:40,
       // backgroundColor:'rgba(255,255,255, 0.8)',
    },
   
    ScrollTextContainer: {
    height:"13%",
       //flex: 1, 
        flexDirection:'row', 
        //justifyContent:"space-evenly",
           // marginBottom:7
        //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
     },
     menueContainer:{
        height:"40%",
        flexDirection:'row',
        width:"100%",
       flexWrap:'wrap',
       justifyContent:"space-evenly"
       // marginBottom:10
    },
     txtStyles: {
        fontSize: 16,
        padding:5   
     }
     
    
})