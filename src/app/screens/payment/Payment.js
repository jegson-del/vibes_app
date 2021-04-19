import React, { PureComponent } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Platform,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import stripe from 'tipsi-stripe';
import StripeButton from '../../components/stripe-button';
import I18n from "../../../utils/i18n";
import axios from "axios";
import {Url} from "../../../utils/url";
import {connect} from "react-redux";
import {Color} from "../../../utils/colors";
import moment from 'moment';
import {setUser} from "../../../redux/actions/UserAction";
import {serverImage, lowestPrice} from "../../../utils/helpers";

class Payment extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            stripToken: null,
            success: false,
            count: 1,
            amount: this.ticketIsFree() ? I18n.t('free') : I18n.t('select_your_tickets'),
            location: this.props.activeEvent.location,
            ticketQuantityType: {}
        }
    }

    componentDidMount() {
        stripe.setOptions({
            // publishableKey: 'pk_test_51HyWgFJJnYfLdwsXpDqaNts9toxLfYMzxYgxxEd2MJZVMupOAU8xvLgFxfYrgHeAzsxjHy3qmV9KRLfjTdFVttAe00h0kYmlUB'
            publishableKey: 'pk_live_51HyWgFJJnYfLdwsXFRZlssPtJBINRXVaG2ZaxrxQu0HoDLBZ6KejQ5SMvYibW0TaqxNshZecsFLbVLvsoSvFOs5L00Utq284Q5'
        });

        if(!this.props.user.name) {
            axios.get(Url.user, {
                headers: Object.assign(Url.headers, {Authorization: 'Bearer ' + this.props.token})
            })
                .then(response => {
                    this.props.updateUser(response.data.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handleCardPayPress = async () => {
        try {
            this.setState({ loading: true, stripToken: null })
            const stripToken = await stripe.paymentRequestWithCardForm({
                // Only iOS support this options
                smsAutofillDisabled: true,
                requiredBillingAddressFields: 'full',
                prefilledInformation: {
                    billingAddress: {
                        name: this.props.user.name,
                        line1: this.state.location.address,
                        line2: '',
                        city: this.state.location.city,
                        state: this.state.location.province,
                        country: '',
                        postalCode: this.state.location.post_code,
                        email: this.props.user.email,
                    },
                },
            })

            this.setState({ loading: false, stripToken }, function () {this.finalizePayment()})
        } catch (error) {
            console.log(error)
            this.setState({ loading: false }, function () {this.finalizePayment()})
        }
    }

    finalizeFreeEvent = () => {
        axios.post(Url.charge_card, {
            event_id: this.props.activeEvent.id,
            platform: Platform.OS === 'ios' ? 'iOS' : 'Android',
            token: 'free',
        }, {
            headers: Object.assign(Url.headers, {Authorization: 'Bearer ' + this.props.token})
        }).then(response => {
            this.setState({ success: true })
        }).catch(error => {
            console.log(error)
            console.log(error.response)
            alert(I18n.t('validation.reservation_error'));
        });
    }

    finalizePayment = () => {
        if(this.state.stripToken) {
            let ticketQuantityType = this.state.ticketQuantityType;

            this.props.activeEvent.prices.forEach(function (price) {
                delete ticketQuantityType['singleAmount' + price.id];

                if(!ticketQuantityType[price.id]) {
                    delete ticketQuantityType[price.id];
                }
            });

            axios.post(Url.charge_card, {
                event_id: this.props.activeEvent.id,
                platform: Platform.OS === 'ios' ? 'iOS' : 'Android',
                payment_type_and_quantity: ticketQuantityType,
                token: this.state.stripToken.tokenId,
            }, {
                headers: Object.assign(Url.headers, {Authorization: 'Bearer ' + this.props.token})
            })
                .then(response => {
                    this.setState({ success: true })
                })
                .catch(error => {
                    console.log(error)
                    console.log(error.response)
                    alert(I18n.t('validation.payment_error'));
                });
        } else {
            alert(I18n.t('validation.payment_could_not_be_processed'));
        }
    }

    updateTicketAmountType = (ticketType, quantity, amount) => {
        let ticketAmountType = this.state.ticketQuantityType;
        ticketAmountType[ticketType] = quantity;
        ticketAmountType['singleAmount'+ticketType] = amount;

        let fullAmount = 0.0;

        this.props.activeEvent.prices.forEach(function (price) {
            if(ticketAmountType[price.id]) {
                fullAmount += ticketAmountType[price.id] * ticketAmountType['singleAmount' + price.id];
            }
        });

        fullAmount = 'R'+ fullAmount;

        this.setState({ ticketQuantityType: ticketAmountType, amount: fullAmount})
    }

    ticketIsFree = () => {
        let price = lowestPrice(this.props.activeEvent);
        return price === 'R0' || price === '$0'
    }

    render() {
        let ticketPrices = [];

        for(let i = 0; i < this.props.activeEvent.prices.length; i++) {
            ticketPrices.push(
                <View key = {i} style={styles.addRemoveTicket}>
                    <Text style={styles.bold20}>{this.props.activeEvent.prices[i].type}</Text>
                    <TextInput
                        keyboardType={'number-pad'}
                        style={{height: Platform.OS === "ios" ? 25 : 50, width: 100, color: Color.black, fontFamily: "Montserrat-Medium"}}
                        placeholder={I18n.t("quantity")}
                        placeholderTextColor={Color.gray}
                        onChangeText={quantity => this.updateTicketAmountType(this.props.activeEvent.prices[i].id, quantity, this.props.activeEvent.prices[i].pivot.price)}
                    />
                </View>
            );
        }

        return (
            <View>
                {this.state.success ?
                    <View style={styles.successContainer}>
                        <Text style={styles.success}>{this.ticketIsFree() ? I18n.t('reservation_successful') : I18n.t('payment_successful')}</Text>
                    </View>
                    :
                    <ScrollView>
                        <KeyboardAvoidingView styles={styles.container} behavior='padding'>
                            <View behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainContainer}>
                                <Image
                                    style={styles.eventImage}
                                    source={{uri: serverImage(this.props.activeEvent.flyer.link)}}
                                />
                                <View style={styles.imageBottomRow}>
                                    <Text style={styles.imageBottomRowDate}>{moment(this.props.activeEvent.starts).format("MMMM Do, h:mm a")}</Text>
                                    <Text style={styles.imageBottomRowTitle}>{this.props.activeEvent.name}</Text>
                                </View>

                                <View style={styles.ticketSection}>
                                    <Text style={styles.bold20}>{this.state.amount}</Text>
                                    {ticketPrices}
                                </View>

                                {!this.ticketIsFree() ?
                                    <StripeButton
                                        text={I18n.t('enter_card_details')}
                                        loading={this.state.loading}
                                        onPress={this.handleCardPayPress}
                                    />
                                    : <TouchableOpacity style={styles.freeTicketButton} onPress={() => this.finalizeFreeEvent()}>
                                        <Text>{I18n.t('reserve_your_ticket')}</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    successContainer: {
        flexGrow: 1,
        marginTop: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    success: {
        color: Color.success,
        fontSize: 15,
        width: '100%',
        textAlign: 'center',
        fontFamily: "Montserrat-Regular",
        padding: 5,
    },
    mainContainer: {
        flex: 1,
    },
    eventImage: {
        width: '100%',
        height: 390,
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
    ticketSection:{
        backgroundColor:Color.white,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: Color.black,
        padding: 10,
        margin: 3,
    },
    addRemoveTicket: {
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    bold20: {
        paddingTop: 5,
        fontSize:20,
        fontWeight:'bold',
        marginBottom: 20,
    },
    imageBottomRow:{
        position: 'absolute',
        top: 270,
        height: 120,
        width: '100%',
        backgroundColor: Color.main,
        opacity: 0.94,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    freeTicketButton: {
        borderColor: Color.gray,
        borderWidth: 2,
        margin: 10,
        borderRadius: 2,
        padding: 9,
        backgroundColor: Color.white,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        token: state.tokenReducer.token,
        activeEvent: state.eventsReducer.activeEvent
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (condition) => dispatch(setUser(condition))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);