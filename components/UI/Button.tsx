import { Text, TouchableOpacity, StyleSheet } from "react-native";

function Button({
  children,
  size = 12,
  color = "white",
  backgroundColor = "blue",
  onPress = () => {},
  style = {},
}: {
  children: any;
  size?: number;
  color?: string;
  backgroundColor?: string;
  onPress?: () => void;
  style?: any;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          paddingVertical: size,
          paddingHorizontal: (size * 3) / 2,
          backgroundColor: backgroundColor,
        },
        { ...style },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: color }]}>{children}</Text>
    </TouchableOpacity>
  );
}
export default Button;
const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
});
