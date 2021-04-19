import React from 'react';
import {Image, Share, Linking, ScrollView, Alert, View, StyleSheet, Text, TouchableOpacity, Modal} from 'react-native';
import {connect} from "react-redux";
import {Color} from "../../../utils/colors";
import CustomIcon from "../../components/custom-icon";
import FullWidthButton from "../../components/full-width-button";
import I18n from "../../../utils/i18n";
import moment from "moment";
import {setEventAfterDelete} from "../../../redux/actions/EventsAction";
import axios from "axios";
import {Url} from "../../../utils/url";
import {lowestPrice, removeFromArray, serverImage} from "../../../utils/helpers";

class Event extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageModalVisible: false,
        }
    }

    buyTicket = () => {
        if(this.props.token) {
            this.props.navigation.navigate('PaymentScreen');
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    share = async () => {
        try {
            const result = await Share.share({
                message: 'This event has been shared with you from vibes app: quoteapp://event/' + this.props.activeEvent.id,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    openMap = () => {
        const latitude = "40.7127753";
        const longitude = "-74.0059728";
        const label = this.props.activeEvent.location.address + ' ' + this.props.activeEvent.location.city;

        const url = Platform.select({
            ios: "maps:" + "?q=" + label,
            android: "geo:" + "?q=" + label,
            // ios: "maps:" + latitude + "," + longitude + "?q=" + label,
            // android: "geo:" + latitude + "," + longitude + "?q=" + label
        });
        Linking.openURL(url);
    }

    modalDisplay = () => {
        this.setState({ imageModalVisible: this.state.imageModalVisible ? false : true });
    }

    findLowestPrice = () => {
        let price = lowestPrice(this.props.activeEvent);

        return price === 'R0' || price === '$0'
            ? I18n.t('free')
            : I18n.t('tickets') + ' ' + I18n.t('from') + ' ' + lowestPrice(this.props.activeEvent)
    }

    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={()=> this.modalDisplay()}>
                    <Image
                        style={styles.eventImage}
                        source={{ uri: serverImage(this.props.activeEvent.flyer.link) }}
                    />
                </TouchableOpacity>

                <View style={styles.imageTopRow}>
                    <View style={styles.imageTopRowTextView}>
                        <Text style={styles.imageTopRowText}>{this.props.activeEvent.status}</Text>
                    </View>
                    <CustomIcon action={this.share} name="share" color='black' size={28} />
                </View>

                <View style={styles.imageBottomRow}>
                    <Text style={styles.imageBottomRowDate}>{moment(this.props.activeEvent.starts).format("MMMM Do, h:mm a")}</Text>
                    <Text numberOfLines={1} style={styles.imageBottomRowTitle}>{this.props.activeEvent.name}</Text>
                    <Text style={styles.imageBottomRowTitle}>
                        {this.findLowestPrice()}
                    </Text>
                </View>

                <View style={styles.body}>
                    <Text style={styles.bodyTextTitle}>{I18n.t("about")}</Text>
                    <Text style={styles.bodyText}>{this.props.activeEvent.description}</Text>

                    <Text style={styles.bodyTextTitle}>{I18n.t("location")}</Text>
                    <TouchableOpacity style={styles.locationView} onPress={() => this.openMap()}>
                        <CustomIcon name="explore" color={Color.main} size={21} />
                        <Text style={styles.bodyLocation}>{this.props.activeEvent.location.address} {this.props.activeEvent.location.city}</Text>
                    </TouchableOpacity>

                    <Text style={styles.bodyTextTitle}>{I18n.t("genre")}</Text>
                    <Text style={styles.bodyText}>{this.props.activeEvent.genre}</Text>

                    <FullWidthButton pressed={this.buyTicket} title={
                        this.findLowestPrice() === I18n.t('free')
                            ? I18n.t("book_ticket") : I18n.t("buy_ticket")
                        }
                    />
                </View>

                <Modal
                    animationType="slide"
                    visible={this.state.imageModalVisible}>
                    <TouchableOpacity style={{ backgroundColor: Color.black, justifyContent: 'center' }} onPress={()=> this.modalDisplay()}>
                        <Image style={{ width: '100%', height: '100%' }} resizeMode='contain' source={{ uri: serverImage(this.props.activeEvent.flyer.link) }} />
                    </TouchableOpacity>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    eventImage: {
        width: '100%',
        height: 390,
    },
    imageTopRow: {
        position: 'absolute',
        top: 20,
        height: 50,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10
    },
    imageBottomRow: {
        position: 'absolute',
        top: 276,
        width: '100%',
        backgroundColor: Color.main,
        opacity: 0.95,
        justifyContent: 'center',
        padding: 20,
    },
    imageBottomRowTitle: {
        color: Color.white,
        fontSize: 25,
        fontFamily: "Montserrat-ExtraBold",
    },
    imageBottomRowDate: {
        color: Color.black,
        fontSize: 15,
        fontFamily: "Montserrat-Bold",
    },
    imageTopRowTextView: {
        borderRadius: 15,
        backgroundColor: Color.white,
        height: 30,
        width: 60,
        paddingTop: 5,
        alignItems: 'center',
    },
    imageTopRowText: {
        fontSize: 13,
        color: Color.black,
        fontFamily: "Montserrat-SemiBold",
    },
    body: {
        margin: 20,
        backgroundColor: Color.white,
    },
    bodyTextTitle: {
        marginTop: 15,
        color: Color.black,
        fontSize: 22,
        fontFamily: "Montserrat-SemiBold",
    },
    bodyText: {
        marginTop: 15,
        fontSize: 14,
        color: Color.gray,
        fontFamily: "Montserrat-Regular",
    },
    locationView: {
        flexDirection: 'row',
        marginTop: 15,
    },
    bodyLocation: {
        marginLeft: 10,
        fontSize: 14,
        color: Color.main,
        fontFamily: "Montserrat-Regular",
    },
    adminSection: {
        margin: 8,
        marginTop: 20,
        borderWidth: 1,
        padding: 10,
        borderColor: Color.gray
    },
    adminSectionTitle: {
        fontSize: 25,
        fontFamily: "Montserrat-SemiBold",
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        events: state.eventsReducer.events,
        token: state.tokenReducer.token,
        activeEvent: state.eventsReducer.activeEvent,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateEventAfterDelete: (condition) => dispatch(setEventAfterDelete(condition))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);