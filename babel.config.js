module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
        [
            require.resolve("babel-plugin-module-resolver"),
            {
                cwd: "babelrc",
                extensions: [".ts", ".tsx"],
                alias: {
                    "@assets": "./src/assets",
                    "@config": "./src/config",
                    "@store": "./src/store",
                    "@common": "./src/common",
                }
            }
        ],
        "react-native-reanimated/plugin"
    ]
};
