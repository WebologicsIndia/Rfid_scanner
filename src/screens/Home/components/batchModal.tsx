import React, {useState} from "react";
import {Modal, Pressable, StyleSheet, View, ActivityIndicator} from "react-native";
import {theme} from "../../../config/theme";
import {borderRadius, H7, height, Input, padding, width} from "@WebologicsIndia/react-native-components";
import {batchUrl} from "../../../config/api";
const BatchModal = (props:{
    modalVisible:boolean,
    setModalVisible:React.Dispatch<React.SetStateAction<boolean>>
    setRfIdData: any,
    latitude:number,
    longitude:number,
    filteredData:any
}) => {

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const[value, setValue] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (value:any) => {
        setValue(value);
    };
    const batchApi = () => {
        setLoading(true);
        fetch(batchUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                latitude: props.latitude,
                longitude: props.longitude,
                name: value,
                tags: Array.from(props.filteredData)
            })
        }).then((resp) => {
            if (resp.status === 200){
                setValue("");
                props.setModalVisible(false);
            }
        }).catch(() => {
            setLoading(false);
        }).finally(() => {
            setLoading(false);
            props.setRfIdData(new Set());
            props.setModalVisible(false);
        });
    };

    if(loading){
        return <ActivityIndicator size={"large"}/>;
    }
    return (
        <Modal
            visible={props.modalVisible}
            transparent
        >
            <Pressable
                style={styles.centeredView}
                // onPress={() => {
                //     props.setModalVisible(false);
                //     setIsFocused(false);
                // }}
            >
                <View style={styles.modalView}>
                    <H7 style={{color: theme.PrimaryDark, fontWeight: "500"}}>New Batch</H7>
                    <View style={{flex: 1, marginTop: 35}}>
                        <Input
                            inputStyle={{borderBottomWidth: 1, borderBottomColor: isFocused ? theme.Accent : theme.PrimaryDark}}
                            textStyle={[{color: theme.PrimaryDark}, styles.input]}
                            bgColor={theme.White}
                            onFocus={handleFocus}
                            onChangeText={(value) => handleInputChange(value)}
                        />
                    </View>
                    <View style={{flexDirection: "row", gap: 30, marginLeft: "auto"}}>
                        <Pressable onPress={() => {
                            props.setModalVisible(false);
                            setIsFocused(false);
                        }}>
                            <H7 style={{textTransform: "uppercase", color: theme.Accent}}>Cancel</H7>
                        </Pressable>
                        <Pressable onPress={batchApi}>
                            <H7 style={{textTransform: "uppercase", color: theme.Accent}}>oK</H7>
                        </Pressable>
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
        ...padding.p5,
        elevation: 3,
        backgroundColor: theme.White,
        overflow: "hidden"
    },
    input: {
        borderWidth: 0,
        ...padding.py0
    }
});
export default BatchModal;
