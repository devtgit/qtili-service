import { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [themeColors, setThemeColors] = useState({
    status: "light",
    top: "#272727",
    bottom: "#121212",
  });

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: themeColors.top }} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: themeColors.bottom,
        }}
      >
        <StatusBar barStyle={`${themeColors.status}-content`} />
        <WebView
          style={
            loaded
              ? { flex: 1, backgroundColor: themeColors.bottom }
              : { flex: 0, height: 0, opacity: 0 }
          }
          source={{
            uri:
              process.env.NODE_ENV === "production"
                ? "https://qtili-dev2.web.app/"
                : "http://192.168.1.108:5173/",
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          hideKeyboardAccessoryView={true}
          originWhitelist={["*"]}
          startInLoadingState={true}
          onLoad={() => {
            setTimeout(() => {
              setLoaded(true);
            }, 1000);
          }}
          onMessage={(event) => {
            const { type, payload } = JSON.parse(event.nativeEvent.data);

            switch (type) {
              case "SWITCH_THEME": {
                setThemeColors(payload);
                break;
              }
              default:
            }
          }}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaTop: {},
  safeAreaContent: {
    flex: 1,
    backgroundColor: "#00A300",
  },
});
