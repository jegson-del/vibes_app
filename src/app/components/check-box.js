import React from "react";
import {StyleSheet, View, Text} from "react-native";
import CheckBox from '@react-native-community/checkbox';
import I18n from "../../utils/i18n";

export default function FormErrorDisplay(props) {
    return (
        <View style={styles.view}>
            <CheckBox
                disabled={false}
                // value={props.toggle}
                tintColor='white'
                onFillColor='white'
                onCheckColor='green'
                onTintColor='green'
                onValueChange={(newValue) => props.toggleCheckbox(newValue)}
            />
            <Text style={styles.text}>{I18n.t("above_18")}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        width: '80%',
        marginTop: 10
    },
    text: {
        color: 'white',
        marginTop: 5,
        marginLeft: 10,
        fontSize: 15,
        fontFamily: "Montserrat-Medium",
    }
});