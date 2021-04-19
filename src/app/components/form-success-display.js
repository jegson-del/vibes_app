import React from "react";
import {StyleSheet, View, Text} from "react-native";
import { Icon } from 'react-native-elements'

export default function FormErrorDisplay(props) {
    return (
        <View style={styles.success_view}>
            <Icon name="email" size={22} color="white" style={styles.icon} />
            <Text style={styles.success}>{props.message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    success_view: {
        flexDirection: 'row',
        width: '80%',
        height: 35,
        backgroundColor: 'green',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5,
    },
    icon: {
        marginTop: 6,
    },
    success: {
        marginTop: 5,
        paddingTop: 5,
        marginLeft: 5,
        color: "white",
        fontSize: 12,
        fontFamily: "Montserrat-Medium",
        marginBottom: 10,
    },
});