import { doInitStateForm, useFormDispatch, useFormState } from "context/form";
import { useEffect, useState } from "react";

import "./style.css";
import { Icon } from "@iconify/react";

export let MyInput = ({
  target,
  min,

  max,
  index,

  _placeholder,

  step,
  type,

  styles,

  color,
}) => {
  let { form, placeholders } = useFormState();

  let dispatch = useFormDispatch();

  let handleChange = async (_value) => {
    let _form = { ...form };

    _form[target] = _value;

    doInitStateForm(dispatch, _form);
  };
  let [isFocus, setIsFocus] = useState(null);

  let handleFocus = () => {
    setIsFocus(true);
  };
  let handleBlur = () => {
    setIsFocus(false);
  };

  useEffect(() => {
    if (min) {
      if (index >= 0 && parseFloat(form?.[target]?.[index]) < min) {
        handleChange(min);
      } else if (parseFloat(form?.[target]) < min) {
        handleChange(min);
      }
    }
  }, [min]);
  useEffect(() => {
    if (max) {
      if (index >= 0 && parseFloat(form?.[target]?.[index]) > max) {
        handleChange(max);
      } else if (parseFloat(form?.[target]) > max) {
        handleChange(max);
      }
    }
  }, [max]);

  return (
    <div className={` ${styles || "w-fit   "}`}>
      <div
        className={` border border-zinc-500   backdrop-blur  w-full  py-1  flex items-center h-fit rounded-lg  `}
      >
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          type={type ? type : "text"}
          placeholder={_placeholder || placeholders?.[target]}
          onChange={(e) => handleChange(e.target.value)}
          min={min || null}
          max={max || null}
          step={step || null}
          value={
            index >= 0 && form?.[target]?.[index] >= 0
              ? form?.[target]?.[index]
              : form?.[target]
              ? form?.[target]
              : ""
          }
          className={` w-full ${isFocus && "border-none"} font3
          ${
            [" font-medium", " font-black   "]?.[color || 0]
          } appearance-none bg-white/0  input-xs input placeholder:font-light   py-1 h-fit `}
        />
      </div>
    </div>
  );
};
