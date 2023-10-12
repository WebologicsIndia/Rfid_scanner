import React from "react";
import {Modal, Pressable, StyleSheet, View} from "react-native";
import {borderRadius, H7, height, margin, padding, width} from "@WebologicsIndia/react-native-components";
import {theme} from "../config/theme";

const modalData = ["Contains", "Does Not Contain", "Equals", "Not Equal", "Starts With", "Ends With"];
const FilterModal = (props: {
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setValue: React.Dispatch<React.SetStateAction<string>>
}) => {
    const handleModelItem= (item: string) => {
        props.setValue(item);
        props.setModalVisible(!props.modalVisible);
    };
    return (
        <Modal
            visible={props.modalVisible}
            transparent
        >
            <Pressable
                style={styles.centeredView}
                onPress={() => props.setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    {
                        modalData.map((item: string) => {
                            return (
                                <React.Fragment key={item}>
                                    <Pressable onPress={() => handleModelItem(item)}>
                                        <H7 style={{color: theme.White, ...margin.my2}}>{item}</H7>
                                    </Pressable>
                                    <View style={styles.hairlineBorder}/>
                                </React.Fragment>
                            );
                        })
                    }
                </View>
            </Pressable>
        </Modal>
    );
};

export default FilterModal;
const styles = StyleSheet.create({
    centeredView: {
        height: "100%",
        width: "100%",
        backgroundColor: theme.PrimaryLight + "60"
    },
    modalView: {
        ...width.w18,
        aspectRatio: 1,
        ...borderRadius.br4,
        marginHorizontal: width.w3.width,
        marginVertical: (height.h24.height - width.w18.width) / 2,
        shadowColor: theme.Primary,
        ...padding.p4,
        elevation: 3,
        backgroundColor: theme.PrimaryLight,
        overflow: "hidden"
    },
    hairlineBorder: {
        height: StyleSheet.hairlineWidth,
        ...width.w24,
        marginLeft: -width.w1.width,
        backgroundColor: theme.TextLight + "60",
    }
});
