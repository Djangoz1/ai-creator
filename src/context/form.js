"use client";

import { createContext, useContext, useReducer } from "react";

// Mise en place du reducer auth
const reducer = (currentState, newState) => {
  return { ...currentState, ...newState };
};

// Création des context pour state & dispatch
export const FormStateContext = createContext();
export const FormDispatchContext = createContext();

const initialState = {
  status: "wait init",
  form: null,

  placeholders: null,
  pointer: 0,
  disabled: true,
  checked: [],
};

export const doStateFormDisabled = (dispatch, disabled) => {
  dispatch({ status: "pending" });
  dispatch({
    status: "success",
    disabled,
  });
};

export const doStateFormPointer = (dispatch, pointer) => {
  dispatch({ status: "pending" });
  dispatch({
    status: "success",
    pointer,
  });
};

export const doStateFormRefresh = (dispatch) => {
  dispatch({ status: "pending" });
  dispatch({
    status: "wait init",
    form: null,
    modal: false,
    placeholders: null,
    pointer: 0,
    disabled: true,
    checked: [],
    superChecked: [],
  });
};

export const doStateFormChecked = ({ dispatch, pointer, form, checked }) => {
  let disabled = false;
  let _checked = checked;

  for (let index = 0; index < _checked?.[pointer]?.length; index++) {
    let value = _checked?.[pointer]?.[index];
    if (superChecked && value?.bool !== undefined) {
      disabled = value.bool === false ? true : false;

      if (value?.bool === false) {
        break;
      }
    } else {
      let value = form[_checked[pointer][index]];
      if (value === null) {
        disabled = true;
      }
    }
  }

  dispatch({ status: "success", disabled });
};

export const doInitStateForm = async (dispatch, form) => {
  dispatch({ status: "pending" });

  if (form?.form) {
    dispatch({
      status: "success",
      form: { ...form?.form, aiAssisted: 1 },
      placeholders: {
        ...form?.placeholders,
        feedbacks: "What do you think about Aly",
      },
      checked: form?.checked,
      superChecked: form?.superChecked,
      pointer: 0,
    });
  } else {
    dispatch({
      status: "success",
      form: form,
    });
  }
};

// Mise à disposition des fonctions à réutiliser dans les components
export const useFormState = () => {
  const context = useContext(FormStateContext);
  if (!context) throw new Error("useFormState must be used in FormProvider");
  return context;
};
export const useFormDispatch = () => {
  const context = useContext(FormDispatchContext);
  if (!context) throw new Error("useFormDispatch must be used in FormProvider");

  return context;
};

// Mise en place du Provider de l'App
export const FormProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FormStateContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>
        {props.children}
      </FormDispatchContext.Provider>
    </FormStateContext.Provider>
  );
};
