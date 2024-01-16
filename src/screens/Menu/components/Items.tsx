import React, {useState} from "react";
import Animated, {useAnimatedGestureHandler, useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import {fetchWithToken} from "../../../config/helper";
import {batchUrl} from "../../../config/api";
import {PanGestureHandler} from "react-native-gesture-handler";
import Accordian from "../../../common/accordian";
import {borderRadius, Button, H7, margin, padding} from "@WebologicsIndia/react-native-components";
import {View} from "react-native";
import {theme} from "../../../config/theme";
import dayjs from "dayjs";

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
                    <View>
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

export default Items;
