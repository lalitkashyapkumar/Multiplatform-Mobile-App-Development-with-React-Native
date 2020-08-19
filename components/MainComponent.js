import React, {Component} from 'react';
import { View, Platform, Text, ScrollView, Image, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import Menu from './MenuComponent';
import  DishDetail  from './DishdetailComponent';
import Home from "./HomeComponent";
import Contact from './ContactComponent';
import aboutUs from './AboutComponent';
import Reservation from './ReservationComponent';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const HomeNavigator = createStackNavigator();
function HomeNavigatorScreen({ navigation }){
    return(
        <HomeNavigator.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}>
            <HomeNavigator.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerLeft:()=>(
                            <Icon name="menu" size={24} 
                        color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />
                        )
                    }}
                />
        </HomeNavigator.Navigator>
    );
}

const MenuNavigator = createStackNavigator();
function MenuNavigatorScreen({ navigation }){
    return(<MenuNavigator.Navigator
                initialRouteName='Menu'
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#512DA8"
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        color: "#fff"            
                    }
                }}>

                <MenuNavigator.Screen
                    name="Menu"
                    component={Menu}
                    options={{
                        headerLeft:()=>(
                            <Icon name="menu" size={24} 
                        color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />
                        )
                    }}
                />

                <MenuNavigator.Screen
                    name="DishDetail"
                    component={DishDetail}
                    options={{headerTitle:"DishDetail"}}
                />
                
            
            </MenuNavigator.Navigator>
        );
}


const AboutUsNavigator = createStackNavigator();
function AboutUsNavigatorScreen({ navigation }){
    return(
        <AboutUsNavigator.Navigator 
            initialRouteName='AboutUs'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}>
            <AboutUsNavigator.Screen
                name="AboutUs"
                component={aboutUs}
                options={{
                    headerLeft:()=>(
                        <Icon name="menu" size={24} 
                    color= 'white'
                    onPress={ () => navigation.toggleDrawer() } />
                    )
                }}
            />
        </AboutUsNavigator.Navigator>
    )
}
const ContactUsNavigator = createStackNavigator();
function ContactUsNavigatorScreen({ navigation }){
    return(
        <ContactUsNavigator.Navigator 
            initialRouteName='ContactUs'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}>
            <ContactUsNavigator.Screen
                name="ContactUs"
                component={Contact}
                options={{
                    headerLeft:()=>(
                        <Icon name="menu" size={24} 
                    color= 'white'
                    onPress={ () => navigation.toggleDrawer() } />
                    )
                }}
            />
        </ContactUsNavigator.Navigator>
    )
}

const ReservationNavigator = createStackNavigator();
function ReservationNavigatorScreen({ navigation }){
    return(
        <ReservationNavigator.Navigator 
            initialRouteName='Reservation'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}>
            <ReservationNavigator.Screen
                name="Reservation"
                component={Reservation}
                options={{
                    headerLeft:()=>(
                        <Icon name="menu" size={24} 
                    color= 'white'
                    onPress={ () => navigation.toggleDrawer() } />
                    )
                }}
            />
        </ReservationNavigator.Navigator>
    )
}
const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </ScrollView>
  );

const MainNavigator = createDrawerNavigator();

function MainNavigatorDrawer(){
    return(
        <MainNavigator.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContentComponent {...props}/>} >
            <MainNavigator.Screen
                name="Home"
                component={HomeNavigatorScreen}
                options={{
                    drawerLabel:"Home",
                    drawerIcon: ({ tintColor, focused }) => (
                        <Icon
                          name='home'
                          type='font-awesome'            
                          size={24}
                          color={tintColor}
                        />
                      )
                }}
            />
            <MainNavigator.Screen
                name="AboutUs"
                component={AboutUsNavigatorScreen}
                options={{
                    drawerLabel: 'About Us',
                    drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'            
                        size={24}
                        color={tintColor}
                    />
                    )
                }}
            />
            <MainNavigator.Screen
                name="Menu"
                component={MenuNavigatorScreen}
                options={{
                    drawerLabel: 'Menu',
                    drawerIcon: ({ tintColor, focused }) => (
                        <Icon
                        name='list'
                        type='font-awesome'            
                        size={24}
                        color={tintColor}
                        />
                    )    
                }}
            />
            <MainNavigator.Screen
                name="ContactUs"
                component={ContactUsNavigatorScreen}
                options={{
                    title: 'Contact Us',
                    drawerLabel: 'Contact Us',
                    drawerIcon: ({ tintColor, focused }) => (
                                <Icon
                                    name='address-card'
                                    type='font-awesome'            
                                    size={22}
                                    color={tintColor}
                                />
                    )
            }}
            />
            <MainNavigator.Screen
                name="Reservation"
                component={ReservationNavigatorScreen}
                options={{
                    title: 'Reservation Table',
                    drawerLabel: 'Reservation Table',
                    drawerIcon: ({ tintColor, focused }) => (
                                <Icon
                                    name='cutlery'
                                    type='font-awesome'            
                                    size={22}
                                    color={tintColor}
                                />
                    )
            }}
            />
        </MainNavigator.Navigator>
    );
}
class Main extends Component{
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
      }    
    render(){
        return(
            <NavigationContainer>
                <MainNavigatorDrawer/>           
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Main);