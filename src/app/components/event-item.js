import React from "react";
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import I18n from "../../utils/i18n";
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import {Color} from "../../utils/colors";
import moment from "moment";
import {Images} from "../../utils/images";
import {serverImage, lowestPrice} from "../../utils/helpers";

export default class EventItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.card}>
                <View style={styles.overlay} />
                <TouchableOpacity onPress={()=> this.props.view(this.props.item)}>
                    <Image
                        source={{ uri: serverImage(this.props.item.flyer.link) }}
                        style={styles.backgroundImage} />
                </TouchableOpacity>

                <View style={styles.topBar}>
                    <Image source={Images.logo} style={styles.icon} />
                    <View style={styles.timeBar}>
                        <Icon name='money' size={16} color='white' />
                        <Text style={styles.time}>{lowestPrice(this.props.item)}</Text>
                        <Icon name='timer' size={16} color='white' />
                        <Text style={styles.time}>{moment(this.props.item.starts).format("MMMM Do, h:mm a")}</Text>
                    </View>
                </View>

                <View style={styles.bottomBar}>
                    <View style={styles.locationBar}>
                        <Icon name='location' type='evilicon' size={16} color='white' style={styles.locationIcon} />
                        <Text style={styles.club}>{this.props.item.location.city}</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => this.props.view(this.props.item)}>
                        {this.props.item.id % 2 === 0 ?
                            <LinearGradient
                                colors={Color.gradient}
                                style={styles.linearGradient}
                                TouchableOpacity
                            >
                                <Text style={styles.viewButton}>{this.props.buttonText || I18n.t("view")}</Text>
                            </LinearGradient>
                            :
                            <Text style={styles.normalViewButton}>{this.props.buttonText || I18n.t("view")}</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        height: 250,
        backgroundColor: 'black'
    },
    backgroundImage: {
        height: 250,
        backgroundColor: 'black',
        opacity: 0.5,
    },
    topBar: {
        flex: 1,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        height: 60,
        width: '100%'
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "white"
    },
    timeBar: {
        position: 'absolute',
        flexDirection: 'row',
        right: 10,
        marginTop: 10,
    },
    time: {
        marginLeft: 5,
        fontFamily: 'Montserrat-Regular',
        color: 'white',
    },
    bottomBar: {
        paddingLeft: 10,
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'black',
        opacity: 0.7,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    locationBar: {
        flexDirection: 'row',
    },
    locationIcon: {
        marginTop: 3,
    },
    club: {
        color: 'white',
        marginLeft: 5,
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
    },
    linearGradient: {
        borderRadius: 15,
        height: 30,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    viewButton: {
        opacity: 1,
        color: 'white',
        fontFamily: "Montserrat-Bold"
    },
    normalViewButton: {
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 1,
        height: 30,
        width: 100,
        textAlign: 'center',
        padding: 5,
        color: 'white',
        fontFamily: "Montserrat-Bold"
    },
});