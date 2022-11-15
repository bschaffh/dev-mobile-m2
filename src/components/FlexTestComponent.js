import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const FlexTestComponent = () => {
    return (
        <View style={styles.mainView}>
            <View style={styles.upperView}>
                <View style={styles.upperLeft}>
                    <View style={{backgroundColor:"yellow", height:50, width: 50}}/>
                    <View style={{backgroundColor:"yellow", height:50, width: 50}}/>
                </View>
                <View style={styles.upperCenter}>
                    <View style={{backgroundColor:"yellow", height:50, width: 50}}/>
                </View>
                <View style={styles.upperRight}>
                    <View style={styles.redPart}/>
                    <View style={styles.yellowPart}/>
                </View>
            </View>
            <View style={styles.lowerView}>
                <View style={styles.lowerViewCentered}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    upperView: {
        flex:2,
        flexDirection: "row"
    },
    lowerView: {
        flex: 1,
        backgroundColor:"cyan",
        justifyContent: "center",
        alignItems: "center"
    },
    lowerViewCentered: {
        backgroundColor: "yellow",
        height: '30%',
        width: '30%'
    },
    upperLeft: {
        backgroundColor: "skyblue",
        flex:2,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    upperCenter: {
        backgroundColor: "blue",
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },
    upperRight: {
        backgroundColor: "yellow",
        flex:1
    },
    redPart: {
        flex:4,
        backgroundColor: "red"
    },
    yellowPart: {
        flex:1,
        backgroundColor: "yellow"
    }
}

);

export default FlexTestComponent;