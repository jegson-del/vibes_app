import React  from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {connect} from "react-redux";
import I18n from "../../../utils/i18n";
import {Url} from "../../../utils/url";
import {Color} from "../../../utils/colors";
import axios from 'axios';
import NoDataMessage from "../../components/no-data-message";
import {setTickets, setUserEvents} from "../../../redux/actions/UserEventsAction";
import EventItem from "../../components/event-item";

class PaidEvents extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get(Url.user_events, {
            headers: Object.assign(Url.headers, {Authorization: 'Bearer ' + this.props.token})
        })
            .then(response => {
                this.props.updateUserEvents(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    seeTickets = (event) => {
        this.props.updateTickets(event)
        this.props.navigation.navigate('Tickets');
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.userEvents.length === 0 ?
                    <NoDataMessage
                        message={I18n.t("you_dont_have_any_event")}
                        size={25}
                    />
                    :
                    <FlatList
                        data={this.props.userEvents}
                        renderItem={
                            ({item}) => <EventItem
                                item={item}
                                view={this.seeTickets}
                                buttonText={item.tickets.length + ' ' + I18n.t("tickets")}
                            />
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

const mapStateToProps = (state) => {
    return {
        token: state.tokenReducer.token,
        userEvents: state.userEventsReducer.userEvents
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserEvents: (data) => dispatch(setUserEvents(data)),
        updateTickets: (event) => dispatch(setTickets(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaidEvents);