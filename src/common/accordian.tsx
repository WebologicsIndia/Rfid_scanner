import React, {useState, useRef, useEffect} from "react";
import {View, StyleSheet, Animated, Easing, Pressable} from "react-native";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import EntypoIcons from "react-native-vector-icons/Entypo";


const Accordian = (props: any) => {
    const animatedValue = useRef(
        new Animated.Value(props.expanded ? 1 : 0),
    ).current;
    const [visible, setVisible] = useState(props.expanded);

    const open = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    };

    const close = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        if (props.expanded !== visible) {
            if (props.expanded) {
                setVisible(props.expanded);
                setTimeout(() => {
                    open();
                }, 50);
            } else {
                close();
                setTimeout(() => {
                    setVisible(props.expanded);
                }, 500);
            }
        }
    }, [props.expanded, visible]);

    const contentHeight = {
        maxHeight: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
        }),
    };

    return (
        <View style={props.style}>
            <Pressable
                onPress={props.onPress}
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <View
                    style={{
                        flex: 11,
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    {props.title}
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <EntypoIcons
                        name={props.expanded ? "chevron-up" : "chevron-down"}
                        color={"#999999"}
                        size={20}
                    />
                </View>
            </Pressable>
            {visible ? (
                <Animated.ScrollView style={StyleSheet.flatten([contentHeight])}>
                    {props.children}
                </Animated.ScrollView>
            ) : (
                <></>
            )}
        </View>
    );
};

export default Accordian;
