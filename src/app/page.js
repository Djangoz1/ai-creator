"use client";

import { Icon } from "@iconify/react";
import { MyFormCreate } from "components/form/MyForm";

import { MOOCK } from "constants/moock";

import { MySelect } from "components/form/MySelects";
import { ENUMS } from "constants/enums";

import { MyTextArea } from "components/form/MyTextArea";
import { MyInput } from "components/form/MyInput";
import { useFormState } from "context/form";

const PageCreateMission = () => {
  let { form } = useFormState();
  return (
    <MyFormCreate
      stateInit={{
        allowed: true,
        form: {
          ...MOOCK?.mission.form,
        },
      }}
      components={[
        {
          component: <>Click on next to start</>,
          label: "Welcome on our AI Generator !",
        },
        {
          component: (
            <div className="flex  ">
              <MySelect
                style={"w-1/3 justify-center  flex-wrap mx-auto"}
                target={"domain"}
                arr={ENUMS.domain.map((el) => (
                  <>
                    <Icon icon={el?.icon} />
                    {el.name}
                  </>
                ))}
              ></MySelect>
            </div>
          ),
          label: "What is the domain of your mission ?",
        },

        {
          component: (
            <div className="w-3/4 flex  flex-col gap-2">
              <div className="gap-3 flex">
                <MyInput styles={"w-full"} target={"title"} />
                <MyInput styles={"w-full"} target={"company"} />
              </div>
              <MyTextArea
                styles={" w-full  min-h-[10vh] "}
                target={"abstract"}
              />
            </div>
          ),
          label: "Please provide a short description of your project",
        },
        {
          component: (
            <MyTextArea
              styles={" max-h-[48vh] min-h-[30vh] "}
              target={"description"}
            />
          ),
          label: "Please details what is perimeter of your mission",
        },
        {
          component: (
            <div className="flex gap-3 w-1/3 items-center justify-center flex-col">
              <MyInput styles={"w-full"} type={"number"} target={"budget"} />

              <MyInput styles={"w-full"} type={"number"} target={"features"} />
            </div>
          ),
          label: "What is your budget and how many roles you want create ?",
        },
      ]}
    ></MyFormCreate>
  );
};

export default PageCreateMission;
