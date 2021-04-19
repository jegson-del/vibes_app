import React from "react";
import {StyleSheet, TouchableOpacity, View, Text} from "react-native";
import I18n from "../../utils/i18n";
import {Color} from "../../utils/colors";

export default function ModalTopLocations(props) {
    return (
        <View>
            <Text style={styles.topLocations}>{I18n.t('top_locations')}</Text>
            <View style={styles.locationSearchView}>

                {props.topLocations.map((prop, key) => {
                    return (
                        <View key={key}>
                            <TouchableOpacity
                                style={styles.locationSearchTouch}
                                onPress={() => props.action(prop.city)}
                            >
                                <Text style={styles.locationText}>{prop.city}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topLocations: {
        marginTop: 10,
        marginBottom: 12,
        marginLeft: 7,
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: 22,
    },
    locationSearchView: {
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    locationSearchTouch: {
        alignSelf:'baseline',
        margin: 10,
        backgroundColor: Color.label_buttons,
        borderRadius: 5,
    },
    locationText: {
        color: 'black',
        fontFamily: 'Montserrat-Regular',
        fontSize: 13,
        padding: 4,
    },
});

