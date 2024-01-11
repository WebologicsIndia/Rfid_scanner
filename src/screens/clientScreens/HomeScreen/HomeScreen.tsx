import React, {useEffect, useState} from "react";
import {
    borderRadius,
    Container,
    H7,
    H8,
    H9,
    margin,
    padding,
    Insets, Button
} from "@WebologicsIndia/react-native-components";
import HamburgerSVG from "../../../assets/hamburger.svg";
import CurrentLocationSVG from "../../../assets/current-location.svg";
import PlaySVG from "../../../assets/playSVG.svg";
import ReloadSVG from "../../../assets/reloadSVG.svg";
import PauseSVG from "../../../assets/pauseSVG.svg";
import {Image, Pressable, StyleSheet, View, NativeModules} from "react-native";
import {theme} from "../../../config/theme";
import FilterModal from "../../../common/FilterModal";
import DownSvg from "../../../assets/downArrow.svg";
import Geolocation from "react-native-geolocation-service";
import Logo from "../../../assets/dr_company_logo.jpg";
import {fetchWithToken} from "../../../config/helper";
import {batchUrl, inventoryUrl} from "../../../config/api";
import {connect} from "react-redux";


const {RFIDModule} = NativeModules;

const ClientHomeScreen = (props: any) => {
    const [insets] = useState(Insets.getInsets());
    const [rfIdData, setRfIdData] = useState<Set<any>>(new Set());
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [locationIconColor, setLocationIconColor] = useState(theme.PrimaryDark);
    // const [icon, setIcon] = useState("PlaySVG");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState<any>(null);
    const [initialized, setInitialized] = useState(false);
    const [active, setActive] = useState(false);
    const [batchesData, setBatchesData] = useState<any>([]);
    const [tagsData, setTagsData] = useState<Set<any>>(new Set());
    const [unCategorizedTags, setUnCategorizedTags] = useState<Set<any>>(new Set());
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        fetchWithToken(`${batchUrl}?status=Ready`, "GET").then((resp) => {
            if (resp.status === 200) {
                resp.json().then((data) => {
                    setBatchesData(data.results);
                });
            }
        });
    }, []);

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

        }
    };

    const showModal = () => {
        setModalVisible(true);
    };
    const handleRefreshSvg = () => {
        setRfIdData(new Set());
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

    const receiveBatch = () => {
        setLoading(true);
        const body = {
            status: "Delivered",
            batchId: selectedFilter._id.toString()
        };
        fetchWithToken(batchUrl, "PUT", "", JSON.stringify(body))
            .then((resp) => {
                if (resp.status === 200) {
                    resp.json().then((data) => {
                        console.log(data.message);
                    });
                }
            }).catch(() => {
                console.log("error");
            }).finally(() => {
                setTagsData(new Set());
                setLoading(false);
                setSelectedFilter(null);
            });
    };

    return (
        <>
            <Container
                style={styles.container}
                fluid
                backgroundColor={theme.White}
                header
                addIcon={<Pressable onPress={() => props.navigation.openDrawer()}><HamburgerSVG /></Pressable>}
                headerText={props.userDetails.name}
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
                        <H8 style={styles.textHeading}>Select Batch:</H8>
                        <Pressable onPress={showModal} style={[styles.modalOpen, styles.rowAlignCenter]}>
                            <H7 style={{
                                color: theme.PrimaryLight,
                                fontWeight: "500"
                            }}>{selectedFilter ? selectedFilter.name : "Select Batch"}</H7>
                            <DownSvg color={theme.Primary} />
                        </Pressable>
                        <View style={[styles.rowAlignCenter, styles.svgGap]}>
                            {!active ? (
                                <Pressable
                                    onPress={handleIconClick}
                                    disabled={!selectedFilter}
                                >
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
                    {
                        tagsData?.size ?
                            <View style={styles.card}>
                                <H7 style={{color: theme.PrimaryDark, alignSelf: "center", fontWeight: "bold"}}>Batch
                  Summary</H7>
                                {
                                    Array.from(tagsData).length ?
                                        Object.entries(
                                            Array.from(tagsData).reduce((acc: any, tag: any) => {
                                                acc[tag] = (acc[tag] || 0) + 1;
                                                return acc;
                                            }, {})
                                        ).map(([itemType, count], index) => {
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
                                <View style={[margin.mt4]}>
                                    <Button
                                        padding={padding.py3}
                                        borderRadius={borderRadius.br3}
                                        onPress={receiveBatch}
                                        loading={loading}
                                    >
                                        <H7 style={{color: theme.TextLight}}>Receive Batch</H7>
                                    </Button>
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
                modelData={batchesData} />
        </>
    );
};
const mapStateToProps = (state: any) => {
    return {
        userDetails: state.user.client
    };
};
export default connect(mapStateToProps)(ClientHomeScreen);

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
    // scrollView: {
    // // height: 450
    // },
    scrollContent: {
        flexGrow: 1,
        paddingVertical: 10
    },
    card: {
        flexDirection: "column", ...padding.px5, ...padding.pt1, ...padding.pb3, ...borderRadius.br2,
        ...margin.mt5,
        borderColor: theme.PrimaryDark,
        borderWidth: StyleSheet.hairlineWidth
    }
});
