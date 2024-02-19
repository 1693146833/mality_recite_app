import { View, Text, TextInput, StyleSheet } from "react-native";

function AddInput({
  inputvalue,
  inputHandler,
  children,
  style,
  labelStyle,
}: {
  inputvalue: any;
  inputHandler: any;
  children: any;
  style?: any;
  labelStyle?: any;
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, labelStyle]}>{children}</Text>
      <TextInput
        value={inputvalue}
        onChangeText={inputHandler}
        placeholder="Type here..."
        style={[styles.input, style]}
        multiline={true}
      ></TextInput>
    </View>
  );
}
export default AddInput;
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "gray",
    margin: 5,
    padding: 3,
    backgroundColor: "white",
    borderRadius: 5,
    fontSize: 16,
  },
  inputContainer: {
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
  },
  label: {
    padding: 5,
    fontSize: 18,
  },
});
