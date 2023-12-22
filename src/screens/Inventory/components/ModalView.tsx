
import {Pressable, StyleSheet, View} from "react-native";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ScanIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {theme} from "../../../config/theme";
import {borderRadius,  H7, height, padding, width} from "@WebologicsIndia/react-native-components";
import React from "react";

const ModalView = (props:any) => {
    console.log(props);

    return (
        <View
            style = {styles.modalView}
        >
            {/*<Pressable onPress={props.setModalVisible} style={styles.close}>*/}
            {/*    <ScanIcon name={"close-circle-outline"} color={theme.Primary} size={40}/>*/}
            {/*</Pressable>*/}

            <View style={{flexDirection: "row"}}>
                <H7 style = {{color: theme.Primary}}>Message: </H7>
                <H7 style = {{color: theme.Primary}}>{props.data.message ? props.data.message: props.data}</H7>
            </View>
            <View style={{flexDirection: "row"}}>
                <H7 style = {{color: theme.Primary}}>Tags Added: </H7>
                <H7 style = {{color: theme.Primary}}>{props.data.message ? props.data.totalTagsAdded : "0"}</H7>
            </View>
            <View style={{flexDirection: "row"}}>
                <H7 style = {{color: theme.Primary}}>Duplicate Tags: </H7>
                <H7 style = {{color: theme.Primary}}>{props.data.message ? props.data.duplicateTags: "0"}</H7>
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    centeredView: {
        height: "100%",
        width: "100%",
        backgroundColor: theme.PrimaryLight + "80"
    },
    modalView: {
        ...width.w18,
        ...height.h6,
        ...borderRadius.br4,
        marginHorizontal: width.w3.width,
        marginVertical: (height.h24.height - width.w18.width) / 2,
        shadowColor: theme.Primary,
        ...padding.p3,
        elevation: 3,
        backgroundColor: theme.White,
        overflow: "hidden"
    },
    input: {
        borderWidth: 0,
        ...padding.py0
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        ...padding.py4
    },
    close: {
        alignSelf: "flex-end"
    }
});
export default ModalView;
