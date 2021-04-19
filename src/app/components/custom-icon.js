import React from "react";
import {TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import {Color} from "../../utils/colors";

export default function CustomIcon(props) {
    return (
        <TouchableOpacity onPress={() => props.action}>
            <Icon
                name={props.name}
                size={props.size ? props.size : 22}
                color={props.color ? props.color : Color.grey}
                onPress={props.action ? () => props.action() : null}
                type={props.type ? props.type : 'material-icons'}
            />
        </TouchableOpacity>
    );
}