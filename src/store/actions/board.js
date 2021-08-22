export const ADD_LIST = "ADD_LIST";
export const EDIT_LIST = "EDIT_LIST";
export const CLEAR_LIST = "CLEAR_LIST";
export const DELETE_LIST = "DELETE_LIST";

export const ADD_CARD = "ADD_CARD";
export const EDIT_CARD = "EDIT_CARD";
export const DRAG_CARD = "DRAG_CARD";
export const DELETE_CARD = "DELETE_CARD";

export const FETCH_BOARD = "FETCH_BOARD";
export const CLEAR_BOARD = "CLEAR_BOARD";

const BASE_URL = "http://localhost:5000";
const HEADERS = {
  "Access-Control-Allow-Origin": "*",
};

export const addList = (title) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_LIST,
      title,
    });
    saveBoard(getState().board.lists);
  };
};

export const editList = (id, title) => {
  return (dispatch, getState) => {
    dispatch({
      type: EDIT_LIST,
      id,
      title,
    });
    saveBoard(getState().board.lists);
  };
};

export const clearList = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: CLEAR_LIST,
      id,
    });
    saveBoard(getState().board.lists);
  };
};

export const deleteList = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_LIST,
      id,
    });
    saveBoard(getState().board.lists);
  };
};

export const addCard = (listId, title) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_CARD,
      listId,
      title,
    });
    saveBoard(getState().board.lists);
  };
};

export const editCard = (id, listId, title) => {
  return (dispatch, getState) => {
    dispatch({
      type: EDIT_CARD,
      id,
      listId,
      title,
    });
    saveBoard(getState().board.lists);
  };
};

export const dragCard = (result) => {
  return (dispatch, getState) => {
    dispatch({
      type: DRAG_CARD,
      result,
    });
    saveBoard(getState().board.lists);
  };
};

export const deleteCard = (id, listId) => {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_CARD,
      listId,
      id,
    });
    saveBoard(getState().board.lists);
  };
};

export const fetchBoard = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/get`, {
        method: "GET",
        headers: HEADERS,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData);
      }

      const persistedState = await response.json();
      console.log(persistedState);

      dispatch({
        type: FETCH_BOARD,
        persistedState: persistedState,
      });
    } catch (err) {
      alert(err);
    }
  };
};

export const clearBoard = () => {
  return (dispatch, getState) => {
    dispatch({
      type: CLEAR_BOARD,
    });
    saveBoard(getState().board.lists);
  };
};

const saveBoard = async (stateToPersist) => {
  try {
    const response = await fetch(`${BASE_URL}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...HEADERS },
      body: JSON.stringify(stateToPersist),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }
  } catch (err) {
    alert(err);
  }
};
