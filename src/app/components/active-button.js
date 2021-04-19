import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

export default class ActiveButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={[styles.button, {opacity: this.props.opacity || 0.5}]} onPress={() => this.props.pressed()}>
                <Text style={styles.buttonText}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width:"60%",
        backgroundColor:"#fb5b5a",
        borderColor: 'white',
        borderWidth: 1,
        // opacity: 0.5,
        borderRadius:25,
        height:45,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom:10,
    },
    buttonText: {
        color:"white",
        fontFamily: "Montserrat-Medium",
    }
});