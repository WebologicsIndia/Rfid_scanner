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
    Button, H6
} from "@WebologicsIndia/react-native-components";
import {theme} from "../../../config/theme";
import {ActivityIndicator, NativeModules, Pressable, ScrollView, StyleSheet, View} from "react-native";
import HamburgerSVG from "../../../assets/hamburger.svg";
import {fetchWithToken} from "../../../config/helper";
import {inventoryUrl} from "../../../config/api";
import ModalView from "./ModalView";
const {RFIDModule} = NativeModules;



const ScanTagsScreen = (props: any) => {
    const [insets] = useState(Insets.getInsets());
    const[active, setActive] = useState(false);
    const [rfIdData, setRfIdData] = useState<Set<any>>(new Set());
    const [loading, setLoading] = useState(false);
    const [itemType, setItemType] = useState("");
    const [description, setDescription] = useState("");
    const [modalData, setModalData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);



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



    return (
        <>
            <Container
                style={styles.container}
                fluid
                backgroundColor={theme.White}
                header
                addIcon={<Pressable onPress={() => props.navigation.openDrawer()}><HamburgerSVG /></Pressable>}
                headerText={"Add Inventory"}
                headerTextStyle={styles.headerText}
                headerColor={theme.Primary}
                bottom={insets.bottom * 1.6}
            >
                <View>
                    <View >
                        <Input
                            placeholder={"Item Type"}
                            inputStyle={[margin.m2]}
                            borderRadius={borderRadius.br4}
                            borderColor={theme.PrimaryLight}
                            placeholderTextColor={theme.PrimaryLight}
                            bgColor={theme.White}
                            textStyle={styles.inputText}
                            onChangeText={(value) => setItemType(value)}
                            floatingPlaceholder

                        />
                        <Input
                            placeholder={"Description"}
                            inputStyle={[margin.m2]}
                            borderRadius={borderRadius.br4}
                            borderColor={theme.PrimaryLight}
                            placeholderTextColor={theme.PrimaryLight}
                            bgColor={theme.White}
                            textStyle={styles.inputText}
                            onChangeText={(value) => setDescription(value)}
                            floatingPlaceholder
                            multiline
                            numberOfLines={3}
                            defaultValue={""}
                        />
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "center"}}>
                        <Button
                            loading={loading}
                            padding={padding.p5}
                            borderRadius={borderRadius.br4}
                            onPress={handleButtonClick}

                        >
                            <H6 style={{color: theme.White}}>{!active ? "Scan Tags": "Stop Scan"}</H6>
                        </Button>
                    </View>

                    <H8 style={[{color: theme.PrimaryDark}]}>Tags</H8>
                    {rfIdData.size > 0 &&
                        <ScrollView contentContainerStyle={[styles.scrollContent]} style={styles.scrollView}>
                            {Array.from(rfIdData).map((data:any, index:number) => (
                                <View key={index} style={[padding.py5]}>
                                    <H9 style={{color: theme.PrimaryDark}}>{data}</H9>
                                </View>
                            ))}
                        </ScrollView>
                    }
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
        paddingVertical: padding.py3.paddingVertical,
        paddingHorizontal: padding.px2.paddingHorizontal
    }
});


export default ScanTagsScreen;
