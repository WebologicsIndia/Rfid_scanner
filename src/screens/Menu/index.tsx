import React, {useState} from "react";
import {borderRadius, Button, Container, H7, Insets, margin, padding} from "@WebologicsIndia/react-native-components";
import {theme} from "../../config/theme";
import {ActivityIndicator, Pressable, FlatList, StyleSheet, View} from "react-native";
import HamburgerSVG from "../../assets/hamburger.svg";
import {batchUrl} from "../../config/api";
import dayjs from "dayjs";
import Accordian from "../../common/accordian";
import {fetchWithToken} from "../../config/helper";
import {setBatch} from "../../store/reducers/batchSlice";
import {connect} from "react-redux";
import {PanGestureHandler} from "react-native-gesture-handler";


import Animated, {
    useSharedValue,
    useAnimatedStyle, useAnimatedGestureHandler
} from "react-native-reanimated";

const TrackingDrawer = (props: any) => {

    const [insets] = useState(Insets.getInsets());
    const [loading, setLoading] = useState(false);
    const [inventoryData, setInventoryData] = useState([]);
    const [total, setTotal] = useState();
    const [update, setUpdate] = useState(false);


    const getInventories = () => {
        setLoading(true);
        fetchWithToken(`${batchUrl}?page=1&results=10`, "GET").then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    props.setBatch({
                        data: data.results,
                        page: 1,
                        total: data.total
                    });
                    setInventoryData(data.results);
                    setTotal(data.total);

                });
            }
        }).catch(() => {
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        });
    };

    React.useEffect(() => {
        getInventories();
    }, [update]);


    if (loading) {
        return <View style={{justifyContent: "center", alignItems: "center"}}><ActivityIndicator size={"large"}
            color={theme.PrimaryDark} /></View>;
    }
    const batchList = (() => {
        props.navigation.openDrawer();
        setUpdate(!update);
    });

    return (
        <Container
            style={styles.container}
            backgroundColor={theme.White}
            header
            addIcon={<Pressable onPress={batchList}><HamburgerSVG /></Pressable>}
            headerText={"Inventories"}
            headerTextStyle={styles.headerText}
            headerColor={theme.Primary}
            bottom={insets.bottom * 1.5}
        >
            <H7 style={[padding.py3, {color: theme.PrimaryLight}]}>Total {total}</H7>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={inventoryData}
                renderItem={({item, index}: any) => (
                    inventoryData.length ? (
                        <Items
                            item={item}
                            index={index}
                            key={index}
                            getInventories={getInventories}
                            navigation={props.navigation}
                        />
                    ):
                        (<H7>No Data found</H7>)
                )}
            />
        </Container>

    );
}
;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerText: {
        fontWeight: "600",
        ...margin.ms4
    }
});
export default connect(null, {setBatch})(TrackingDrawer);

