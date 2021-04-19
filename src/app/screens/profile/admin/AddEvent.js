import React  from 'react';
import {StyleSheet, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import I18n from "../../../../utils/i18n";
import {Url} from "../../../../utils/url";
import {Color} from "../../../../utils/colors";
import axios from 'axios';
import LinearGradient from "react-native-linear-gradient";
import FormErrorDisplay from "../../../components/form-error-display";
import CustomTextInput from "../../../components/custom-text-input";
import ActiveButton from "../../../components/active-button";
import {Validation} from "../../../../utils/validation";
import {launchImageLibrary} from 'react-native-image-picker';
import FormSuccessDisplay from "../../../components/form-success-display";

const options = {
    // title: 'Select Avatar',
    mediaType: 'photo',
    maxWidth: 500,
    maxHeight: 500
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    // storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    // },
};

class AddEvent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null,
            name: "",
            description: "",
            price: "",
            genre: "",
            starts: "",
            ends: "",
            address: "",
            city: "",
            province: "",
            post_code: "",
            hasError: false,
            errorMessage: null,
            hasSuccess: false,
            successMessage: null,
        }
    }

    updateName = (name) => {
        this.setState({
            name: name
        })
    }

    updateDescription = (description) => {
        this.setState({
            description: description
        })
    }

    updatePrice = (price) => {
        this.setState({
            price: price
        })
    }

    updateStarts = (starts) => {
        this.setState({
            starts: starts
        })
    }

    updateEnds = (ends) => {
        this.setState({
            ends: ends
        })
    }

    updateGenre = (genre) => {
        this.setState({
            genre: genre
        })
    }

    updateAddress = (address) => {
        this.setState({
            address: address
        })
    }

    updateCity = (city) => {
        this.setState({
            city: city
        })
    }

    updateProvince = (province) => {
        this.setState({
            province: province
        })
    }

    updatePostCode = (post_code) => {
        this.setState({
            post_code: post_code
        })
    }

    selectFile = async () => {
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
            } else {
                //checks file size
                let fileSize = response.fileSize / (1024*1024);
                if(fileSize > 8){
                    alert(I18n.t('file_size_error'));
                } else {
                    console.log(response.uri);
                    this.setState({image: response});
                }
            }
        });
    }

    submit = () => {
        if(Validation.isEmpty(this.state.name)) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.invalid_event_name")});
            return;
        }

        if(Validation.isEmpty(this.state.description)) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.invalid_event_description")});
            return;
        }

        if(Validation.isEmpty(this.state.price)) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.invalid_event_price")});
            return;
        }

        if(Validation.isEmpty(this.state.genre)) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.invalid_event_genre")});
            return;
        }

        //todo make sure it is valid date in future
        if(!Validation.isValidDate(this.state.starts)) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.invalid_event_starts")});
            return;
        }

        if(Validation.isEmpty(this.state.ends)) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.invalid_event_ends")});
            return;
        }
        //todo end valid date check here

        if(Validation.isEmpty(this.state.address)) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.invalid_location_address")});
            return;
        }

        if(Validation.isEmpty(this.state.post_code)) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.invalid_location_post_code")});
            return;
        }

        if(Validation.isEmpty(this.state.city)) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.invalid_location_city")});
            return;
        }

        if(Validation.isEmpty(this.state.province)) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.invalid_location_province")});
            return;
        }

        if(Validation.isEmpty(this.state.image)) {
            this.setState({hasError: true, errorMessage: I18n.t("validation.invalid_event_image")});
            return;
        }

        this.setState({hasError: false});

        var data = new FormData();
        data.append('image', {
            uri: this.state.image.uri,
            type: this.state.image.type,
            name: this.state.image.fileName
        });
        data.append('name', this.state.name);
        data.append('description', this.state.description);
        data.append('price', this.state.price);
        data.append('genre', this.state.genre);
        data.append('starts', this.state.starts);
        data.append('ends', this.state.ends);
        data.append('address', this.state.address);
        data.append('city', this.state.city);
        data.append('province', this.state.province);
        data.append('post_code', this.state.post_code);

        axios.post(Url.admin_event, data, {
            headers: Url.headers
        })
            .then(response => {
                this.setState({
                    name: "",
                    description: "",
                    price: "",
                    genre: "",
                    starts: "",
                    ends: "",
                    address: "",
                    city: "",
                    province: "",
                    post_code: "",
                    hasSuccess: true,
                    successMessage: I18n.t("auth.event_uploaded_successfully")
                });
            })
            .catch(error => {
                console.log(error)
                console.log(error.response)
                this.setState({hasError: true, errorMessage: I18n.t("auth.admin_upload_failed")});
            });
    }

    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <ScrollView>
                    <LinearGradient
                        colors={Color.gradient}
                        style={styles.linearGradient}>

                        <Text style={styles.sectionHeader}>{I18n.t("event")} {I18n.t("info")}</Text>

                        <TouchableOpacity style={styles.selectButton} onPress={()=> this.selectFile()}>
                            <Text style={styles.selectText}>{this.state.image ? I18n.t("image_selected") : I18n.t("select_file") }</Text>
                        </TouchableOpacity>

                        <CustomTextInput
                            placeholder={I18n.t("event")}
                            update={this.updateName}
                            maxLength={50}
                        />

                        <CustomTextInput
                            placeholder={I18n.t("description")}
                            update={this.updateDescription}
                            multiline={true}
                            numberOfLines={4}
                            maxLength={2000}
                        />

                        <CustomTextInput
                            placeholder={I18n.t("price")}
                            update={this.updatePrice}
                            keyboardType='numeric'
                            maxLength={7}
                        />

                        <CustomTextInput
                            placeholder={I18n.t("genre")}
                            update={this.updateGenre}
                        />

                        <CustomTextInput
                            placeholder={I18n.t("start_time") +' '+ I18n.t("event_date_format")}
                            update={this.updateStarts}
                        />

                        <CustomTextInput
                            placeholder={I18n.t("end_time") +' '+ I18n.t("event_date_format")}
                            update={this.updateEnds}
                        />

                        <Text style={styles.sectionHeader}>{I18n.t("location")} {I18n.t("info")}</Text>

                        <CustomTextInput
                            placeholder={I18n.t("address")}
                            update={this.updateAddress}
                            multiline={true}
                            numberOfLines={4}
                            maxLength={200}
                        />

                        <CustomTextInput
                            placeholder={I18n.t("post_code")}
                            update={this.updatePostCode}
                        />

                        <CustomTextInput
                            placeholder={I18n.t("city")}
                            update={this.updateCity}
                        />

                        <CustomTextInput
                            placeholder={I18n.t("province")}
                            update={this.updateProvince}
                        />

                        {this.state.hasError ? <FormErrorDisplay error={this.state.errorMessage} /> : null}
                        {this.state.hasSuccess ? <FormSuccessDisplay message={this.state.successMessage} /> : null}

                        <ActiveButton title={I18n.t("add_new_event")} pressed={this.submit} />
                    </LinearGradient>
                </ScrollView>
            </KeyboardAvoidingView>
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
        paddingTop: 50
    },
    sectionHeader: {
        fontSize: 20,
        fontFamily: "Montserrat-ExtraBold",
        margin: 20,
        color: Color.white,
    },
    selectButton: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    selectText: {
        color: Color.white,
        padding: 10,
        fontSize: 16,
        fontFamily: "Montserrat-SemiBold",
    }
});

export default connect(null)(AddEvent);