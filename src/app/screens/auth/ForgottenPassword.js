import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {Color} from "../../../utils/colors";
import CustomTextInput from "../../components/custom-text-input";
import I18n from "../../../utils/i18n";
import ActiveButton from "../../components/active-button";
import {Validation} from "../../../utils/validation";
import axios from "axios";
import {Url} from "../../../utils/url";
import FormErrorDisplay from "../../components/form-error-display";
import FormSuccessDisplay from "../../components/form-success-display";

export default class ForgottenPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            hasError: false,
            errorMessage: null,
            hasSuccess: false,
            successMessage: null,
        }
    }

    updateEmail = (email) => {
        this.setState({
            email: email
        })
    }

    submit = () => {
        if(!Validation.isValidEmail(this.state.email)) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.invalid_email")});
            return;
        }

        this.setState({hasError: false, hasSuccess: false});

        axios.post(Url.forgot_password, {
            email: this.state.email,
        }, {
            headers: Url.headers
        })
            .then(response => {
                this.setState({hasSuccess: true, successMessage: I18n.t("auth.email_sent_successfully")});
            })
            .catch(error => {
                this.setState({hasError: true, errorMessage: I18n.t("auth.failed_sending_email")});
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={Color.gradient}
                    style={styles.linearGradient}>

                    {this.state.hasError ? <FormErrorDisplay error={this.state.errorMessage} /> : null}
                    {this.state.hasSuccess ? <FormSuccessDisplay message={this.state.successMessage} /> : null}

                    <CustomTextInput
                        placeholder={I18n.t("email")}
                        update={this.updateEmail}
                        capital='none'
                    />

                    <ActiveButton title={I18n.t("send_recovery_email")} pressed={this.submit} />
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