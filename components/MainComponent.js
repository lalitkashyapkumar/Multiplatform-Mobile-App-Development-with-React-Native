import React, {Component} from 'react';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Menu from './MenuComponent';
import  Dishdetail  from './DishdetailComponent';
import Home from "./HomeComponent";
import Contact from './ContactComponent';
import aboutUs from './AboutComponent';


const HomeNavigator = createStackNavigator();
function HomeNavigatorScreen(){
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
                />
        </HomeNavigator.Navigator>
    );
}

const MenuNavigator = createStackNavigator();
function MenuNavigatorScreen(){
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
                />
                <MenuNavigator.Screen
                    name="Dishdetail"
                    component={Dishdetail}
                    options={{headerTitle:"Dishdetail"}}
                />
                
            
            </MenuNavigator.Navigator>
        );
}


const AboutUsNavigator = createStackNavigator();
function AboutUsNavigatorScreen(){
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
                options={{headerTitle:"AboutUs"}}
            />
        </AboutUsNavigator.Navigator>
    )
}
const ContactUsNavigator = createStackNavigator();
function ContactUsNavigatorScreen(){
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
                options={{headerTitle:"ContactUs"}}
            />
        </ContactUsNavigator.Navigator>
    )
}
const MainNavigator = createDrawerNavigator();

function MainNavigatorDrawer(){
    return(
        <MainNavigator.Navigator initialRouteName="Home">
            <MainNavigator.Screen
                name="Home"
                component={HomeNavigatorScreen}
                options={{drawerLabel:"Home"}}
            />
            <MainNavigator.Screen
                name="AboutUs"
                component={AboutUsNavigatorScreen}
                options={{drawerLabel:"AboutUs"}}
            />
            <MainNavigator.Screen
                name="Menu"
                component={MenuNavigatorScreen}
                options={{drawerLabel:"Menu"}}
            />
            <MainNavigator.Screen
                name="ContactUs"
                component={ContactUsNavigatorScreen}
                options={{drawerLabel:"ContactUs"}}
            />
        </MainNavigator.Navigator>
    );
}
class Main extends Component{    
    render(){
        return(
            <NavigationContainer>
                <MainNavigatorDrawer/>           
            </NavigationContainer>
        );
    }
}

export default Main;