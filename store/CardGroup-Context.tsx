import { createContext, useReducer, useState } from "react";
import defaultCardGroups from "../data/defaultCardGroup";
let originalCardGroups = defaultCardGroups;
const fetchDataFromStorage = async () => {
  try {
    // 从 AsyncStorage 中读取存储的数据
    const data = await AsyncStorage.getItem("userData");
    if (data !== null) {
      // 如果找到数据，将其转换为 JavaScript 对象并更新状态
      originalCardGroups = JSON.parse(data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
fetchDataFromStorage();

import {
  createdTimeStamp,
  createduuid,
  updateCardTimeStampAccordingToProgress,
} from "../components/util/util";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CardGroupContext = createContext<{
  cardGroups: any[];
  headerData: any;
  stats: any;
  setStats: (stats: any) => void;
  setHeaderData: (headerData: any) => void;
  addCardGroup: (cardGroup: any) => void;
  removeCardGroup: (id: string) => void;
  updateCardGroup: (cardGroup: any) => void;
  addCard: (id: string, card: any) => void;
  removeCard: (id: string, cardId: string) => void;
  updateCard: (id: string, card: any) => void;
  updateCardProgress: (id: string, cardId: string, progress: number) => void;
  updateCardTimestamp: (id: string, cardId: string, timestamp: number) => void;
}>({
  cardGroups: [],
  headerData: {},
  stats: {},
  setStats: (stats: any) => {},
  setHeaderData: (headerData: any) => {},
  addCardGroup: (cardGroup: any) => {},
  removeCardGroup: (id: string) => {},
  updateCardGroup: (cardGroup: any) => {},
  addCard: (id: string, card: any) => {},
  removeCard: (id: string, cardId: string) => {},
  updateCard: (id: string, card: any) => {},
  updateCardProgress: (id: string, cardId: string, progress: number) => {},
  updateCardTimestamp: (id: string, cardId: string, timestamp: number) => {},
});
function CardGroupReducer(state: any, action: any) {
  switch (action.type) {
    case "ADD_CARDGROUP":
      return [...state, action.cardGroup];
    case "REMOVE_CARDGROUP":
      return state.filter((cardGroup: any) => cardGroup.id !== action.id);
    case "UPDATE_CARDGROUP":
      return state.map((cardGroup: any) => {
        if (cardGroup.id === action.cardGroup.id) {
          return action.cardGroup;
        }
        return cardGroup;
      });
    case "ADD_CARD":
      //console.log(state, "haha", action.id);
      return state.map((cardGroup: any) => {
        if (cardGroup.id === action.id) {
          //console.log(action.card, action.id);
          return {
            ...cardGroup,
            cardList: [...cardGroup.cardList, action.card],
          };
        }
        return cardGroup;
      });
    case "REMOVE_CARD":
      return state.map((cardGroup: any) => {
        if (cardGroup.id === action.id) {
          return {
            ...cardGroup,
            cardList: cardGroup.cardList.filter(
              (card: any) => card.id !== action.cardId
            ),
          };
        }
        return cardGroup;
      });
    case "UPDATE_CARD":
      return state.map((cardGroup: any) => {
        if (cardGroup.id === action.id) {
          return {
            ...cardGroup,
            cardList: cardGroup.cardList.map((card: any) => {
              if (card.id === action.card.id) {
                return action.card;
              }
              return card;
            }),
          };
        }
        return cardGroup;
      });
    case "UPDATE_CARD_PROGRESS":
      return state.map((cardGroup: any) => {
        if (cardGroup.id === action.id) {
          return {
            ...cardGroup,
            cardList: cardGroup.cardList.map((card: any) => {
              if (card.id === action.cardId) {
                return {
                  ...card,
                  progress: action.progress,
                  timestamp: updateCardTimeStampAccordingToProgress(
                    action.progress
                  ),
                };
              }
              return card;
            }),
          };
        }
        return cardGroup;
      });
    case "UPDATE_CARD_TIMESTAMP":
      return state.map((cardGroup: any) => {
        if (cardGroup.id === action.id) {
          return {
            ...cardGroup,
            cardList: cardGroup.cardList.map((card: any) => {
              if (card.id === action.cardId) {
                return {
                  ...card,
                  timestamp: action.timestamp,
                };
              }
              return card;
            }),
          };
        }
        return cardGroup;
      });
    default:
      return state;
  }
}
function CardGroupContextProvider({ children }: { children: any }) {
  const [cardGroups, dispatch] = useReducer(
    CardGroupReducer,
    originalCardGroups
  );
  const [headerData, setHeaderData] = useState({});
  const [stats, setStats] = useState({});
  function addCardGroup(cardGroup: any) {
    cardGroup = {
      ...cardGroup,
      id: createduuid(),
      cardList: [],
    };
    dispatch({ type: "ADD_CARDGROUP", cardGroup });
  }
  function removeCardGroup(id: string) {
    dispatch({ type: "REMOVE_CARDGROUP", id });
  }
  function updateCardGroup(cardGroup: any) {
    dispatch({ type: "UPDATE_CARDGROUP", cardGroup });
  }
  function addCard(id: string, card: any) {
    card = {
      ...card,
      id: createduuid(),
      progress: 0,
      timestamp: createdTimeStamp(),
    };
    dispatch({ type: "ADD_CARD", id, card });
  }
  function removeCard(id: string, cardId: string) {
    dispatch({ type: "REMOVE_CARD", id, cardId });
  }
  function updateCard(id: string, card: any) {
    dispatch({ type: "UPDATE_CARD", id, card });
  }
  function updateCardProgress(id: string, cardId: string, progress: number) {
    dispatch({ type: "UPDATE_CARD_PROGRESS", id, cardId, progress });
  }
  function updateCardTimestamp(id: string, cardId: string, timestamp: number) {
    dispatch({ type: "UPDATE_CARD_TIMESTAMP", id, cardId, timestamp });
  }
  const value = {
    cardGroups: cardGroups,
    addCardGroup,
    removeCardGroup,
    updateCardGroup,
    addCard,
    removeCard,
    updateCard,
    updateCardProgress,
    updateCardTimestamp,
    headerData,
    setHeaderData,
    stats,
    setStats,
  };
  return (
    <CardGroupContext.Provider value={value}>
      {children}
    </CardGroupContext.Provider>
  );
}
export default CardGroupContextProvider;
