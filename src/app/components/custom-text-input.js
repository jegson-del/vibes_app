import React from "react";
import {View, TextInput, StyleSheet} from "react-native";

export default class CustomTextInput extends React.Component {
    render() {
        return (
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder={this.props.placeholder}
                    placeholderTextColor="white"
                    onChangeText={text => this.props.update(text)}
                    autoCapitalize={this.props.capital || 'sentences'}
                    secureTextEntry={this.props.isPassword || false}
                    multiline={this.props.multiline || false}
                    numberOfLines={this.props.numberOfLines || 4}
                    keyboardType={this.props.keyboardType || null}
                    maxLength={this.props.maxLength || 30}
                    returnKeyType={this.props.returnKeyType || 'default'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputView:{
        width: "80%",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
        paddingLeft: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        fontFamily: "Montserrat-Bold",
    },
    inputText: {
        height: 50,
        color: "white",
        fontFamily: "Montserrat-Medium",
        paddingLeft: 0
    },
});