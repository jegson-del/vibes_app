import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {connect} from "react-redux";
import {setFirstTime} from "../../redux/actions/FirstTimeAction";
import {setToken} from "../../redux/actions/TokenAction";
import {getData} from "../../utils/storage";
import {Images} from "../../utils/images";

class SplashScreen extends React.Component {
    componentDidMount() {
        getData('token').then((value) => {
            this.props.updateToken(value);
        })

        setTimeout(() => {
            this.props.updateFirstTime(false);
        }, 3000);
    }

    render() {
        return (
            <ImageBackground style={styles.background} source={Images.splash}></ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%',
    },
})

const mapStateToProps = (state) => {
    return {
        firstTime: state.firstTimeReducer.isFirstTime,
        token: state.tokenReducer.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateFirstTime: (condition) => dispatch(setFirstTime(condition)),
        updateToken: (condition) => dispatch(setToken(condition))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);