"use client";
import { Icon } from "@iconify/react";
import { useFormState } from "context/form";
import { icfyGITHUB, icfyLINKEDIN } from "icones";
import React from "react";

export const MyFooter = () => {
  let { form } = useFormState();
  return (
    <footer
      className={` ${
        !form?.night ? "text-black" : "text-white"
      } w-screen  relative  snap-start h-screen flex z-10  `}
    >
      <div className="mx-auto w-full  px-5 pt-16 md:px-10 md:pt-24 h-fit mt-auto lg:pt-32 ">
        <div className="mb-12 font-bold inline-block max-w-full font3">
          WORK.ai
        </div>
        <div className="grid grid-cols-[auto_1fr] justify-between gap-10 sm:grid-cols-3 lg:grid-cols-[0.45fr_auto_auto_auto]">
          <div className="flex max-w-[400px] flex-col gap-8 max-[991px]:[grid-area:span_1/span_3/span_1/span_3] max-[479px]:[grid-area:span_1/span_2/span_1/span_2]">
            <p className="font-light">Crafted with ❤️ by Djangone Valentin</p>
            <div className="mt-4">
              <p
                className={`font-bold uppercase ${
                  form?.night ? "text-[#c9fd02]" : "text-amber-900"
                } `}
              >
                Contact me
              </p>
              <p className="">djangone.valentin@gmail.com</p>
            </div>
          </div>
          <a
            href="https://github.com/valentindjangone"
            className="h-fit font-semibold"
          >
            <p className="mb-4 text-xl ">Github</p>
            <span className="py-2 text-sm font-light opacity-50 transition hover:opacity-100">
              <Icon icon={icfyGITHUB} className="text-[64px]" />
            </span>
          </a>
          <a
            href="https://www.linkedin.com/in/valentin-djangon%C3%A9-b820981b2/?originalSubdomain=fr"
            className="h-fit font-semibold"
          >
            <p className="mb-4 text-xl ">LinkedIn</p>
            <span className="py-2 text-sm font-light opacity-50 transition hover:opacity-100">
              <Icon icon={icfyLINKEDIN} className="text-[64px]" />
            </span>
          </a>
        </div>
        <div className="mb-20  mt-20 w-full border border-solid border-[#101010]"></div>
        <div className="flex flex-col items-center justify-between md:flex-row pb-5">
          <div className="flex-none">
            <p className="">© Copyright 2023. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
