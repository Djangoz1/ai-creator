import { MySub } from "components/text/MySub";
import { TextAI } from "components/text/TextAI";
import { useFormState } from "context/form";

export const ElementResponseAI = ({
  style,
  title,
  children,

  target,
}) => {
  const { form } = useFormState();
  return (
    <div className="w-full hover:text-white/70 h-fit  py-2 px-1 hover:bg-white/5 flex flex-col  on_hover relative">
      <MySub style={"mb-3"} size={8}>
        {title || target}
      </MySub>

      <TextAI
        size={11}
        text={`${children ? children : ""}${form?.[target]}`}
        style={"mb-4  " + style}
      ></TextAI>
    </div>
  );
};
