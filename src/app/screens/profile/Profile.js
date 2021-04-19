import React from 'react';
import {StyleSheet, View, Image, Text, Alert} from 'react-native';
import {setToken} from "../../../redux/actions/TokenAction";
import ActiveButton from "../../components/active-button";
import I18n from "../../../utils/i18n";
import {connect} from "react-redux";
import {storeData} from "../../../utils/storage";
import {Color} from "../../../utils/colors";
import {Images} from "../../../utils/images";
import axios from "axios";
import {Url} from "../../../utils/url";
import {setUser} from "../../../redux/actions/UserAction";
import ProfileOption from "../../components/profile-option";
import {setFirstTime} from "../../../redux/actions/FirstTimeAction";

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(Object.keys(this.props.user).length === 0) {
            this.userProfile();
        }
    }

    userProfile = () => {
        axios.get(Url.user, {
            headers: Object.assign(Url.headers, {Authorization: 'Bearer ' + this.props.token})
        })
            .then(response => {
                this.props.updateUser(response.data.data);
            })
            .catch(error => {
                console.log(error)
            });
    }

    logoutConfirmation = () => {
        Alert.alert(
            I18n.t("login"),
            I18n.t("are_you_sure_you_want_to_logout"),
            [
                {
                    text: I18n.t('cancel'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: I18n.t("yes"), onPress: () => this.logout()},
            ],
            {cancelable: false},
        );
    }

    logout = () => {
        storeData('token', '');
        this.props.updateToken('');
        this.props.updateUser({});
        this.props.navigation.navigate('Event');
        this.props.updateFirstTime(true);
    }

    openLogin = () => {
        this.props.navigation.navigate('Login');
    }

    showBlocked = () => {
        this.props.navigation.navigate('Unblock');
    }

    showEvents = (event) => {
        this.props.navigation.navigate('PaidEvents');
    }

    admin = () => {
        Alert.alert(
            I18n.t("manage_events"),
            I18n.t("admin_section"),
            [
                {text: I18n.t("add_new_event"), onPress: () => this.addEvent()},
                {
                    text: I18n.t('cancel'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                // {text: I18n.t("manage_existing_event"), onPress: () => this.manageEvent()},
            ],
            {cancelable: false},
        );
    }

    addEvent = () => {
        this.props.navigation.navigate('AddEvent');
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                { !this.props.token ?
                    <View style={styles.loginContainer}>
                           <ActiveButton
                               title={I18n.t("login_to_continue")}
                               pressed={this.openLogin}
                               opacity="1"
                           />
                       </View>
                    :
                    <View style={styles.profileContainer}>
                        <Text style={styles.title}>{I18n.t("profile")}</Text>
                        <Image style={styles.banner} source={Images.splash} />
                        <View style={styles.picsView}>
                            <Text style={styles.pics}>
                                {this.props.user.name ? this.props.user.name.charAt(0) : ''}
                                {this.props.user.name ? this.props.user.name.charAt(this.props.user.name - 1) : ''}
                            </Text>
                        </View>
                        <Text style={styles.name}>{this.props.user.name}</Text>

                        <View style={{marginBottom: 100}}></View>

                        <ProfileOption
                            action={this.showEvents}
                            icon1_name="event"
                            icon1_color="gray"
                            text={I18n.t("your_event")}
                        />

                        <ProfileOption
                            action={this.showBlocked}
                            icon1_name="block"
                            icon1_color="gray"
                            text={I18n.t("unblock_events")}
                        />

                        <ProfileOption
                            action={this.logoutConfirmation}
                            icon1_name="logout"
                            icon1_color="gray"
                            text={I18n.t("logout")}
                        />

                        {/*{this.props.user.is_admin ?*/}
                        {/*    <ProfileOption*/}
                        {/*        action={this.admin}*/}
                        {/*        icon1_name="lock"*/}
                        {/*        icon1_color="gray"*/}
                        {/*        text={I18n.t("admin_section")}*/}
                        {/*    /> : null*/}
                        {/*}*/}
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: Color.white
    },
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.white
    },
    profileContainer: {
        flex: 1,
        backgroundColor: Color.white
    },
    title: {
        fontSize: 28,
        fontFamily: "Montserrat-Bold",
        marginBottom: 10,
    },
    banner: {
        height: 200,
        width: '100%',
        borderRadius: 20,
    },
    picsView: {
        position: 'absolute',
        marginTop: 210,
        marginLeft: 5,
        height: 100,
        width: 100,
        borderRadius: 100/2,
        backgroundColor: Color.profile_pics,
        justifyContent: 'center', alignItems: 'center'
    },
    pics: {
        color: Color.tab_active,
        fontSize: 40,
        fontFamily: "Montserrat-ExtraBold",
    },
    name: {
        position: 'absolute',
        marginTop: 215,
        marginLeft: 105,
        color: Color.white,
        fontSize: 16,
        fontFamily: "Montserrat-SemiBold",
    }
});

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        token: state.tokenReducer.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateToken: (condition) => dispatch(setToken(condition)),
        updateUser: (condition) => dispatch(setUser(condition)),
        updateFirstTime: (condition) => dispatch(setFirstTime(condition)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);