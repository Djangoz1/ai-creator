import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { MyMainBtn } from "../btn/MyMainBtn";

import React, { useEffect } from "react";

import {
  doStateFormPointer,
  useFormDispatch,
  useFormState,
} from "context/form";
import { LayoutForm } from "sections/Form/LayoutForm";
import { styles as _styles } from "styles/style";

import { TextAI } from "../text/TextAI";
import { MOOCK } from "constants/moock";

import { FormResponseAI, MyBadge } from "sections/Form/FormResponseAI";
import { MyTitle } from "../text/MyTitle";
import { MySub } from "../text/MySub";
import { MyNum } from "../text/MyNum";
import { v4 } from "uuid";
import { icfy } from "icones";
import { Icon } from "@iconify/react";

export const MyFormCreate = ({ stateInit, components, submit, editer }) => {
  return (
    <LayoutForm
      stateInit={{
        ...stateInit,
        allowed: true,
        form: { ...MOOCK.mission.form, target: "mission" },
        placeholders: MOOCK.mission.placeholders,
      }}
    >
      <Child1 editer={editer} _components={components} submit={submit} />
    </LayoutForm>
  );
};

let Child1 = ({ _components }) => {
  let components = _components.filter((el) => el?.label || el?.component);
  let dispatch = useFormDispatch();

  let { form, pointer } = useFormState();

  const _pointer = useMotionValue(pointer); // Initialize the pointer with a motion value of 0

  const spring = useSpring(_pointer, {
    stiffness: 700, // control the stiffness of the spring
    damping: 30, // control the damping (less damping = more bouncy)
  });
  const width = useTransform(
    spring,
    [0, components.length - 1],
    ["0%", "100%"]
  );

  // Update the pointer value based on the range input
  useEffect(() => {
    spring.set(pointer); // This will animate with the spring transition
  }, [pointer, spring]);

  return (
    <div
      className={`w-screen h-screen ${
        !form?.night ? "text-black dark" : "text-white light"
      }`}
    >
      <div
        className={`fixed -z-1 w-screen top-0   left-0 h-screen ${
          !form?.night ? "m-pattern" : "magicpattern"
        }`}
      ></div>

      <AnimatePresence>
        <motion.div
          key={`form-${pointer}`}
          initial={{ opacity: 0 }} // Initial state of the element when it's about to be mounted
          animate={{ opacity: 1, y: 0 }} // Animate to a visible state
          transition={{ duration: 0.5 }} // Duration of the animation
          className=" flex-auto    flex flex-col items-center  justify-center h-[80vh] "
        >
          {components?.[pointer]?.label ? (
            <TextAI
              text={components?.[pointer]?.label}
              style={"  gap-10   items-center  justify-center relative "}
            >
              {components?.[pointer]?.component}
            </TextAI>
          ) : pointer === components?.length + 1 ? (
            <Resume />
          ) : !form?.description ? (
            <TextAI
              text={"Please return to provide a description of your project"}
              style={"  gap-10   items-center  justify-center relative "}
            ></TextAI>
          ) : (
            <FormResponseAI />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative  flex  min-h-fit flex-col    w-screen      divide-white/5 divide-y gap-3 py-4">
        <div className="w-full flex  justify-center">
          {pointer > 0 && (
            <MyMainBtn
              setter={() => doStateFormPointer(dispatch, pointer - 1)}
              color={1}
              _refresh={false}
              icon={false}
            >
              {" "}
              Previous
            </MyMainBtn>
          )}
        </div>
        <motion.div
          className={`transition shadow1 ${
            !form?.night ? "bg-zinc-900" : "bg-zinc-200"
          } `}
          style={{
            width,
            height: "2px",
            transition: spring,
          }}
        />
        <div className="w-full flex  justify-center">
          {(pointer < components?.length ||
            (form?.ai?.recommandations && pointer === components?.length)) && (
            <MyMainBtn
              color={form?.night ? 0 : 2}
              _refresh={false}
              setter={() => doStateFormPointer(dispatch, pointer + 1)}
            >
              Next
            </MyMainBtn>
          )}
        </div>
      </div>
    </div>
  );
};

let Resume = () => {
  let { form } = useFormState();
  let ai = form?.ai?.recommandations;
  return (
    <div className="  flex divide-x w-full h-full divide-white/5 pt-5">
      <div className="py-20 w-full   z-10 relative overflow-y-scroll    flex px-10 flex-col">
        <MyTitle style={"mb-3  text-2xl "}>{ai?.name}</MyTitle>
        <div className="flex  my-5 flex-wrap gap-2">
          {ai?.roles ? (
            [...ai?.roles?.map((el) => el?.skills_required)]
              ?.flat()
              .map((el) => (
                <MyBadge style={" text-[8px]"} key={v4()}>
                  {el}
                </MyBadge>
              ))
          ) : (
            <></>
          )}
        </div>

        {ai?.budget?.total ? (
          <div className="flex items-center gap-2">
            <MySub>Budget</MySub>
            <div className="font-mono">{ai?.budget?.total} €</div>
          </div>
        ) : (
          <></>
        )}
        <article className=" font-light opacity-50 whitespace-break-spaces text-xs ">
          {ai?.abstract}
        </article>

        <article
          dangerouslySetInnerHTML={{
            __html: ai?.detail,
          }}
          className=" font-extraligth my-6 whitespace-break-spaces opacity-70 pr-10 "
        />

        <div className="flex flex-col divide-y w-full divide-white/5 ">
          {ai?.roles?.map((element, i) => (
            <div
              id={"feature" + i}
              className="flex flex-col-reverse w-full  py-5 "
            >
              <div className=" font-extraligth mb-6  whitespace-break-spaces opacity-70  ">
                {element?.reason}
              </div>

              <div className="flex w-full mb-5 flex-wrap gap-2">
                {element?.skills_required?.map((el, i) => (
                  <MyBadge
                    key={v4()}
                    // color={0}
                    style={"gap-2 border-white/5 border text-[9px]"}
                  >
                    {el}
                  </MyBadge>
                ))}
              </div>
              <div className="flex justify-between w-full  items-start gap-2 mb-2">
                <div className="flex flex-col gap-1">
                  <MyTitle style={"  text-xl "}>{element?.role_name}</MyTitle>

                  {ai?.budget?.roles_budget?.[i]?.allocated_budget ? (
                    <div className="font-mono">
                      {ai?.budget?.roles_budget?.[i]?.allocated_budget} €
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex  flex-col items-end gap-2 ">
                  <MySub size={10} style={"opacity-50"}>
                    #{i + 1}
                  </MySub>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-[15%] relative mt-20  min-w-[250px] flex-col  px-5">
        <div className={"flex w-full flex-col gap-3"}>
          <MyTitle style={"mb-6"}>Roadmap</MyTitle>

          {ai?.roles?.map((el, i) => (
            <a
              href={"#feature" + i}
              className=" w-full text-xs opacity-50 flex gap-2 hover:opacity-70  items-center font-extralight"
              key={v4()}
            >
              <span className="w-[5%] text-[8px]">#{i + 1}</span>
              <Icon icon={icfy.ux.arrow} className={"rotate-90"} />
              {el?.role_name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
