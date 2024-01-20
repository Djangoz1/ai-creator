import React, { useEffect, useRef, useState } from "react";
import { TextAI } from "../../components/text/TextAI";
import { doInitStateForm, useFormDispatch, useFormState } from "context/form";

import { v4 } from "uuid";

import { icfy } from "icones";

import { MyMainBtn } from "components/btn/MyMainBtn";

import { ElementResponseAI } from "./ElementResponseAI";

import { ENUMS } from "constants/enums";
import { MyFlowScheme } from "components/layout/MyFlowScheme";

import { MyTitle } from "components/text/MyTitle";
import { MySub } from "components/text/MySub";

import axios from "axios";
import { MyLoader } from "components/layout/MyLoader";

export const FormResponseAI = () => {
  const { form } = useFormState();

  let dispatch = useFormDispatch();

  let aiResponse = form?.ai?.recommandations;
  let [isLoading, setIsLoading] = useState(null);
  let iaInstructions = async () => {
    const parts = [];

    if (form?.description) {
      parts.push(`Detail: "${form.description}"`);
    }
    // Handle features
    if (form?.features > 0) {
      parts.push(
        `Roles: "I want to create ${form?.features} role(s) but you can change it if necessary"`
      );
    }

    if (form?.budget) {
      parts.push(
        `Budget: "I have ${form?.features} € for budget but you can change it if necessary"`
      );
    }

    // Mention the company
    if (form?.company) {
      parts.push(
        `Detail: "You must also mention the name of the client's company, which is ${form.company}"`
      );
    }
    return parts;
  };

  let fetchAI = async () => {
    let parts = await iaInstructions();
    const data = {
      mission: `Here is my description of mission:\n\n${parts.join("\n")}`,
    };

    doInitStateForm(dispatch, {
      ...form,
      ai: { ...form?.ai, recommandations: null },
    });

    setIsLoading(true);
    await axios
      .post(
        "https://syncflow-api.onrender.com/mission/extract_details?include_raw=false",
        data,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        doInitStateForm(dispatch, {
          ...form,
          ai: { ...form?.ai, recommandations: response?.data },
        });
      })
      .catch(function (error) {
        console.error(error);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    if (!aiResponse && form?.description) {
      fetchAI();
      console.log("fetch ai response");
    }
  }, [form?.description]);

  console.log("airesponse :", aiResponse);

  if (!form?.description) {
    return (
      <TextAI
        text={"Please return and provide a description of your project"}
        style={"  gap-2   items-center h-full justify-center "}
      ></TextAI>
    );
  }

  return (
    <div className=" w-full relative h-full px-4">
      {aiResponse?.name ? (
        <div className="relative  w-full  h-full ">
          <MyFlowScheme
            main={{
              title: aiResponse?.name,
              modal: (
                <>
                  <ElementResponseAI
                    target={"abstract"}
                    text={aiResponse?.abstract}
                  />
                  <ElementResponseAI
                    target={"description"}
                    text={aiResponse?.detail}
                  />

                  {aiResponse?.budget?.total ? (
                    <>
                      <MySub>Budget</MySub>
                      <p className="c3 font-light font3">
                        {aiResponse?.budget?.total} $
                      </p>
                    </>
                  ) : (
                    <p className="font-light text-xs">Budget not matches</p>
                  )}
                </>
              ),
              icon: ENUMS.domain[parseInt(form?.domain || 0n)]?.icon,
            }}
            arr={
              aiResponse?.roles?.map((el, i) => ({
                title: el?.role_name,
                modal: (
                  <>
                    <MySub size={11}>{el?.role_name}</MySub>

                    <div className="w-full flex my-4 flex-wrap gap-2">
                      {el?.skills_required?.map((e, i) => (
                        <MyBadge
                          style={" text-[9px] c3 truncate "}
                          key={v4()}
                          color={1}
                        >
                          <span className="max-w-[100px] hover:max-w-fit truncate">
                            {e}
                          </span>
                        </MyBadge>
                      ))}
                    </div>
                    <TextAI
                      size={10}
                      text={el?.reason}
                      className="text-xs mb-4 font-light hover:text-white/70"
                    />
                    {aiResponse?.budget?.roles_budget?.[i] ? (
                      <>
                        <MyTitle>Budget</MyTitle>
                        <p className="text-xs c3 font-light">
                          {
                            aiResponse?.budget?.roles_budget?.[i]
                              ?.allocated_budget
                          }
                        </p>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ),
              })) || []
            }
          />
        </div>
      ) : (
        <></>
      )}
      {isLoading === true ? (
        <>
          <TextAI
            text={"Please wait while creation of your project"}
            style={"  gap-2   items-center h-full justify-center "}
          >
            <div className="w-[80px] relative mt-[20vh]">
              <MyLoader />
            </div>
          </TextAI>
        </>
      ) : (
        <MyMainBtn
          style={
            "btn-sm font-light absolute top-5  text-xs left-1/2 -translate-x-1/2"
          }
          color={2}
          icon={icfy.ux.refresh}
          setter={() => fetchAI()}
          _refresh={false}
        >
          Reload AI
        </MyMainBtn>
      )}
    </div>
  );
};

export const MyBadge = ({ style, shape, icon, children, color }) => {
  let { form } = useFormState();
  return (
    <div
      className={`${style || "text-xs"}
      backdrop-blur-2xl border px-3 py-1 border-zinc-500/50 rounded-lg shadow-lg ${
        !form?.night ? "text-black bg-black/10  " : "text-white bg-white/10 "
      } flex items-center`}
      // before={icon ? <Icon icon={icon} /> : undefined}
      // stroke
      // shape={shape}
    >
      {children}
    </div>
  );
};
