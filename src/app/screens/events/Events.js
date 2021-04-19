import React  from 'react';
import {StyleSheet, Linking, FlatList, Modal, View, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import EventItem from "../../components/event-item";
import {connect} from "react-redux";
import I18n from "../../../utils/i18n";
import {Url} from "../../../utils/url";
import {Color} from "../../../utils/colors";
import ButtonGroup from "../../components/button-group"
import CustomIcon from "../../components/custom-icon"
import {setEvents, setEventsType, setActiveEvent, setTopLocations} from "../../../redux/actions/EventsAction";
import axios from 'axios';
import CustomTextInput from "../../components/custom-text-input";
import LinearGradient from "react-native-linear-gradient";
import ModalTopLocations from "../../components/modal-top-locations";
import {Icon} from "react-native-elements";

const NORMAL_EVENTS = 0;
const FEATURED_EVENTS = 1;
const SEARCH_EVENTS = 2;

class Events extends React.Component {
    static navigationOptions = ({ navigation, route }) => {
        return {
            title: I18n.t("events"),
            shadowColor: 'transparent',
            headerStyle: { backgroundColor: Color.events_header, shadowColor: 'transparent' },
            headerRight: () => (
                <TouchableOpacity onPress={() => route.params.openSearchModel2() }>
                    <Icon
                        name="search"
                        size={22}
                        color={Color.grey}
                        style={{marginRight: 10}}
                    />
                </TouchableOpacity>
            )
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            selectedIndex: 0,
            current_event_type: NORMAL_EVENTS,
            searchModalVisible: false,
        }

        this.updateMenuIndex = this.updateMenuIndex.bind(this)
    }

    componentDidMount() {
        this.fetchEvents(this.state.page, NORMAL_EVENTS);
        this.fetchTopLocations(this.state.page, NORMAL_EVENTS);
        //when user is redirected from shared link
        this.deepLinked();

        const { route } = this.props;
        route.params = this;
    }

    openSearchModel() {
        this.setState({ searchModalVisible: true });
    }

    openSearchModel2 = () => {
        this.setState({ searchModalVisible: true });
    }

    closeSearchModal = () => {
        this.setState({searchModalVisible: false})
    }

    deepLinked = () => {
        Linking.getInitialURL().then(url => {
            this.navigateHandler(url);
        });

        if (Platform.OS === 'ios') {
            Linking.addEventListener('url', this.handleOpenURL);
        }

        return () => {
            if (Platform.OS === 'ios') {
                Linking.removeEventListener('url', this.handleOpenURL);
            }
        };
    }

    handleOpenURL = (event) => {
        this.navigateHandler(event.url);
    }

    navigateHandler = async (url) => {
        if (url) {
            const route = url.replace(/.*?:\/\//g, '');
            const id = route.match(/\/([^\/]+)\/?$/)[1];

            this.setState({current_event_type: NORMAL_EVENTS});

            axios.get(Url.events + '/single/' + id)
                .then(response => {
                    setTimeout(() => {
                        this.props.updateActiveEvent(response.data.data);
                        this.props.navigation.navigate('EventScreen');
                    }, 1000);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    fetchEvents(page, type) {
        let filterChanged = this.state.current_event_type !== type ? true : false

        this.setState({current_event_type: type});

        let url = type === FEATURED_EVENTS
            ? Url.events + '?page=' + page + '&featured=1'
            : Url.events + '?page=' + page

        axios.get(url)
            .then(response => {
                this.props.updateEvents({
                    'events': response.data.data,
                    'type': type,
                    'filter_changed': filterChanged,
                });

                this.props.updateEventsType(type);
            })
            .catch(error => {
                console.log(error);
            });
    }

    fetchTopLocations() {
        axios.get(Url.top_locations)
            .then(response => {
                this.props.updateTopLocations(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    onScrollHandler = () => {
        if(this.state.current_event_type === NORMAL_EVENTS) {
            this.setState({
                page: this.state.page + 1
            }, () => {
                this.fetchEvents(this.state.page, this.state.current_event_type);
            });
        }
    }

    updateMenuIndex (selectedIndex) {
        this.setState({selectedIndex})

        this.setState({
            page: this.state.page + 1
        });

        if(selectedIndex === NORMAL_EVENTS && this.props.eventsType !== NORMAL_EVENTS) {
            this.props.updateEventsType(NORMAL_EVENTS);
            this.fetchEvents(1, NORMAL_EVENTS);
        } else if(selectedIndex === FEATURED_EVENTS && this.props.eventsType !== FEATURED_EVENTS) {
            this.props.updateEventsType(FEATURED_EVENTS);
            this.fetchEvents(1, FEATURED_EVENTS);
        }
    }

    view = (event) => {
        this.props.updateActiveEvent(event);
        this.props.navigation.navigate('EventScreen');
    }

    filter = (search) => {
        this.setState({ current_event_type: SEARCH_EVENTS });

        let url = Url.search + search;

        axios.get(url)
            .then(response => {
                this.props.updateEvents({'events': response.data.data, 'type': SEARCH_EVENTS});
                this.props.updateEventsType(SEARCH_EVENTS);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <ButtonGroup
                    options={[I18n.t("recent"), I18n.t("featured")]}
                    selectedIndex={this.state}
                    onSelected={this.updateMenuIndex}
                />

                <FlatList
                    data={this.props.events}
                    renderItem={({item}) => <EventItem
                        item={item}
                        view={this.view} />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={this.onScrollHandler}
                    onEndReachedThreshold={0.01}
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.searchModalVisible}>
                    {/*<KeyboardAvoidingView*/}
                    {/*    behavior={Platform.OS === "ios" ? "padding" : "height"}*/}
                    {/*    style={styles.searchAvoidingView}>*/}
                    <LinearGradient
                        colors={Color.gradient}
                        style={styles.searchModal}>
                        <View style={styles.modalSearchRow}>
                            <CustomTextInput
                                placeholder={I18n.t("search")}
                                update={this.filter}
                                returnKeyType="done"
                            />
                            <View
                                style={styles.cancelView}
                                onPress={() => {this.setState({searchModalVisible: false})}}>
                                <CustomIcon action={this.closeSearchModal} name="cancel" color='white' size={28} />
                            </View>
                        </View>

                        <ModalTopLocations
                            topLocations={this.props.topLocations}
                            action={this.filter}
                        />
                    </LinearGradient>
                    {/*</KeyboardAvoidingView>*/}
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchModal: {
        height: '50%',
        marginTop: 'auto',
        padding: 10,
        backgroundColor: Color.white,
    },
    modalSearchRow: {
        flexDirection: 'row'
    },
    cancelView: {
        marginLeft: 30,
        marginTop: 8,
    },
    searchIconView: {
        marginRight: 10
    }
});

const mapStateToProps = (state) => {
    return {
        events: state.eventsReducer.events,
        eventsType: state.eventsReducer.eventsType,
        topLocations: state.eventsReducer.topLocations,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateEvents: (data) => dispatch(setEvents(data)),
        updateEventsType: (type) => dispatch(setEventsType(type)),
        updateActiveEvent: (event) => dispatch(setActiveEvent(event)),
        updateTopLocations: (event) => dispatch(setTopLocations(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);