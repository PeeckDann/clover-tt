export const ADD_LIST = "ADD_LIST";
export const EDIT_LIST = "EDIT_LIST";
export const CLEAR_LIST = "CLEAR_LIST";
export const DELETE_LIST = "DELETE_LIST";

export const ADD_CARD = "ADD_CARD";
export const EDIT_CARD = "EDIT_CARD";
export const DELETE_CARD = "DELETE_CARD";

export const CLEAR_BOARD = "CLEAR_BOARD";

export const addList = (title) => {
  return {
    type: ADD_LIST,
    title,
  };
};

export const editList = (id, title) => {
  return {
    type: EDIT_LIST,
    id,
    title,
  };
};

export const clearList = (id) => {
  return {
    type: CLEAR_LIST,
    id,
  };
};

export const deleteList = (id) => {
  return {
    type: DELETE_LIST,
    id,
  };
};

export const addCard = (listId, title) => {
  return {
    type: ADD_CARD,
    listId,
    title,
  };
};

export const editCard = (id, listId, title) => {
  return {
    type: EDIT_CARD,
    id,
    listId,
    title,
  };
};

export const deleteCard = (id, listId) => {
  return {
    type: DELETE_CARD,
    listId,
    id,
  };
};

export const clearBoard = () => {
  return {
    type: CLEAR_BOARD,
  };
};
