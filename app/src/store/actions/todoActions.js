import * as actions from './actionTypes';

// Add a todo
export const addTodo = data => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actions.ADD_TODO_START });
  try {
    const res = await firestore
      .collection('todos')
      .doc(userId)
      .get();
    const newTodo = {
      id: new Date().valueOf(),
      todo: data.todo,
    };
    if (!res.data()) {
      firestore
        .collection('todos')
        .doc(userId)
        .set({
          todos: [newTodo],
        });
    } else {
      firestore
        .collection('todos')
        .doc(userId)
        .update({
          todos: [...res.data().todos, newTodo],
        });
    }
    dispatch({ type: actions.ADD_TODO_SUCCESS });
    return true;
  } catch (err) {
    dispatch({ type: actions.ADD_TODO_FAIL, payload: err.message });
  }
};

// Delete todo
export const deleteTodo = id => async(
  dispatch,
  getState,
  {getFirestore}
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({type: actions.DELETE_TODO_START });
  try {
    const res = await firestore
      .collection('todos')
      .doc(userId)
      .get();
    const previousTodos = res.data().todos;
    const newTodos = previousTodos.filter(todo => todo.id !== id)
    await firestore
      .collection('todos')
      .doc(userId)
      .update({
        todos: newTodos,
      })

    dispatch({type: actions.DELETE_TODO_SUCCESS})
  } catch(err) {
    dispatch({type: actions.DELETE_TODO_FAIL, payload: err.message})
  }
}

// edit todo
export const editTodo = (id, data) => async(dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid
  // At some point can make new reducers things that are EDIT_TODO_START, EDIT_TODO_SUCCESS, EDIT_TODO_FAIL, but they are the same as ADD_TODO_START, ADD_TODO_SUCCESS, and ADD_TODO_FAIL
  dispatch({type: actions.ADD_TODO_START})
  try{
    const res = await firestore
      .collection('todos')
      .doc(userId)
      .get();
    const todos = res.data().todos;
    const index = todos.findIndex(todo => todo.id === id);
    todos[index].todo = data.todo;

    await firestore
      .collection('todos')
      .doc(userId)
      .update({
        todos,
    })
    dispatch({ type: actions.ADD_TODO_SUCCESS })
    return true
  } catch (err) {
    dispatch({type: actions.ADD_TODO_FAIL, payload: err.message})
  }
}

// Add a friend
export const addFriend = data => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actions.ADD_FRIEND_START });
  try {
    const res = await firestore
      .collection('friends')
      .doc(userId)
      .get();
    const newFriend = {
      id: new Date().valueOf(),
      friend: data.friend,
    };
    if (!res.data()) {
      firestore
        .collection('friends')
        .doc(userId)
        .set({
          friends: [newFriend],
        });
    } else {
      firestore
        .collection('friends')
        .doc(userId)
        .update({
          friends: [...res.data().friends, newFriend],
        });
    }
    dispatch({ type: actions.ADD_FRIEND_SUCCESS });
    return true;
  } catch (err) {
    dispatch({ type: actions.ADD_FRIEND_FAIL, payload: err.message });
  }
};

// Delete friend
export const deleteFriend = id => async(
  dispatch,
  getState,
  {getFirestore}
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({type: actions.DELETE_FRIEND_START });
  try {
    const res = await firestore
      .collection('friends')
      .doc(userId)
      .get();
    const previousFriends = res.data().friends;
    const newFriends = previousFriends.filter(friend => friend.id !== id)
    await firestore
      .collection('friends')
      .doc(userId)
      .update({
        friends: newFriends,
      })

    dispatch({type: actions.DELETE_FRIEND_SUCCESS})
  } catch(err) {
    dispatch({type: actions.DELETE_FRIEND_FAIL, payload: err.message})
  }
}