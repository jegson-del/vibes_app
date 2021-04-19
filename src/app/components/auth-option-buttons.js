import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

export default class AuthOptionButtons extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.pressed(this.props.screen)}>
                <Text style={styles.buttonText}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonText: {
        color:"white",
        margin: 10,
        fontFamily: "Montserrat-Medium"
    }
});