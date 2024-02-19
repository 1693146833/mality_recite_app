import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PanResponder,
  Modal,
} from "react-native";
import CardGroup from "../components/CardGroup";
import { useContext, useEffect, useRef, useState } from "react";
import { CardGroupContext } from "../store/CardGroup-Context";
import HomeLongPressOptions from "../components/UI/HomeLongPressOptions";
import { getCardGroup } from "../components/util/util";
import HomeEditAndDeleteModal from "../components/Modals/HomeEditAndDeleteModal";
//import Colors from "../data/colors";

function HomeScreen({ navigation }: { navigation: any }) {
  const [modalVisible, setModalVisible] = useState({
    visible: false,
    x: 0,
    y: 0,
  });
  const [groupId, setGroupId] = useState(0);
  const [ediDelModalVisible, setEdiDelModalVisible] = useState({
    visibal: false,
    type: "",
    cardGroup: { name: "" },
  });
  function cardGroupPreeHandler(id: number, learn: number, review: number) {
    navigation.navigate("CardsPage", { id: id, learn: learn, review: review });
  }
  const cardGroupCtx = useContext(CardGroupContext);
  function handlePressOutside() {
    setModalVisible({ visible: false, x: 0, y: 0 });
  }
  function groupEditHandler() {
    const cardGroup = getCardGroup(cardGroupCtx.cardGroups, groupId.toString());
    setEdiDelModalVisible({
      visibal: true,
      type: "edit",
      cardGroup: cardGroup,
    });
  }
  function groupDeleteHandler() {
    const cardGroup = getCardGroup(cardGroupCtx.cardGroups, groupId.toString());

    setEdiDelModalVisible({ visibal: true, type: "del", cardGroup: cardGroup });
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cardGroup}>
        <FlatList
          data={cardGroupCtx.cardGroups}
          renderItem={({ item, index }) => (
            <View>
              <CardGroup
                name={item.name}
                data={item.cardList}
                id={item.id}
                index={index}
                onPress={cardGroupPreeHandler}
                setModalVisible={setModalVisible}
                setGroupId={setGroupId}
              />
            </View>
          )}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={(item) => item.id.toString()} // Convert the id to a string
        />
      </View>

      <Modal
        visible={modalVisible.visible}
        transparent={true}
        animationType="fade"
        onRequestClose={handlePressOutside}
      >
        <TouchableWithoutFeedback onPress={handlePressOutside}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View
              style={[
                styles.modalcontainer,
                { top: modalVisible.y, left: modalVisible.x },
              ]}
            >
              <HomeLongPressOptions
                onPressEdit={groupEditHandler}
                onPressDelete={groupDeleteHandler}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <HomeEditAndDeleteModal
        groupId={groupId}
        ediDelModalVisible={ediDelModalVisible}
        setEdiDelModalVisible={setEdiDelModalVisible}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOuterContainer: {
    flex: 1,
    position: "absolute",
  },
  modalcontainer: {
    //flex: 1,
    //position: "absolute",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    zIndex: 15,
    elevation: Platform.OS === "android" ? 50 : 0,
  },
  cardGroup: {
    //backgroundColor: Colors.primary,
    flex: 1,
  },
  flatListContainer: {
    paddingBottom: 80,
  },
});
