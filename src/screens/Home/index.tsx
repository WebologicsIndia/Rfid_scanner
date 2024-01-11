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
    Insets
} from "@WebologicsIndia/react-native-components";
import HamburgerSVG from "../../assets/hamburger.svg";
import CurrentLocationSVG from "../../assets/current-location.svg";
import PlaySVG from "../../assets/playSVG.svg";
import ReloadSVG from "../../assets/reloadSVG.svg";
import PauseSVG from "../../assets/pauseSVG.svg";
import {Image, Pressable, StyleSheet, View, NativeModules} from "react-native";
import {theme} from "../../config/theme";
import FilterModal from "../../common/FilterModal";
import DownSvg from "../../assets/downArrow.svg";
import Geolocation from "react-native-geolocation-service";
import Logo from "../../assets/dr_company_logo.jpg";
import BatchModal from "./components/batchModal";
import {fetchWithToken} from "../../config/helper";
import {inventoryUrl} from "../../config/api";

const {RFIDModule} = NativeModules;

const modalData = ["Contains", "Does Not Contain", "Equals", "Not Equal", "Starts With", "Ends With"];

const Home = (props: any) => {
    const [insets] = useState(Insets.getInsets());
    const [rfIdData, setRfIdData] = useState<Set<any>>(new Set());
    const [rfIdOpen, setRfIdOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [inventoryModal, setInventoryModal] = useState<boolean>(false);
    const [locationIconColor, setLocationIconColor] = useState(theme.PrimaryDark);
    // const [icon, setIcon] = useState("PlaySVG");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState<string>("Contains");
    const [initialized, setInitialized] = useState(false);
    const [active, setActive] = useState(false);
    // const [modalData, setModalData] = useState([]);
    const [tagsData, setTagsData] = useState<Set<any>>(new Set());
    const [unCategorizedTags, setUnCategorizedTags] = useState<Set<any>>(new Set());
    const [filteredData, setFilteredData] = useState<string[]>([]);


    const handleLocationIconColor = () => {
        if (locationIconColor === theme.PrimaryDark) {
            Geolocation.getCurrentPosition(
                (position: any) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error: any) => {
                    console.error(error);
                },

                {enableHighAccuracy: true, timeout: 3600000, maximumAge: 3600000}
            );
            setLocationIconColor("#009900");

        } else {
            setLocationIconColor(theme.PrimaryDark);
        }
    };

    useEffect(() => {
        RFIDModule.init(
            (success: any) => {
                console.log(success);
                setInitialized(true);
            },
            (error: any) => {
                console.log(error);
            }
        );
    }, []);


    const handleIconClick = () => {
        if (!active) {
            RFIDModule.startInventory();
            setActive(true);

        } else {
            RFIDModule.stopInventory(
                (success: any) => {
                    console.log(success);
                    setActive(false);
                },
                (error: any) => {
                    console.log(error);
                }
            );
            setInventoryModal(true);
        }
    };

    const showModal = () => {
        setModalVisible(true);
    };
    const handleRefreshSvg = () => {
        setRfIdData(new Set());
        setTagsData(new Set());
    };

    useEffect(() => {
        let x: string | number | NodeJS.Timeout | undefined;
        if (active) {
            x = setInterval(() => {
                RFIDModule.readTag(
                    (tag: any) => {
                        // console.log("tag", tag);

                        setRfIdData(new Set([...rfIdData, tag]));
                    },
                    (error: any) => {
                        console.log(error);
                    }
                );
            }, 100);
        }
        return () => {
            if (x)
                clearInterval(x);
        };
    }, [active]);

    const handleInputChange = (name: string, value: string) => {
        if (name === "filterMask") {
            const filtered = filterData(value, selectedFilter);
            setFilteredData(filtered);
        }
    };
    const filterData = (value: string, selectedFilter: any) => {
        switch (selectedFilter) {
            case "Contains":
                return generateMockData(value, 5, true);
            case "Does Not Contain":
                return generateMockData(value, 5, false);
            case "Equals":
                return generateMockData(value, 1, true);
            case "Not Equal":
                return generateMockData(value, 5, true);
            case "Starts With":
                return generateMockData(value, 5, true, true);
            case "Ends With":
                return generateMockData(value, 5, true, false);
            default:
                return [];
        }
    };
    const generateMockData = (value: string, count: number, includeValue: boolean, startsWith = false) => {
        const data = [];
        for (let i = 0; i < count; i++) {
            let entry = "";
            if (startsWith) {
                entry = generateRandomString(5);
            } else {
                entry = generateRandomString(5) + value;
            }
            if (includeValue) {
                data.push(entry);
            } else {
                data.push(generateRandomString(5));
            }
        }
        return data;
    };
    const generateRandomString = (length: any) => {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    useEffect(() => {
        Array.from(rfIdData).map((tagId) => {
            fetchWithToken(`${inventoryUrl}?tag=${tagId}`, "GET", "")
                .then((resp) => {
                    if (resp.status === 200) {
                        resp.json().then((data) => {
                            setTagsData((prevState) => new Set([...prevState, data.itemType]));
                        });
                    } else {
                        setUnCategorizedTags((prevState) => new Set([...prevState, tagId]));
                    }
                });
        });
    }, [rfIdData]);

    useEffect(() => {
        const item = props?.route?.params?.item;
        if (item) {
            const itemType = item.tags.map((item: any) => item.itemType);
            setTagsData((prevTagsData) => new Set([...prevTagsData, itemType]));
        }
    }, [props?.route?.params?.item]);

    return (
        <>
            <Container
                style={styles.container}
                fluid
                backgroundColor={theme.White}
                header
                addIcon={<Pressable onPress={() => props.navigation.openDrawer()}><HamburgerSVG /></Pressable>}
                headerText={"Tag Scanner"}
                headerTextStyle={styles.headerText}
                headerColor={theme.Primary}
                bottom={insets.bottom * 1.6}
            >
                <View>
                    <View style={{flexDirection: "row", justifyContent: "center"}}>
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                            <Image source={Logo} style={{width: 100, height: 85}} />
                        </View>
                        <Pressable onPress={handleLocationIconColor} style={margin.mt5}>
                            <CurrentLocationSVG color={locationIconColor} width="24" height="24" />
                        </Pressable>
                    </View>
                    <View style={[styles.filterModeView, styles.rowAlignCenter]}>
                        <H8 style={styles.textHeading}>Filter Mode:</H8>
                        <Pressable onPress={showModal} style={[styles.modalOpen, styles.rowAlignCenter]}>
                            <H7 style={{color: theme.PrimaryLight, fontWeight: "500"}}>{selectedFilter}</H7>
                            <DownSvg color={theme.Primary} />
                        </Pressable>
                        <View style={[styles.rowAlignCenter, styles.svgGap]}>
                            {!active ? (
                                <Pressable onPress={handleIconClick}>
                                    <PlaySVG width="24" height="24" />
                                </Pressable>
                            ) : (
                                <Pressable onPress={handleIconClick}>
                                    <PauseSVG width="24" height="24" />
                                </Pressable>
                            )}
                            <Pressable onPress={handleRefreshSvg}>
                                <ReloadSVG width="24" height="24" />
                            </Pressable>
                        </View>
                    </View>
                    <View style={[styles.filterMaskView, styles.rowAlignCenter]}>
                        <H8 style={styles.textHeading}>Filter Mask:</H8>
                        <View style={{flex: 1}}>
                            <Input
                                inputStyle={{borderBottomWidth: 1}}
                                textStyle={[{color: theme.PrimaryDark}, styles.input]}
                                bgColor={theme.White}
                                onChangeText={(value) => handleInputChange("filterMask", value)}
                            />
                        </View>
                    </View>
                    {
                        tagsData?.size ?
                            <View style={styles.card}>
                                <H7 style={{color: theme.PrimaryDark, alignSelf: "center", fontWeight: "bold"}}>Batch
                  Summary</H7>
                                {
                                    Array.from(tagsData).length ?
                                        Object.entries(
                                            Array.from(new Set(tagsData)).reduce((acc: any, tag: any) => {
                                                acc[tag] = (acc[tag] || 0) + 1;
                                                return acc;
                                            }, {})
                                        ).map(([itemType, count], index) => {
                                            console.log("itemType", itemType);
                                            return (
                                                <View key={index}
                                                    style={{flexDirection: "row", alignItems: "center", ...margin.my2}}>
                                                    <H7 style={{
                                                        color: theme.PrimaryDark,
                                                        flex: 2,
                                                        textTransform: "capitalize"
                                                    }}>
                                                        {itemType}
                                                    </H7>
                                                    <H7 style={{
                                                        color: theme.PrimaryLight,
                                                        flex: 1
                                                    }}>{parseInt(count as string)}</H7>
                                                </View>
                                            );
                                        }) : <></>
                                }
                                <View style={{flexDirection: "row", alignItems: "center", gap: 8}}>
                                    <H7 style={{color: theme.PrimaryDark, textTransform: "capitalize"}}>
                                        {"UnCategorised Tags:"}
                                    </H7>
                                    {Array.from(unCategorizedTags).map((tag, index) => (
                                        <H9 key={index} style={{color: theme.PrimaryDark}}>{tag}</H9>
                                    ))}
                                </View>
                            </View> : <></>
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
            <FilterModal modalVisible={modalVisible} setModalVisible={setModalVisible} setValue={setSelectedFilter}
                modelData={modalData} />
            <FilterModal modalVisible={rfIdOpen} setModalVisible={setRfIdOpen} setValue={setRfIdData}
                modelData={Array.from(rfIdData)} />
            <BatchModal
                modalVisible={inventoryModal}
                setModalVisible={setInventoryModal}
                latitude={latitude}
                longitude={longitude}
                filteredData={rfIdData}
                setRfIdData={setRfIdData}
                item={props?.route?.params?.item}
            />
        </>
    );
};
export default Home;

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
        ...padding.py0
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
        height: 450
    },
    scrollContent: {
        flexGrow: 1,
        paddingVertical: 10
    },
    card: {
        flexDirection: "column", ...padding.px5, ...padding.pt1, ...padding.pb3, ...borderRadius.br2, ...margin.my5,
        borderColor: theme.PrimaryDark,
        borderWidth: StyleSheet.hairlineWidth
    }
});
