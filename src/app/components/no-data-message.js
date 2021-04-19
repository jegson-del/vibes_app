import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Color} from "../../utils/colors";

export default function NoDataMessage(props) {
    return (
        <View style={styles.no_data_view}>
            <Text style={[styles.no_data_text, {fontSize: props.size || 28}]}>{props.message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    no_data_view: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    no_data_text: {
        fontFamily: "Montserrat-SemiBold",
        color: Color.gray
    }
});