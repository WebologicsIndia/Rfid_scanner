import React from "react";
import {BlurView} from "@react-native-community/blur";
import {StyleSheet, View} from "react-native";

import {H7, padding, Toast, width} from "@WebologicsIndia/react-native-components";
import {theme} from "../../config/theme";


const Index = (props: {
    open: boolean,
    message: string,
    type: "warning" | "success",
    onClose?: () => null | void
}) => {
    const [open, setOpen] = React.useState(false);
    let timeout: any;
    React.useEffect(() => {
        if (props.open) {
            setOpen(props.open);
            if (timeout)
                clearTimeout(timeout);
            timeout = setTimeout(() => {
                setOpen(false);
                setTimeout(() => {
                    if (props.onClose) {
                        props.onClose();
                    }
                }, 1000);
            }, 2500);
        }
    }, [props.open]);
    return (
        <Toast open={open} toastStyle={styles.toastStyle} top={48}>
            <BlurView
                style={{width: "100%", height: "100%"}}
                blurType="dark"
                blurAmount={5}
            >
                <View style={styles.toastContainer}>
                    {/*{props.type === "warning" && <WarningSvg/>}*/}
                    {/*{props.type === "success" && <CheckSvg/>}*/}
                    <H7 style={{color: theme.White, fontSize: 18, flex: 1}}>{props.message}</H7>
                </View>
            </BlurView>
        </Toast>
    );
};

export default Index;

const styles = StyleSheet.create({
    toastStyle: {
        backgroundColor: "rgba( 255, 255, 255, 0.1 )",
        width: "100%",
        maxWidth: width.w22.width,
        paddingHorizontal: 0,
        paddingVertical: 0
    },
    toastContainer: {
        ...padding.px5,
        ...padding.py3,
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    }
});
