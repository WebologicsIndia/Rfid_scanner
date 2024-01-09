import React, {useState} from "react";
import {FlatList, Pressable, StyleSheet, View} from "react-native";
import {
    borderRadius,
    Container,
    H4,
    H5,
    H6,
    H7,
    Insets,
    margin,
    padding
} from "@WebologicsIndia/react-native-components";
import {theme} from "../../../config/theme";
import HamburgerSVG from "../../../assets/hamburger.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AntIcon from "react-native-vector-icons/AntDesign";
import {connect} from "react-redux";

const Index = (props: any) => {
    console.log(props.batchDetails.data);
    const [insets] = useState(Insets.getInsets());
    const [totalItemCount, setTotalItemCount] = useState<number | null>(null);
    const dummyData = [
        {
            id: 1,
            status: "Received",
            itemTypes: [
                {
                    id: "HandTowel",
                    name: "Hand Towel",
                    count: 10
                },
                {
                    id: "BathTowel",
                    name: "Bath Towel",
                    count: 15
                },
                {
                    id: "Towel",
                    name: "Towel",
                    count: 20
                },
                {
                    id: "soap",
                    name: "Soap",
                    count: 30
                },
                {
                    id: "badSheet",
                    name: "Bad Sheets",
                    count: 45
                }
            ]
        }
    ];
    const calculateTotalCount = (itemTypes: any) => {
        return itemTypes.reduce((total: number, itemType: any) => total + itemType.count, 0);
    };
    return (
        <Container
            bottom={insets.bottom * 1.5}
            backgroundColor={theme.White}
            header
            headerColor={theme.Primary}
            headerTextStyle={styles.headerText}
            headerText={"Hotel Inventory"}
            addIcon={<Pressable onPress={() => props.navigation.openDrawer()}><HamburgerSVG /></Pressable>}
            style={styles.container}
        >
            <View style={[styles.commonStyles, styles.commonBackground]}>
                <H4 style={[styles.commonText, {fontWeight: "600"}]}>Inventory Details</H4>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={dummyData}
                renderItem={({item, index}: any) => {
                    const totalItemCount = calculateTotalCount(item.itemTypes);
                    setTotalItemCount(totalItemCount);
                    return (
                        <View key={index} style={[styles.itemTypesContainer, styles.commonBackground]}>
                            {item.status === "Received" && item?.itemTypes?.map((itemType: any) => {
                                return (
                                    <View key={itemType.id} style={[styles.itemTypesWrapper, styles.commonStyles, styles.shadow]}>
                                        <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                                            <AntIcon name={"tags"} size={16} color={"#ff3366"} />
                                            <H6 style={styles.commonText}>{itemType.name}</H6>
                                        </View>
                                        <View style={{alignItems: "center"}}>
                                            <View style={styles.circleView}>
                                                <H7 style={{textAlign: "center"}}>{itemType.count}</H7>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>

                    );
                }}
            />
            <View style={[styles.totalItemsWrapper, styles.commonBackground, styles.commonStyles]}>
                <H5 style={[styles.commonText, {fontWeight: "500"}]}>{"Total Items : "}</H5>
                <H5 style={{color: theme.PrimaryDark}}>{totalItemCount}</H5>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...padding.py3
    },
    headerText: {
        fontWeight: "600"
    },
    commonBackground: {
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: "#ff3366" + "1A",
        borderColor: "#ff3366"
    },
    totalItemsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    circleView: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#ff3366",
        ...borderRadius.circle,
        ...padding.p1,
        backgroundColor: "#ff3366",
        aspectRatio: 1
    },
    itemTypesContainer: {
        flex: 10,
        ...borderRadius.br2,
        ...padding.px5,
        ...padding.py3,
        ...margin.mb2
    },
    itemTypesWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        ...padding.px4,
        backgroundColor: theme.White
    },
    commonStyles: {
        ...borderRadius.br2,
        ...padding.py2,
        ...margin.mb2
    },
    commonText: {
        color: theme.PrimaryDark,
        textAlign: "center",
        textTransform: "capitalize"
    },
    shadow: {
        elevation: 5,
        shadowColor: theme.PrimaryDark,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3
    }
});
const mapStateToProps = (state: any) => {
    return {
        batchDetails: state.batch
    };
};

export default connect(mapStateToProps)(Index);
