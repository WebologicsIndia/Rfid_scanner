import React, {useEffect, useState} from "react";
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
import {fetchWithToken} from "../../../config/helper";
import {batchUrl} from "../../../config/api";



const Index = (props: any) => {
    const [insets] = useState(Insets.getInsets());
    const [loading, setLoading] = useState(false);
    const [itemTypeCount, setItemTypeCount] = useState<any>([]);
    const [inventoryItems, setInventoryItems] =  useState<any>([]);


    useEffect(() => {
        setLoading(true);
        setItemTypeCount({});
        setInventoryItems(inventoryItems.length = 0);
        fetchWithToken(`${batchUrl}?status=Delivered`, "GET", "").then((res) => {
            if(res.status === 200) {
                res.json().then((data) => {
                    let total = 0;
                    data.results.map((item: any) => {
                        total = total +  item.quantity;
                        setInventoryItems((prevState: any) => {
                            if (Array.isArray(prevState)) {
                                return [...prevState, ...item.tags.map((tag: any) => tag)];
                            } else {
                                return (item.tags.map((tag: any) => tag));
                            }
                        });
                    });
                });
            }
        }).catch((error) => {
            setLoading(false);
            console.error(error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (inventoryItems && inventoryItems.length > 0) {
            const itemCounts = Object.entries(
                inventoryItems.reduce((prev: { [x: string]: any; }, curr: { itemType: string | number; }) => {
                    prev[curr.itemType] = (prev[curr.itemType] || 0) + 1;
                    return prev;
                }, {})
            ).map(([itemType, count]) => ({
                type: itemType,
                count: count
            }));
            setItemTypeCount(itemCounts);
        }

    }, [inventoryItems]);

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
            <View style={[styles.itemTypesContainer, styles.commonBackground]}>
                <FlatList
                    showsVerticalScrollIndicator={false}

                    data={itemTypeCount}
                    renderItem={({item, index}: any) => {
                        return (
                            <View key={index}>
                                <View key={item.id} style={[styles.itemTypesWrapper, styles.commonStyles, styles.shadow]}>
                                    <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                                        <AntIcon name={"tags"} size={16} color={"#ff3366"} />
                                        <H6 style={styles.commonText}>{item.type}</H6>
                                    </View>
                                    <View style={{alignItems: "center"}}>
                                        <View style={styles.circleView}>
                                            <H7 style={{textAlign: "center"}}>{item.count}</H7>
                                        </View>
                                    </View>
                                </View>
                            </View>

                        );
                    }}
                />
            </View>
            <View style={[styles.totalItemsWrapper, styles.commonBackground, styles.commonStyles]}>
                <H5 style={[styles.commonText, {fontWeight: "500"}]}>{"Total Items : "}</H5>
                <H5 style={{color: theme.PrimaryDark}}>{inventoryItems.length}</H5>
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
        justifyContent: "center",
        backgroundColor: "#ff3366",
        aspectRatio: 1
    },
    itemTypesContainer: {
        // flex: 10,
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


export default Index;
