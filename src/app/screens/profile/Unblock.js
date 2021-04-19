import React  from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import {connect} from "react-redux";
import I18n from "../../../utils/i18n";
import {Url} from "../../../utils/url";
import axios from 'axios';
import {removeFromArray} from "../../../utils/helpers";
import EventItem from "../../components/event-item";

class Unblock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            blockedEvents: [],
        }
    }

    componentDidMount() {
        axios.get(Url.user_see_blocked_events, {
            headers: Object.assign(Url.headers, {Authorization: 'Bearer ' + this.props.token})
        })
            .then(response => {
                this.setState({ blockedEvents: response.data.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    unblock = (event, key) => {
        axios.delete(Url.user_unblock_events + event.id, {
            headers: Object.assign(Url.headers, {Authorization: 'Bearer ' + this.props.token})
        })
            .then(response => {
                this.setState({ blockedEvents: removeFromArray(this.state.blockedEvents, key) });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.blockedEvents.length === 0 ?
                    <View style={styles.no_data_view}>
                        <Text style={styles.no_data_text}>{I18n.t("no_blocked_event")}</Text>
                    </View>
                    :
                    <FlatList
                        data={this.state.blockedEvents}
                        renderItem={
                            ({item}) => <EventItem
                                item={item}
                                view={this.unblock}
                                buttonText={I18n.t("unblock")}
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
    },
});

const mapStateToProps = (state) => {
    return {
        token: state.tokenReducer.token
    }
}

export default connect(mapStateToProps)(Unblock);