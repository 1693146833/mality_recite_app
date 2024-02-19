import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const screenWidth = Dimensions.get("window").width;
const Select = ({ options, onSelect }: { options: any[]; onSelect: any }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setShowOptions(!showOptions)}
      >
        <Text>{selectedOption ? selectedOption : "Select"}</Text>
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionsContainer}>
          {options.map((option: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => {
                setSelectedOption(option.label);
                setShowOptions(false);
                onSelect(option);
              }}
            >
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
  },
  selectButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: screenWidth / 2,
    height: 40,
  },
  optionsContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 5,
    zIndex: 1,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default Select;
