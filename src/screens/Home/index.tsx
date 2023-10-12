import React, {useState} from "react";
import {borderRadius, Container, H7, H8, H9, Input, margin, padding} from "@WebologicsIndia/react-native-components";
import HamburgerSVG from "../../assets/hamburger.svg";
import CurrentLocationSVG from "../../assets/current-location.svg";
import PlaySVG from "../../assets/playSVG.svg";
import ReloadSVG from "../../assets/reloadSVG.svg";
import PauseSVG from "../../assets/pauseSVG.svg";
import {Pressable, StyleSheet, View} from "react-native";
import {theme} from "../../config/theme";
import FilterModal from "../../common/FilterModal";
import DownSvg from "../../assets/downArrow.svg";
import {inventoryUrl} from "../../config/api";

const Home = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [locationIconColor, setLocationIconColor] = useState(theme.PrimaryDark);
    const [icon, setIcon] = useState("PlaySVG");
    const [value, setValue] = useState<string>("Contains");
    const [item, setItems] = useState({
        rfIdTags: "sdfsdf",
        itemType: "towel",
    });

    const handleInputChange = (name: string, value: string | number) => {
        console.log(name, value);

    };
    const handleLocationIconColor = () => {
        if (locationIconColor === theme.PrimaryDark) {
            setLocationIconColor("#009900");
        } else {
            setLocationIconColor(theme.PrimaryDark);
        }
    };

    const handleIconClick = () => {
        if (icon === "PlaySVG") {
            setIcon("PauseSVG");
            fetch(inventoryUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(item)
            }).then((res) => {
                console.log("status", res.status);
                if(res.status === 200){
                    console.log("hello", item);
                }
            });
        } else {
            setIcon("PlaySVG");
        }
    };

    const showModal = () => {
        setModalVisible(true);
    };
    return (
        <>
            <Container
                style={styles.container}
                fluid
                backgroundColor={theme.White}
                header
                addIcon={<Pressable><HamburgerSVG /></Pressable>}
                headerText={"Tag Scanner"}
                headerTextStyle={styles.headerText}
                headerColor={theme.Primary}
                bottom={padding.pb5.paddingBottom}
            >
                <View>
                    <View style={[styles.bodyLogoView, styles.rowAlignCenter]}>
                        <H7 style={styles.logoBody}>Logo</H7>
                        <Pressable onPress={handleLocationIconColor}>
                            <CurrentLocationSVG color={locationIconColor} width="24" height="24" />
                        </Pressable>
                    </View>
                    <View style={[styles.filterModeView, styles.rowAlignCenter]}>
                        <H8 style={styles.textHeading}>Filter Mode:</H8>
                        <Pressable onPress={showModal} style={[styles.modalOpen, styles.rowAlignCenter]}>
                            <H7 style={{color: theme.PrimaryDark}}>{value}</H7>
                            <DownSvg color={theme.Primary} />
                        </Pressable>
                        <View style={[styles.rowAlignCenter, styles.svgGap]}>
                            {icon === "PlaySVG" ? (
                                <Pressable onPress={handleIconClick}>
                                    <PlaySVG width="24" height="24" />
                                </Pressable>
                            ) : (
                                <Pressable onPress={handleIconClick}>
                                    <PauseSVG width="24" height="24" />
                                </Pressable>
                            )}
                            <Pressable>
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
            <FilterModal modalVisible={modalVisible} setModalVisible={setModalVisible} setValue={setValue} />
        </>
    );
};
export default Home;

const styles = StyleSheet.create({
    container: {
        ...padding.p5,
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
        ...padding.py5,
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
    }
});
