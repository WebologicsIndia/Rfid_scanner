import React, {useState} from "react";
import {Modal, Pressable, StyleSheet, View, ActivityIndicator, FlatList} from "react-native";
import {theme} from "../../../config/theme";
import {
    Block,
    borderRadius,
    H7,
    height,
    Input,
    margin,
    padding,
    width
} from "@WebologicsIndia/react-native-components";
import {batchUrl, clientUrl} from "../../../config/api";
import {fetchWithToken} from "../../../config/helper";
import ModalView from "../../Inventory/components/ModalView";
import ModalBatchView from "./ModalBatchView";

const BatchModal = (props: {

  modalVisible: boolean,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setRfIdData: any,
  latitude: number,
  longitude: number,
  filteredData: any
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const [values, setValues] = useState<{ [key: string]: string }>({
        name: "",
        assignedTo: ""
    });
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState();
    const [clientData, setClientData] = useState([]);
    const [selectedClient, setSelectedClient] = useState<any>(null);

    const handleInputChange = (name: string, value: string) => {
        if (name === "assignedTo") {
            setLoading(true);
            setSelectedClient(value);
            fetchWithToken(`${clientUrl}?name=${value}`, "GET", "").then((resp) => {
                if (resp.status === 200) {
                    resp.json().then((data) => {
                        setClientData(data.results);
                    });
                }
            });

        } else {
            setValues((prevValues) => ({
                ...prevValues,
                [name]: value
            }));
        }
        setLoading(false);
    };
    const handleNameSelect = (client: any) => {

        setValues((prevValues) => ({
            ...prevValues,
            ["assignedTo"]: client.name
        }));
        setSelectedClient(client);
        setClientData([]);
    };
    const batchApi = () => {
        setLoading(true);
        const body = {
            latitude: props.latitude,
            longitude: props.longitude,
            name: values.name,
            tags: Array.from(props.filteredData),
            assignedTo: selectedClient._id
        };
        fetchWithToken(batchUrl, "POST", "", JSON.stringify(body))
            .then((resp) => {
                if (resp.status === 200) {
                    setValues({
                        name: "",
                        assignedTo: ""
                    });
                    props.setModalVisible(false);
                } else {
                    resp.json().then((data) => {
                        if (data.newTags) {
                            setModalData(data.newTags);
                            setModalVisible(true);
                        }
                    });
                }
            }).catch(() => {
                setLoading(false);
            }).finally(() => {
                setLoading(false);
                props.setRfIdData(new Set());
                props.setModalVisible(false);
                setSelectedClient(null);
            });
    };

    if (loading) {
        return <ActivityIndicator size={"large"} />;
    }
    return (
        <>
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
                        <View style={{flex: 1}}>
                            <Input
                                inputStyle={[{
                                    borderBottomWidth: 1,
                                    borderBottomColor: isFocused ? theme.Accent : theme.PrimaryDark
                                }, margin.mb4]}
                                textStyle={[{color: theme.PrimaryDark}, styles.input]}

                                bgColor={theme.White}
                                placeholder={"Assigned To"}
                                placeholderTextColor={theme.PrimaryLight}
                                onFocus={handleFocus}
                                value={selectedClient ? selectedClient.name : ""}
                                onChangeText={(value) => handleInputChange("assignedTo", value)}
                            />
                            {clientData.length ?
                                <View>
                                    <FlatList
                                        data={clientData}
                                        renderItem={({item}: any) => {
                                            return <Block
                                                fluid

                                            >
                                                <Pressable onPress={() => handleNameSelect(item)}>
                                                    <H7 style={{color: theme.Primary}}>{item.name}</H7>
                                                </Pressable>
                                            </Block>;

                                        }}
                                    />
                                </View>
                                : <></>
                            }
                            <Input
                                inputStyle={{borderBottomWidth: 1, borderBottomColor: isFocused ? theme.Accent : theme.PrimaryDark}}
                                textStyle={[{color: theme.PrimaryDark}, styles.input]}
                                bgColor={theme.White}
                                placeholder={"Batch Name"}
                                // value= {values.name}
                                placeholderTextColor={theme.PrimaryLight}
                                onFocus={handleFocus}
                                onChangeText={(value) => handleInputChange("name", value)}
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
            <ModalBatchView data={modalData} modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
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
