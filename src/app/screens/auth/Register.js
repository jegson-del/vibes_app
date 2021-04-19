import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {Color} from "../../../utils/colors";
import CustomTextInput from "../../components/custom-text-input";
import ActiveButton from "../../components/active-button";
import CheckBox from "../../components/check-box";
import FormErrorDisplay from "../../components/form-error-display";
import {Validation} from "../../../utils/validation";
import I18n from "../../../utils/i18n";
import axios from "axios";
import {Url} from "../../../utils/url";
import DeviceInfo from "react-native-device-info";
import {setUser} from "../../../redux/actions/UserAction";
import {connect} from "react-redux";
import {CommonActions} from "@react-navigation/native";
import {setToken} from "../../../redux/actions/TokenAction";

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            name: "",
            password: "",
            hasError: false,
            errorMessage: null,
            consentGiven: false
        }
    }

    updateName = (name) => {
        this.setState({
            name: name
        })
    }

    updateEmail = (email) => {
        this.setState({
            email: email
        })
    }

    updatePassword = (password) => {
        this.setState({
            password: password
        })
    }

    toggleCheckbox = (value) => {
        this.setState({consentGiven: value});
    }

    submit = () => {
        if(!Validation.isValidUsername(this.state.name)) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.invalid_username")});
            return;
        }

        if(!Validation.isValidEmail(this.state.email)) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.invalid_email")});
            return;
        }

        if(!Validation.isValidPassword(this.state.password)) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.invalid_password")});
            return;
        }

        if(!this.state.consentGiven) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.below_18_consent")});
            return;
        }

        this.setState({hasError: false});

        axios.post(Url.register, {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            device_name: DeviceInfo.getUniqueId()
        }, {
            headers: Url.headers
        })
            .then(response => {
                this.props.updateToken(response.data.data.token);
                this.props.updateUser(response.data.data);

                this.props.navigation.dispatch(
                    CommonActions.navigate({
                        name: 'EventsScreen',
                        params: {},
                    })
                );
            })
            .catch(error => {
                console.log(error)
                console.log(error.response)
                this.setState({hasError: true, errorMessage: I18n.t("auth.failed_registration")});
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={Color.gradient}
                    style={styles.linearGradient}>

                    {this.state.hasError ? <FormErrorDisplay error={this.state.errorMessage} /> : null}

                    <CustomTextInput
                        placeholder={I18n.t("name")}
                        update={this.updateName}
                    />

                    <CustomTextInput
                        placeholder={I18n.t("email")}
                        update={this.updateEmail}
                        capital='none'
                    />

                    <CustomTextInput
                        placeholder={I18n.t("password")}
                        update={this.updatePassword}
                        isPassword={true}
                    />

                    <CheckBox toggleCheckbox={this.toggleCheckbox}/>

                    <ActiveButton title={I18n.t("sign_up")} pressed={this.submit} />
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    linearGradient: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingTop: 100
    }
});

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateToken: (condition) => dispatch(setToken(condition)),
        updateUser: (condition) => dispatch(setUser(condition))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);