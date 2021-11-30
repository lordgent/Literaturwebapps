import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  stsLogin: false,
  user: {},
  isLoading: true,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("tokenkey", payload.token);
      return {
        ...state,
        stsLogin: true,
        isLoading: false,
        user: payload,
      };
    case "LOGOUT":
      localStorage.removeItem("tokenkey");
      return {
        stsLogin: false,
        user: {},
      };
    case "ISLOADING":
      return {
        ...state,
        isLoading: false,
      };
    case "AUTH":
      const token = localStorage.getItem("tokenkey");
      return token
        ? {
            stsLogin: true,
            user: payload,
            token,
          }
        : {
            stsLogin: false,
          };

    default:
      throw new Error();
  }
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
