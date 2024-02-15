import React, {useEffect} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
// import DrawerNavigation from "./Navigation/DrawerNavigation";
import Login from "./Authentication/Login";
import {connect} from "react-redux";
import {login, logout} from "../store/reducers/userSlice";
import {checkValidity} from "../config/helper";
import {H7} from "@WebologicsIndia/react-native-components";
import {theme} from "../config/theme";
import BottomTabs from "./Navigation/BottomTabs";

const Stack = createNativeStackNavigator();
const Screens = (props: any) => {
    const [validating, setValidating] = React.useState(true);
    useEffect(() => {
        if (props.token !== null) {
            checkValidity(props.token).then((status) => {
                if (status === false) {
                    props.logout();
                } else {
                    props.login(status);
                }
                setTimeout(() => {
                    setValidating(false);
                }, 10);
            });
        } else {
            setValidating(false);
        }
    }, []);

    if (validating) {
        return <H7 style={{color: theme.PrimaryDark}}>Loading...</H7>;
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false
                }}>
                {
                    props.token === null ?
                        (
                            <>
                                <Stack.Screen name={"login"} component={Login} />
                            </>
                        )
                        :
                        (
                            <>
                                {/*<Stack.Screen name={"drawer"} component={DrawerNavigation} />*/}
                                <Stack.Screen name="bottomTabs" component={BottomTabs} />
                            </>
                        )
                }
            </Stack.Navigator>
        </NavigationContainer>


    );
};
const mapStateToProps = (state: { user: { tokens: any; user: any; }; }) => ({
    token: state.user.tokens,
    user: state.user.user
});

export default connect(mapStateToProps, {login, logout})(Screens);
