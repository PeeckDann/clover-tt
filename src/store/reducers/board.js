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
  DRAG_CARD,
  FETCH_BOARD,
} from "../actions/board";

const initialState = {
  lists: [],
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST: {
      const updatedLists = [...state.lists];
      const newList = new List(Math.random() + "l", action.title);
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
        Math.random() + "c",
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

    case DRAG_CARD: {
      const { source, destination, draggableId } = action.result;
      if (!destination) {
        return state;
      }
      const updatedLists = [...state.lists];
      const sourceListIndex = updatedLists.findIndex(
        (list) => list.id === source.droppableId
      );
      const destinationListIndex = updatedLists.findIndex(
        (list) => list.id === destination.droppableId
      );
      const cardToDrop = updatedLists[sourceListIndex].cards.find(
        (card) => card.id === draggableId
      );
      if (source.droppableId !== destination.droppableId) {
        updatedLists[sourceListIndex].cards[source.index].lastEdited =
          new Date().getTime();
      }
      updatedLists[sourceListIndex].cards.splice(source.index, 1);
      updatedLists[destinationListIndex].cards.splice(
        destination.index,
        0,
        cardToDrop
      );
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

    case FETCH_BOARD:
      return { lists: action.persistedState };

    case CLEAR_BOARD:
      return initialState;

    default:
      return state;
  }
};

export default boardReducer;
