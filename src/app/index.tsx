import PagerView, { type PagerViewRef } from "@expo/ui/community/pager-view";
import { useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function PagerViewExample() {
  const pagerRef = useRef<PagerViewRef>(null);

  return (
    <View style={{ flex: 1 }}>
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(event) => {
          console.log("selected page", event.nativeEvent.position);
        }}
      >
        <View key="one" style={[styles.page, { backgroundColor: "#fde68a" }]}>
          <Text>Page one</Text>
        </View>
        <View key="two" style={[styles.page, { backgroundColor: "#bfdbfe" }]}>
          <Text>Page two</Text>
        </View>
        <View key="three" style={[styles.page, { backgroundColor: "#bbf7d0" }]}>
          <Text>Page three</Text>
        </View>
      </PagerView>

      <Button
        title="Go to page 2"
        onPress={() => pagerRef.current?.setPage(1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, alignItems: "center", justifyContent: "center" },
});
