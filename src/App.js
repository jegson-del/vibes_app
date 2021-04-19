import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'
import {connect} from "react-redux";

import SplashScreen from "./app/screens/SplashScreen";
import LoginScreen from "./app/screens/auth/Login";
import RegisterScreen from "./app/screens/auth/Register";
import RecoverPasswordScreen from "./app/screens/auth/ForgottenPassword";
import EventsScreen from "./app/screens/events/Events";
import EventScreen from "./app/screens/events/Event";
import ProfileScreen from "./app/screens/profile/Profile";
import PaidEventsScreen from "./app/screens/profile/PaidEvents";
import TicketsScreen from "./app/screens/profile/Tickets";
import UnblockScreen from "./app/screens/profile/Unblock";
import PaymentScreen from "./app/screens/payment/Payment";
import AdminAddEventScreen from "./app/screens/profile/admin/AddEvent";
import {Color} from "./utils/colors";
import I18n from "./utils/i18n";
import AddEvent from "./app/screens/profile/admin/AddEvent";

const Tab = createBottomTabNavigator();

const RootStack = createStackNavigator();
const EventStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AuthStack = createStackNavigator();

function EventStackScreen() {
    return (
        <EventStack.Navigator>
            <EventStack.Screen
                name="EventsScreen"
                component={EventsScreen}
                // options={{
                //     title: I18n.t("events"),
                //     shadowColor: 'transparent',
                //     headerStyle: { backgroundColor: Color.events_header, shadowColor: 'transparent' },
                //     headerRight: () => (
                //         <SearchIcon name="search" action="search" />
                //     ),
                // }}
                options={EventsScreen.navigationOptions}
            />
            <EventStack.Screen name="EventScreen" component={EventScreen} options={{ title: I18n.t("event") }} />
            <EventStack.Screen name="PaymentScreen" component={PaymentScreen} options={{ title: I18n.t("payment") }} />
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
            <AuthStack.Screen name="RecoverPassword" component={RecoverPasswordScreen}/>
        </EventStack.Navigator>
    );
}

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: '',
                    shadowColor: 'transparent',
                    headerStyle: { backgroundColor: Color.events_header, shadowColor: 'transparent' },
                }}
            />
            <ProfileStack.Screen
                name="PaidEvents"
                component={PaidEventsScreen}
                options={{
                    title: 'Your events',
                }}
            />
            <ProfileStack.Screen name="Tickets" component={TicketsScreen} />
            <ProfileStack.Screen name="Unblock" component={UnblockScreen} />
            <ProfileStack.Screen
                name="AddEvent"
                component={AdminAddEventScreen}
                options={{
                    title: 'Add New Event',
                }}
            />
        </ProfileStack.Navigator>
    );
}

class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                {this.props.firstTime ? (
                    <RootStack.Navigator>
                        <RootStack.Screen
                            name="SplashScreen"
                            component={SplashScreen}
                            options={{ headerShown: false }}
                        />
                    </RootStack.Navigator>
                ) : (
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;

                                if (route.name === 'Event') {
                                    iconName = focused ? 'article' : 'article';
                                } else if (route.name === 'Explore') {
                                    iconName = focused ? 'search' : 'search';
                                } else if (route.name === 'Profile') {
                                    iconName = focused ? 'group' : 'group';
                                }

                                return <Icon name={iconName} size={size} color={color} />
                            },
                        })}
                        tabBarOptions={{
                            activeTintColor: Color.tab_active,
                            inactiveTintColor: Color.tab_inactive,
                        }}>
                        <Tab.Screen name="Event" component={EventStackScreen} />
                        <Tab.Screen name="Profile" component={ProfileStackScreen} />
                    </Tab.Navigator>
                )}
            </NavigationContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        firstTime: state.firstTimeReducer.isFirstTime
    }
}

export default connect(mapStateToProps)(App);