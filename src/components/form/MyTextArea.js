import {
  doInitStateForm,
  doStateFormChecked,
  doStateFormDisabled,
  useFormDispatch,
  useFormState,
} from "context/form";

import React, { useEffect, useState } from "react";

export const MyTextArea = ({
  rows,

  target,

  styles,
}) => {
  let { form, placeholders, pointer, modal, checked } = useFormState();
  let [value, setValue] = useState(null);
  let dispatch = useFormDispatch();

  useEffect(() => {
    if (target && !value) setValue(form?.[target]);
  }, [target, modal]);

  let handleChange = (_value) => {
    setValue(_value);
    let _form = form;

    _form[target] = _value;
    doInitStateForm(dispatch, form);

    if (_value?.length === 0) {
      doStateFormDisabled(dispatch, true);
    } else {
      doStateFormChecked({ dispatch, pointer, form, checked });
    }
  };

  return (
    <div className={`flex  w-full  relative  flex-col  `}>
      <textarea
        rows={rows || undefined}
        onChange={(e) => handleChange(e.target.value)}
        value={value || undefined}
        className={`textarea backdrop-blur font2 border border-zinc-500  focus:bg-white/5  bg-white/0    font-light  ${
          styles || "min-h-[10vh] max-h-[40vh] "
        }`}
        placeholder={placeholders?.[target]}
      ></textarea>
    </div>
  );
};
