
import React from "react";
import Screens from "./src/screens";
import Toast from "react-native-toast-message";


const App = () => {
    return (
        <>
            <Screens />
            <Toast
                position='bottom'
                bottomOffset={20}
            />
        </>
    );
};
export default App;
