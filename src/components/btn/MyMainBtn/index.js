import React, { useState } from "react";
import "./style.css";

import { Icon } from "@iconify/react";
import { icfy } from "icones";
import { useFormState } from "context/form";

export const MyMainBtn = ({
  children,
  form,
  setter,
  color,
  rotate,
  disabled,
  icon,
  style,
}) => {
  let [isLoading, setIsLoading] = useState(null);
  let formState = form ? useFormState() : undefined;

  let handleClick = async () => {
    if (setter) {
      setIsLoading(true);
      if (form) {
        await setter(formState?.form);
      } else {
        await setter();
      }
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${style} w-fit flex gap-2 btn   items-center     transition  ${
        [
          "bg-white border-black border-3 text-black  hover:bg-white/90 ",
          "btn-ghost ",
          "bg-black border-zinc-500 border-3 text-white  hover:bg-black/90 ",
          "bg-green-800 border-zinc-500 border-3 text-white  hover:bg-black/90 ",
        ]?.[color || 0]
      } `}
    >
      {isLoading ? (
        <span className="loading  loading-bars mx-10 loading-xs"></span>
      ) : (
        <>{children ? children : <></>}</>
      )}
      {!icon?.no && icon !== false && (
        <Icon
          icon={icon || icfy.ux.arrow}
          className={` flex-none transition-all ${
            icon
              ? undefined
              : !isLoading && !rotate
              ? " rotate-90"
              : "-rotate-90"
          }`}
        />
      )}
    </button>
  );
};
