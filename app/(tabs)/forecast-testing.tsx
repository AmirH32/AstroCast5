import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { generateFakeWeatherData, DayForecastType } from "@/scripts/get-data";
import { Day } from "@/components/Day";

export default function HomeScreen() {
  const data = generateFakeWeatherData();

  const renderItem = ({ item }: ListRenderItemInfo<DayForecastType>) => {
    return <Day item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.day}${index}`}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0D0221",
    },
  });