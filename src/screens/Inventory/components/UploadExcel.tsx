import React, {useState} from "react";
import {
    borderRadius,
    Container,
    H7,
    Input,
    margin,
    padding,
    Insets,
    Button, H5
} from "@WebologicsIndia/react-native-components";
import {theme} from "../../../config/theme";
import {Pressable, StyleSheet, View} from "react-native";
import HamburgerSVG from "../../../assets/hamburger.svg";
import {fetchWithToken} from "../../../config/helper";
import {inventoryUrl} from "../../../config/api";
import ModalView from "./ModalView";
// import template from "../../../assets/template/rfid_upload_template.xlsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ScanIcon from "react-native-vector-icons/MaterialCommunityIcons";
import DocumentPicker from "react-native-document-picker";
import RNFetchBlob  from "rn-fetch-blob";


const UploadExcelScreen = (props: any) => {
    const [insets] = useState(Insets.getInsets());
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState< any>(null);

    const templateDownload = async () => {
        console.log("hello");
        //TODO to be completed later
        const templateUrl = "https://docs.google.com/spreadsheets/d/1ABSP1TTmaZTsl8VysbiteYY5n4xXhmtR/edit?usp=drive_link&ouid=117403022071346511077&rtpof=true&sd=true";
        try {
            const {config, fs} = RNFetchBlob;
            const RootDir = fs.dirs.DownloadDir;
            const options = {
                fileCache: true,
                addAndroidDownloads: {
                    path: RootDir + "/template.xlsx",
                    description: "Downloading File....",
                    notification: true,
                    useDownloadManager: true,
                    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                },
            };
            config(options)
                .fetch("GET", templateUrl)
                .then((res) => {
                    console.log("res -> ", JSON.stringify(res));
                }).catch((e) => {
                    console.log("error: ", e);
                });
        } catch(e) {
            console.log(e);
        }

    };

    const uploadFile = async() => {
        try {
            setLoading(true);
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.csv, DocumentPicker.types.xlsx, DocumentPicker.types.xls]
            });
            setSelectedFile(result[0]);
            setLoading(false);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                setModalData({message: "User Cancelled The Upload"});
            } else {
                setModalData({message: "Error picking document"});
            }
            setModalVisible(true);
        }
    };

    const saveFile = () => {
        setLoading(true);
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", {
                uri: selectedFile.uri,
                type: selectedFile.type,
                name: selectedFile.name
            });
            fetchWithToken(inventoryUrl, "POST", {"Content-Type": "multipart/form-data"}, formData)
                .then((res) => {
                    if(res.status === 200) {
                        res.json().then((data) => {
                            setModalData(data);
                        });
                    } else{
                        res.json().then((data) => {
                            setModalData(data);
                        });
                    }

                });
        } else {
            setModalData({message: "No File Selected"});
        }
        setModalVisible(true);
        setLoading(false);
    };



    return (
        <>
            <Container
                style={styles.container}
                fluid
                backgroundColor={theme.White}
                header
                addIcon={<Pressable onPress={() => props.navigation.openDrawer()}><HamburgerSVG /></Pressable>}
                headerText={"Upload Excel"}
                headerTextStyle={styles.headerText}
                headerColor={theme.Primary}
                bottom={insets.bottom * 1.6}
            >
                <View style={styles.templateButton}>
                    <Button
                        loading={loading}
                        margin={margin.my3}
                        padding={[padding.px3, padding.py4]}
                        borderRadius={borderRadius.br4}
                        onPress={templateDownload}
                        left={<ScanIcon name={"download"} color={theme.White} size={20}/>}
                    >
                        <H7 style={{color: theme.White}}>Download Template</H7>
                    </Button>
                </View>

                <View style={{flex: 1, justifyContent: "center"}}>
                    <View>
                        <Input
                            placeholder={"Select Excel File"}
                            inputStyle={[margin.mt5, margin.mx5, padding.px5]}
                            borderRadius={borderRadius.br4}
                            placeholderTextColor={theme.PrimaryLight}
                            bgColor={theme.White}
                            borderColor={theme.PrimaryLight}
                            textStyle={[styles.inputText, {textAlign: "center"}]}
                            value={selectedFile ? selectedFile.name : ""}
                        />
                    </View>
                    <View style={styles.uploadSaveButton}>
                        <Button
                            loading={loading}
                            padding={[padding.px3, padding.py4]}
                            borderRadius={borderRadius.br4}
                            onPress={uploadFile}
                            left={<ScanIcon name={"upload"} color={theme.White} size={20}/>}
                        >
                            <H7 style={{color: theme.White}}>Upload File</H7>
                        </Button>
                        <Button
                            loading={loading}
                            padding={[padding.px3, padding.py4]}
                            borderRadius={borderRadius.br4}
                            onPress={saveFile}
                            left={<ScanIcon name={"content-save"} color={theme.White} size={20}/>}
                        >
                            <H7 style={{color: theme.White}}>Save Data</H7>
                        </Button>
                    </View>
                </View>
            </Container>
            <ModalView data={modalData} modalVisible={modalVisible} setModalVisible={setModalVisible}/>

        </>

    );
};


const styles = StyleSheet.create({
    container: {
        ...padding.pb5,
        ...padding.px5,
        flex: 1,
        justifyContent: "space-between"
    },
    headerText: {
        fontWeight: "600",
        ...margin.ms4
    },
    inputText: {
        color: theme.Accent,
        fontWeight: "600",
        paddingVertical: padding.py1.paddingVertical,
        paddingHorizontal: padding.px1.paddingHorizontal
    },
    templateButton: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    uploadSaveButton: {
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        ...margin.my3
    },
});


export default UploadExcelScreen;
