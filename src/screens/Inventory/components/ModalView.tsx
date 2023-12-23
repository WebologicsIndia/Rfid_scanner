
import {Modal, Pressable, StyleSheet, View} from "react-native";
import {theme} from "../../../config/theme";
import {borderRadius,  H7, height, padding, width} from "@WebologicsIndia/react-native-components";
import React from "react";

const ModalView = (props:any) => {
    return (
        <Modal
            visible={props.modalVisible}
            transparent

        >
            <Pressable
                style={styles.centeredView}
                onPress={props.setModalVisible}
            >
                <View
                    style = {[styles.modalView, {justifyContent: "center", alignItems: "center"}]}
                >
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <H7 style = {{color: theme.Primary, fontWeight: "bold"}}>Message:   </H7>
                            <H7 style = {{color: theme.Primary}}>{props.data.message ? props.data.message: "Error Scanning Tags"}</H7>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <H7 style = {{color: theme.Primary, fontWeight: "bold"}}>Tags Added:    </H7>
                            <H7 style = {{color: theme.Primary}}>{props.data.totalTagsAdded ? props.data.totalTagsAdded : 0}</H7>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <H7 style = {{color: theme.Primary, fontWeight: "bold"}}>Duplicate Tags:    </H7>
                            <H7 style = {{color: theme.Primary}}>{props.data.duplicateTags ? props.data.duplicateTags: 0}</H7>
                        </View>
                    </View>

                </View>
            </Pressable>
        </Modal>
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
