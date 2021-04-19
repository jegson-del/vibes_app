import React from "react";
import {StyleSheet, View, Text} from "react-native";
import { Icon } from 'react-native-elements'

export default function FormErrorDisplay(props) {
    return (
        <View style={styles.error_view}>
            <Icon name="error" size={22} color="white" />
            <Text style={styles.error}>{props.error}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    error_view: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'center',
    },
    error: {
        paddingTop: 3,
        marginLeft: 5,
        color: "white",
        fontSize: 12,
        fontFamily: "Montserrat-Medium",
        marginBottom: 10,
    },
});