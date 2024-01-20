import {
  doInitStateForm,
  doStateFormChecked,
  useFormDispatch,
  useFormState,
} from "context/form";

import React from "react";
import { v4 as uuidv4, v4 } from "uuid";

import { MyMainBtn } from "../btn/MyMainBtn";
export const MySelects = ({ selects, styles }) => {
  let { form, placeholders, checked, pointer } = useFormState();
  let formState = useFormState();
  let dispatch = useFormDispatch();
  console.log("form", form);
  let setter = (target, index, el) => {
    let _form = form;

    _form[target] = index;
    doInitStateForm(dispatch, _form);
    doStateFormChecked({ dispatch, pointer, form, checked });
    if (el?.setter) {
      el?.setter(el?.arr?.[index]);
    }
  };
  console.log("select", selects);
  return (
    <div className={`flex w-fit text-left ${styles}`}>
      {selects?.map(
        (el, i) =>
          el?.target && (
            <MySelect
              target={el?.target}
              label={el?.label}
              arr={el?.arr}
              styles={styles}
              setter={() => setter(el?.target, i, el)}
              key={uuidv4()}
            ></MySelect>
          )
      )}
    </div>
  );
};
export const MySelect = ({ arr, style, target, setter }) => {
  let { form, placeholders, checked, pointer } = useFormState();
  let dispatch = useFormDispatch();

  let handleChange = async (index) => {
    let _form = form;

    _form[target] = index;
    doInitStateForm(dispatch, _form);
    doStateFormChecked({ dispatch, pointer, form, checked });
    if (setter) {
      await setter({ value: arr?.[index], index: parseInt(index) });
    }
  };

  return (
    <div className={`flex items-center gap-2 ${style || "flex-wrap"}`}>
      {(() =>
        Array.isArray(form?.[target])
          ? [
              ...arr,
              ...form?.[target]?.filter((el, _i) => typeof el === "string"),
            ]
          : arr)()?.map((el, i) => (
        <MyMainBtn
          style={"font-light  backdrop-blur  btn-sm px-3 py-2 "}
          color={
            !form?.night
              ? form?.[target] === i
                ? 2
                : 0
              : form?.[target] === i
              ? 3
              : 0
          }
          icon={false}
          key={v4()}
          setter={() => handleChange(i)}
        >
          {el}
        </MyMainBtn>
      ))}
    </div>
  );
};
