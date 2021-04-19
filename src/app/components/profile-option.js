import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Color} from "../../utils/colors";
import CustomIcon from "./custom-icon";

export default function ProfileOption(props) {
    return (
        <TouchableOpacity onPress={() => props.action() } style={styles.options}>
            <CustomIcon name={props.icon1_name} color={props.icon1_color} size={28} />
            <Text style={styles.text}>{props.text}</Text>
            <CustomIcon action={this.closeSearchModal} name="caret-forward-outline" type="ionicon" color='grey' size={28} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    options: {
        flexDirection: 'row',
        backgroundColor: Color.profile_pics,
        height: 50,
        borderRadius: 20,
        padding: 10,
        paddingTop: 12,
        justifyContent: 'space-between',
        marginBottom: 10
    },
    text: {
        paddingTop: 5,
        fontSize: 18,
        fontFamily: "Montserrat-Regular",
        color: Color.gray
    }
});