import {Color} from "../../../utils/colors";

global.Buffer = global.Buffer || require('buffer').Buffer

import React from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';
import {connect} from "react-redux";
import QRCode from 'react-native-qrcode-image';
import moment from "moment";
import I18n from "../../../utils/i18n";

class Tickets extends React.Component {
    constructor(props) {
        super(props);
    }

    ticketType = (item) => {
        let type = null;

        for (let i = 0; i < this.props.tickets.prices.length; i++) {
            if (this.props.tickets.prices[i].id == item.price_type_id) {
                type = this.props.tickets.prices[i].type;
                break;
            }
        }

        return type;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>{I18n.t('present_ticket_at_gate')}</Text>
                <Text style={styles.bought_date}>{I18n.t("paid") + ' ' + moment(this.props.tickets.tickets[0].created_at).format("MMMM Do, h:mm a")}</Text>

                <FlatList
                    data={this.props.tickets.tickets}
                    renderItem={({item, index}) =>
                        <View style={styles.qrView}>
                            <View style={{ marginRight: 10 }}>
                                <Text style={styles.type}>{this.ticketType(item)}</Text>
                                <Text style={styles.type}>{item.id.slice(0,8)}</Text>
                            </View>
                            <QRCode
                                value={item.id}
                                // fgColor={'#FFFFFF'}
                                size={120}
                                // bgColor={'#E67C21'}
                            />
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    header: {
        fontSize: 15,
        fontFamily: "Montserrat-Bold",
        color: Color.black,
        marginBottom: 10,
        marginTop: 20,
    },
    bought_date: {
        fontSize: 13,
        marginBottom: 20,
        fontFamily: "Montserrat-SemiBoldItalic",
    },
    qrView: {
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    type: {
        fontSize: 13,
        fontFamily: "Montserrat-Bold",
    }
});

const mapStateToProps = (state) => {
    return {
        tickets: state.userEventsReducer.tickets
    }
}

export default connect(mapStateToProps)(Tickets);