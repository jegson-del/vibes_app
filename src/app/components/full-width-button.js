import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Color} from "../../utils/colors";

export default function FullWidthButton(props) {
    return (
        <TouchableOpacity style={styles.buttonView} onPress={() => props.pressed()}>
            <Text style={styles.button}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonView: {
        width: "100%",
        backgroundColor: Color.main,
        borderColor: 'white',
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    button: {
        color: "white",
        fontFamily: "Montserrat-Medium",
    }
});