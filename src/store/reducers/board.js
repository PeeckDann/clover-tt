import List from "../../models/list";
import Card from "../../models/card";
import {
  ADD_LIST,
  CLEAR_LIST,
  DELETE_LIST,
  CLEAR_BOARD,
  ADD_CARD,
  DELETE_CARD,
  EDIT_LIST,
  EDIT_CARD,
} from "../actions/board";

const initialState = {
  lists: [],
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST: {
      const updatedLists = [...state.lists];
      const newList = new List(Math.random(), action.title);
      updatedLists.push(newList);
      return { lists: updatedLists };
    }

    case EDIT_LIST: {
      const updatedLists = [...state.lists];
      const currentListIndex = updatedLists.findIndex(
        (list) => list.id === action.id
      );
      updatedLists[currentListIndex].title = action.title;
      return { lists: updatedLists };
    }

    case CLEAR_LIST: {
      const updatedLists = [...state.lists];
      const currentListIndex = updatedLists.findIndex(
        (list) => list.id === action.id
      );
      updatedLists[currentListIndex].cards = [];
      return { lists: updatedLists };
    }

    case DELETE_LIST: {
      const updatedLists = state.lists.filter((list) => list.id !== action.id);
      return { lists: updatedLists };
    }

    case ADD_CARD: {
      const updatedLists = [...state.lists];
      const currentListIndex = updatedLists.findIndex(
        (list) => list.id === action.listId
      );
      const newCard = new Card(
        Math.random(),
        action.listId,
        action.title,
        new Date().getTime()
      );
      updatedLists[currentListIndex].cards.push(newCard);
      return { lists: updatedLists };
    }

    case EDIT_CARD: {
      const updatedLists = [...state.lists];
      const currentListIndex = updatedLists.findIndex(
        (list) => list.id === action.listId
      );
      const currentCardIndex = updatedLists[currentListIndex].cards.findIndex(
        (card) => card.id === action.id
      );
      updatedLists[currentListIndex].cards[currentCardIndex].title =
        action.title;
      updatedLists[currentListIndex].cards[currentCardIndex].lastEdited =
        new Date().getTime();
      return { lists: updatedLists };
    }

    case DELETE_CARD: {
      const prevLists = [...state.lists];
      const currentListIndex = prevLists.findIndex(
        (list) => list.id === action.listId
      );
      const updatedLists = [...prevLists];
      updatedLists[currentListIndex].cards = prevLists[
        currentListIndex
      ].cards.filter((card) => card.id !== action.id);
      return { lists: updatedLists };
    }

    case CLEAR_BOARD:
      return initialState;

    default:
      return state;
  }
};

export default boardReducer;