const Items = ({item, index, getInventories, navigation}: any) => {
    const [expanded, setExpanded] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const position = useSharedValue(0);

    const panGesture = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = position.value;
        },
        onActive: (event, ctx) => {
            if (item.status === "Ready") {
                const totalTranslationX = ctx.startX + event.translationX;
                const swipeDirection = event.velocityX > 0 ? 1 : -1;

                // if (swipeDirection === 1 || totalTranslationX >= 0) {
                //     return;
                // }
                //
                // position.value = Math.max(totalTranslationX, -110);

                if (swipeDirection === 1 && totalTranslationX <= 0) {
                    position.value = totalTranslationX;
                } else if (swipeDirection === -1) {
                    position.value = Math.max(totalTranslationX, -110);
                }
            }
        },
        onEnd: (event, ctx) => {
            ctx.startX = position.value;
        }
    });
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: position.value
                }
            ]
        };
    });
    const toggle = (index: number) => {
        const newExpanded = [...expanded];
        newExpanded[index] = !newExpanded[index];
        setExpanded(newExpanded);
    };

    const deleteBatch = (id: string, status: string) => {
        const reqBody = JSON.stringify({
            status: status,
            batchId: id
        });
        setLoading(true);
        fetchWithToken(batchUrl, "DELETE", {}, reqBody).then((resp) => {
            if (resp.status === 200) {
                resp.json().then((data) => {
                    console.log(data.message);
                });
                getInventories();
                setLoading(false);
            } else {
                resp.json().then((data) => {
                    console.log(data.message);
                });
                setLoading(false);
            }
        }).catch(() => {
            setLoading(false);
        });
    };
    return (
        <PanGestureHandler
            onGestureEvent={panGesture}
            key={index}
            failOffsetY={[-5, 5]}
            activeOffsetX={[-5, 5]}
        >
            <Animated.View style={animatedStyle}>
                <Accordian
                    expanded={expanded[index]}
                    onPress={() => toggle(index)}
                    style={[padding.p0, margin.my2, borderRadius.br2]}
                    key={index}
                    title={
                        <View key={item._id}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                            <View style={padding.pb3}>
                                <H7 style={{color: theme.PrimaryDark}}>Batch Name</H7>
                                <H7 style={{
                                    color: theme.PrimaryLight,
                                    textTransform: "capitalize"
                                }}>{item.name}</H7>
                                <H7 style={{color: theme.PrimaryDark}}>Status</H7>
                                <H7 style={{
                                    color: theme.PrimaryLight,
                                    textTransform: "capitalize"
                                }}>{item.status}</H7>
                            </View>
                            <View style={margin.ms5}>
                                <H7 style={{color: theme.PrimaryDark}}>Created</H7>
                                <H7
                                    style={{color: theme.PrimaryLight}}>{dayjs(item.createdAt).format("DD-MMM-YYYY : HH:MM A")}</H7>
                                <H7 style={{color: theme.PrimaryDark}}>Client</H7>
                                <H7 style={{
                                    color: theme.PrimaryLight,
                                    textTransform: "capitalize"
                                }}>{item.assignedTo.name}</H7>
                            </View>
                        </View>
                    }>
                    {item.tags.length ?
                        Object.entries(
                            item.tags.reduce((acc: { [x: string]: any; }, tag: { itemType: string | number; }) => {
                                acc[tag.itemType] = (acc[tag.itemType] || 0) + 1;
                                return acc;
                            }, {})
                        ).map(([itemType, count], index) => {

                            return (
                                <View
                                    key={index}
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        ...padding.px5,
                                        ...padding.py2
                                    }}
                                >
                                    <H7 style={{
                                        color: theme.PrimaryDark,
                                        flex: 1,
                                        textTransform: "capitalize"
                                    }}>{itemType}</H7>
                                    <H7 style={{
                                        color: theme.PrimaryLight,
                                        flex: 1
                                    }}>{parseInt(count as string)}</H7>
                                </View>
                            );
                        })
                        : <></>
                    }
                    <View >
                        {
                            item.status === "Ready" && <View>
                                <Button
                                    borderRadius={borderRadius.br2}
                                    padding={padding.p1}
                                    onPress={() => {
                                        navigation.navigate("Tag Scanner", {item});
                                    }}
                                >
                                    <H7
                                        style={[{
                                            textTransform: "uppercase",
                                            color: theme.White,
                                            textAlign: "center"
                                        }]}>
                            Edit
                                    </H7>

                                </Button>
                            </View>
                        }
                    </View>
                </Accordian>
                {
                    item.status === "Ready" &&
            <View style={{
                position: "absolute",
                top: 45,
                right: -100
            }}>
                <Button
                    loading={loading}
                    borderRadius={borderRadius.br2}
                    padding={padding.p2}
                    color={"#ff3366"}
                    onPress={() => deleteBatch(item._id, item.status)}
                >
                    <H7
                        style={[{
                            textTransform: "uppercase",
                            color: theme.White,
                            textAlign: "center"
                        }]}>
                        Delete
                    </H7>

                </Button>
            </View>
                }
            </Animated.View>

        </PanGestureHandler>

    );
};



