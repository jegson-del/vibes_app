import React from 'react';
import {StyleSheet, View} from 'react-native';
import { ButtonGroup as BG } from 'react-native-elements'
import {Color} from "../../utils/colors";

export default class ButtonGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const buttons = this.props.options
        const { selectedIndex } = this.props.selectedIndex

        return (
            <View style={styles.menu}>
                <BG
                    onPress={this.props.onSelected}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={styles.topMenu}
                    selectedButtonStyle={styles.selectedMenuButton}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topMenu: {
        height: 35,
        borderRadius: 25,
    },
    menu: {
        backgroundColor: 'white',
        paddingBottom: 15
    },
    selectedMenuButton: {
        backgroundColor: Color.main,
    },
});