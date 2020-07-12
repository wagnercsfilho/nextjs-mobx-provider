import { action, observable, computed, runInAction } from "mobx";
import { useStaticRendering } from "mobx-react";
import { useMemo, createContext, useContext } from "react";
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(typeof window === "undefined");

let store;

class Todo {}

class TodoStore {
  @observable todos = [];

  constructor(initialData) {
    this.todos = initialData || [];
  }

  @action
  getTodos = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await res.json();
    this.todos = todos;
  };

  @action
  hydrate = (data) => {
    if (!data) return;

    this.todos = data;
    console.log(this.todos.length);
  };
}

function initializeStore(initialData = null) {
  const _store = store ?? new TodoStore(initialData);

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    _store.hydrate(initialData);
  }
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

export const StoreContext = createContext(store);

export const Provider = (props) => {
  return (
    <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStore = (initialData) => {
  const store = useContext(StoreContext);
  if (!store || !store.hydrate) return store;
  useMemo(() => store.hydrate(initialData), []);
  return store;
};

export function getStore(initialState) {
  return initializeStore(initialState);
}
