import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeOut, LinearTransition, useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue } from "react-native-reanimated";

const initState = [
  {
    id: 1,
    height: 30,
    color: "lightblue"
  },
  {
    id: 2,
    height: 50,
    color: "lightgreen"
  },
  {
    id: 3,
    height: 70,
    color: "lightcoral"
  },
  {
    id: 4,
    height: 90,
    color: "lightcoral"
  }
]

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

export default function Index() {

  const height = useSharedValue(initState[0].height)

  const [cardList, setCardList] = useState(initState)

  const textInputAnimatedProps = useAnimatedProps(() => {
    return {
      text: height.value.toString(),
    }
  })

  const animatedHeight = useAnimatedStyle(() => {
    return {
      height: height.value
    }
  })

  useDerivedValue(() => {
    console.log("height", height.value)
  })

  const onChangeIndex = (indexCard: number) => {
    const newTempCard = cardList[indexCard]
    const filterCardList = cardList.filter((_, index) => index !== indexCard)
    setCardList([newTempCard, ...filterCardList])
    height.value = newTempCard.height
  }

  const onChangeText = (text: string) => {
    if (!text) height.value = 0
    height.value = parseInt(text)
  }

  return (
    <ScrollView >
      <View
        style={styles.container}
      >
        <AnimatedTextInput
          style={styles.textInput}
          placeholder="Search"
          animatedProps={textInputAnimatedProps}
          onChangeText={onChangeText}
        />
        {cardList.map((card, index) => (
          <AnimatedTouchableOpacity
            key={card.id}
            style={[
              styles.card,
              { height: card.height, backgroundColor: card.color },
              index === 0 && animatedHeight
            ]}
            onPress={() => onChangeIndex(index)}
            layout={LinearTransition.duration(300)}
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
          >
            <Text>{card.height}</Text>
          </AnimatedTouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  card: {
    width: "100%",
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
  },
  textInput: {
    width: "100%",
    padding: 4,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "gray",
  }
});