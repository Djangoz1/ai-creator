import {
  FormProvider,
  doInitStateForm,
  doStateFormChecked,
  useFormDispatch,
  useFormState,
} from "context/form";

import React, { useEffect, useRef } from "react";

export const LayoutForm = ({ stateInit, children }) => {
  let { pointer } = useFormState();
  let dispatch = useFormDispatch();

  useEffect(() => {
    if (stateInit) doInitStateForm(dispatch, stateInit);
    doStateFormChecked({
      dispatch,
      pointer,
      form: stateInit?.form,
    });
    console.log("Anormal ! Init layout form ...", stateInit);
  }, []);
  return <>{children}</>;
};
