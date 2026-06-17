import { useReducer, useCallback } from "react";

const httpReducer = (state, action) => {
  switch (action.type) {
    case "PENDING":
      return {
        data: null,
        isLoading: true,
        error: null,
      };

    case "SUCCESS":
      return {
        data: action.payload,
        isLoading: false,
        error: null,
      };

    case "ERROR":
      return {
        data: null,
        isLoading: false,
        error: action.error,
      };
  }
};

const useHttp = (requestFunction, startWithLoading = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    data: null,
    isLoading: startWithLoading,
    error: null,
  });

  const sendRequest = useCallback(async (requestData) => {
    try {
      dispatch({ type: "PENDING" });
      const res = await requestFunction(requestData);
      dispatch({ type: "SUCCESS", payload: res });
    } catch (err) {
      dispatch({
        type: "ERROR",
        error: err?.response?.data?.message || "Something went wrong",
      });
    }
  }, [requestFunction]);

  return { ...httpState, sendRequest };
};

export default useHttp;
