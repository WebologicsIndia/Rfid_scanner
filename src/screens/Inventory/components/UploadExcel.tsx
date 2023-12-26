import React, {useEffect, useState} from "react";
import {
    borderRadius,
    Container,
    H7,
    H8,
    H9,
    Input,
    margin,
    padding,
    Insets,
    Button, H6, Drawer
} from "@WebologicsIndia/react-native-components";
import {theme} from "../../../config/theme";
import {NativeModules, Pressable, ScrollView, StyleSheet, View} from "react-native";
import HamburgerSVG from "../../../assets/hamburger.svg";
import {fetchWithToken} from "../../../config/helper";
import {inventoryUrl} from "../../../config/api";
import ModalView from "./ModalView";
const {RFIDModule} = NativeModules;
// import template from "../../../assets/template/rfid_upload_template.xlsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ScanIcon from "react-native-vector-icons/MaterialCommunityIcons";
import DocumentPicker from "react-native-document-picker";




const UploadExcelScreen = (props: any) => {
    const [insets] = useState(Insets.getInsets());
    const[active, setActive] = useState(false);
    const [rfIdData, setRfIdData] = useState<Set<any>>(new Set());
    const [loading, setLoading] = useState(false);
    const [itemType, setItemType] = useState("");
    const [description, setDescription] = useState("");
    const [modalData, setModalData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState();



    const addInventory = () => {
        const body = {
            itemType: itemType,
            description: description,
            tags: Array.from(rfIdData)
        };
        setLoading(true);
        fetchWithToken(inventoryUrl, "POST", "", JSON.stringify(body))
            .then((resp) => {
                if (resp.status === 200){
                    resp.json().then((data) => {
                        setModalData(data);
                    });
                } else {
                    resp.json().then((data) => {
                        console.log(data.message);
                        setModalData(data);
                    });
                }
            }).catch(() => {
                setLoading(false);
            }).finally(() => {
                setLoading(false);
                setRfIdData(new Set());
                setModalVisible(true);
            });
    };

    const handleButtonClick = () => {
        if (!active){
            RFIDModule.startInventory();
            setActive(true);

        } else {
            RFIDModule.stopInventory(
                (success: any) => {
                    console.log(success);
                    setActive(false);
                    addInventory();
                },
                (error: any) => {
                    console.log(error);
                }
            );

        }
    };

    useEffect( () => {
        let x: string | number | NodeJS.Timeout | undefined;
        if(active) {
            x = setInterval(() => {
                RFIDModule.readTag(
                    (tag: any) => {
                        setRfIdData(new Set([...rfIdData, tag]));
                    },
                    (error: any) => {
                        console.log(error);
                    }
                );
            }, 100);
        }
        return () => {
            if(x)
                clearInterval(x);
        };
    }, [active]);

    const templateDownload = async () => {
        console.log("hello");
        //TODO to be completed later
    };

    const uploadFile = async() => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.csv, DocumentPicker.types.xlsx, DocumentPicker.types.xls]
            });
            setSelectedFile(result[0]);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("User Cancelled The Upload");
            } else {
                console.error("Error picking document", err);
            }
        }
    };

    const saveFile = () => {
        console.log(selectedFile);
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", {
                uri: selectedFile.uri,
                type: selectedFile.type,
                name: selectedFile.name
            });
            console.log("FormData: ", formData);
            fetchWithToken(inventoryUrl, "POST", {"Content-Type": "multipart/form-data"}, formData)
                .then((res) => {
                    console.log("response: ", res, "::", res.status);
                });
        } else {
            console.log("No File Selected");
        }
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
                <View>
                    <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
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

                    <Input
                        placeholder={"Select File"}
                        inputStyle={[margin.mt5]}
                        borderRadius={borderRadius.br4}
                        placeholderTextColor={theme.PrimaryLight}
                        bgColor={theme.White}
                        borderColor={theme.PrimaryLight}
                        textStyle={[styles.inputText, {textAlign: "center"}]}
                        value={selectedFile ? selectedFile.name : ""}
                    />
                    <View style={[{justifyContent: "space-evenly", alignItems: "center", flexDirection: "row"}]}>
                        <Button
                            loading={loading}
                            margin={margin.my1}
                            padding={[padding.px3, padding.py4]}
                            borderRadius={borderRadius.br4}
                            onPress={uploadFile}
                            left={<ScanIcon name={"upload"} color={theme.White} size={20}/>}
                        >
                            <H7 style={{color: theme.White}}>Upload File</H7>
                        </Button>
                        <Button
                            loading={loading}
                            margin={margin.my1}
                            padding={[padding.px3, padding.py4]}
                            borderRadius={borderRadius.br4}
                            onPress={saveFile}
                            left={<ScanIcon name={"content-save"} color={theme.White} size={20}/>}
                        >
                            <H7 style={{color: theme.White}}>Save Data</H7>
                        </Button>

                    </View>

                    {/*<H8 style={[{color: theme.PrimaryDark}]}>Tags</H8>*/}
                    {/*{rfIdData.size > 0 &&*/}
                    {/*    <ScrollView contentContainerStyle={[styles.scrollContent]} style={styles.scrollView}>*/}
                    {/*        {Array.from(rfIdData).map((data:any, index:number) => (*/}
                    {/*            <View key={index} style={[padding.py5]}>*/}
                    {/*                <H9 style={{color: theme.PrimaryDark}}>{data}</H9>*/}
                    {/*            </View>*/}
                    {/*        ))}*/}
                    {/*    </ScrollView>*/}
                    {/*}*/}
                </View>
                <View style={styles.footer}>
                    <View style={[styles.rowAlignCenter, styles.svgGap]}>
                        <H8 style={styles.colorFont500}>Press</H8>
                        <Pressable style={styles.scanButton}><H8 style={styles.scanText}>SCAN</H8></Pressable>
                        <H8 style={styles.colorFont500}>Button</H8>
                    </View>
                    <H9 style={styles.colorFont500}>or Trigger to Read a Tag</H9>
                    <H9 style={styles.colorFont500}>...</H9>
                </View>

            </Container>
            <ModalView data={modalData} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            {/*<Drawer*/}
            {/*    open={true}*/}
            {/*    backgroundColor={"red"}*/}

            {/*>*/}
            {/*    <H7 style={{color: theme.Primary}}>Hello</H7>*/}
            {/*</Drawer>*/}
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
    rowAlignCenter: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerText: {
        fontWeight: "600",
        ...margin.ms4
    },
    bodyLogoView: {
        justifyContent: "space-between"
    },
    logoBody: {
        color: theme.PrimaryDark,
        textAlign: "center",
        flex: 1
    },
    textHeading: {
        color: theme.PrimaryDark,
        fontWeight: "600"
    },
    colorFont500: {
        color: theme.Primary,
        fontWeight: "500"
    },
    filterModeView: {
        ...padding.py3,
        justifyContent: "space-between"
    },
    filterMaskView: {
        gap: 16
    },
    input: {
        borderWidth: 0,
        ...padding.p3
    },
    footer: {
        alignItems: "center",
        gap: 4
    },
    scanText: {
        textAlign: "center",
        color: theme.PrimaryDark,
        fontWeight: "600"
    },
    scanButton: {
        backgroundColor: "#cc6600",
        ...padding.py1,
        ...padding.px5,
        ...borderRadius.br4
    },
    modalOpen: {
        flex: 1,
        justifyContent: "space-between",
        ...margin.ms4,
        ...margin.me5
    },
    svgGap: {
        gap: 10
    },
    scrollView: {
        height: 450,
    },
    scrollContent: {
        flexGrow: 1,
        paddingVertical: 10,
    },
    inputText: {
        color: theme.Primary,
        paddingVertical: padding.py1.paddingVertical,
        paddingHorizontal: padding.px1.paddingHorizontal
    }
});


export default UploadExcelScreen;
