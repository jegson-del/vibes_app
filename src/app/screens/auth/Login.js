import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomTextInput from "../../components/custom-text-input";
import ActiveButton from "../../components/active-button";
import AuthOptionButtons from "../../components/auth-option-buttons";
import FormErrorDisplay from "../../components/form-error-display";
import I18n from "../../../utils/i18n";
import { Validation } from "../../../utils/validation";
import LinearGradient from "react-native-linear-gradient";
import {Color} from "../../../utils/colors";
import axios from "axios";
import { Url } from "../../../utils/url";
import {setUser} from "../../../redux/actions/UserAction";
import {connect} from "react-redux";
import DeviceInfo from "react-native-device-info";
import { CommonActions } from '@react-navigation/native';
import {setToken} from "../../../redux/actions/TokenAction";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            hasError: false,
            errorMessage: null
        }
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

    submit = () => {
        if(!Validation.isValidEmail(this.state.email)) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.invalid_email")});
            return;
        }

        if(!Validation.isValidPassword(this.state.password)) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.invalid_password")});
            return;
        }

        this.setState({hasError: false});

        axios.post(Url.login, {
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
                this.setState({hasError: true, errorMessage: I18n.t("auth.unauthorized")});
            });
    }

    goto = (screen) => {
        this.props.navigation.navigate(screen)
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={Color.gradient}
                    style={styles.linearGradient}>

                    {this.state.hasError ? <FormErrorDisplay error={this.state.errorMessage} /> : null}

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

                    <ActiveButton title={I18n.t("login")} pressed={this.submit} />

                    <AuthOptionButtons title={I18n.t("forgot_password")} pressed={this.goto} screen="RecoverPassword" />

                    <AuthOptionButtons title={I18n.t("sign_up")} pressed={this.goto} screen="Register" />
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
        updateUser: (condition) => dispatch(setUser(condition)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);