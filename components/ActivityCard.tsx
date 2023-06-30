"use client"

import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft } from "react-icons/fi";
import { GiKnifeFork } from "react-icons/gi";
import { FaWalking } from "react-icons/fa";
import { WiTime10 } from "react-icons/wi";
import {
  format,
  startOfWeek,
  addDays,
  subDays,
  isSameDay,
  isAfter,
  min,
} from "date-fns";
import { useRect } from "shared/hooks/useRect";

const ActivityCard = () => {
  const [activeDate, setActiveDate] = useState(new Date());
  const dayContainerRef = useRef<HTMLDivElement>(null);

  const containerRect = useRect(dayContainerRef);

  const noOfDays = containerRect?.width > 14 * 16 ? 7 : 3;

  const addWeek = () => {
    setActiveDate((prev) => min([new Date(), addDays(prev, noOfDays)]));
  };

  const subtractWeek = () => {
    setActiveDate((prev) => subDays(prev, noOfDays));
  };

  const filteredDays = useMemo(() => {
    let start =
      noOfDays === 7
        ? startOfWeek(activeDate, { weekStartsOn: 0 })
        : subDays(activeDate, 1);
    return [...Array(noOfDays)].map((_, index) => {
      const weekDay = addDays(start, index);
      return {
        date: weekDay,
        day: format(weekDay, "E"),
        dateNumber: format(weekDay, "d"),
        month: format(weekDay, "MMM"),
      };
    });
  }, [activeDate, noOfDays]);

  return (
    <div className="no-scrollbar flex max-h-full flex-col gap-3 self-stretch overflow-hidden overflow-y-scroll rounded-3xl bg-[#121212] p-5 @container">
      <div className="text-white">
        <div className="text-2xl font-semibold">Activity Tracking</div>
        <div className="font-light">{format(new Date(), "MMMM, yy")}</div>
      </div>

      <div className="flex items-center gap-3 text-neutral-400">
        <div className="grow">Goals</div>
        <div
          className="grid cursor-pointer place-items-center rounded-xl border border-neutral-800 p-1 duration-200 hover:border-neutral-400"
          onClick={subtractWeek}
        >
          <FiChevronLeft size={20} />
        </div>
        <div
          className="grid rotate-180 cursor-pointer place-items-center rounded-xl border border-neutral-800 p-1 duration-200 hover:border-neutral-400"
          onClick={addWeek}
        >
          <FiChevronLeft size={20} />
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-3 gap-2 @[14rem]:grid-cols-7"
        ref={dayContainerRef}
      >
        {filteredDays.map((item, index) => (
          <div
            className={`relative flex cursor-pointer flex-col items-center self-stretch overflow-hidden rounded-2xl bg-[#212121] px-2 py-3 ${
              isSameDay(item.date, activeDate)
                ? "ring-2 ring-sky-300 ring-offset-2 ring-offset-[#121212]"
                : "ring-0"
            }
            ${
              isAfter(item.date, new Date())
                ? "pointer-events-none opacity-50"
                : ""
            }
            `}
            key={item.date.toISOString()}
            onClick={() => setActiveDate(item.date)}
          >
            <div className="text-sm text-neutral-500">{item.day}</div>
            <div className="mt-5 text-xl font-bold text-white">
              {item.dateNumber}
            </div>
            <div className="text-xs text-neutral-500">{item.month}</div>
          </div>
        ))}
      </motion.div>

      <div className="flex items-center gap-3 text-neutral-400">Intake</div>

      <div className="grid grid-cols-3 gap-2 @[14rem]:grid-cols-7">
        {filteredDays.map((item, index) => (
          <div
            className={`relative flex cursor-pointer flex-col items-center self-stretch overflow-hidden rounded-2xl bg-[#212121] px-2 py-3 ${
              isSameDay(item.date, activeDate)
                ? "ring-2 ring-sky-300 ring-offset-2 ring-offset-[#121212]"
                : "ring-0"
            } ${
              isAfter(item.date, new Date())
                ? "pointer-events-none opacity-50"
                : ""
            }`}
            key={index}
            onClick={() => setActiveDate(item.date)}
          >
            <div className="text-sm text-neutral-500">{item.day}</div>
            <div className="mt-5 text-xl font-bold text-white">
              {item.dateNumber}
            </div>
            <div className="text-xs text-neutral-500">{item.month}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-x-4 gap-y-2 @[14rem]:grid-flow-col-dense @[14rem]:grid-cols-2">
        <div className="flex items-baseline rounded-2xl bg-[#212121] px-3 py-2 text-sm text-neutral-400 @[14rem]:col-span-1 @[14rem]:row-span-1 ">
          <GiKnifeFork size={20} className="mr-4 flex-shrink-0 self-center" />
          <div className="mr-2 text-2xl font-bold text-white">+12</div>
          <div className="text-xs text-neutral-500">Calories</div>
        </div>

        <div className="flex items-baseline rounded-2xl bg-[#212121] px-3 py-2 text-sm text-neutral-400 @[14rem]:col-span-1 @[14rem]:row-span-1 ">
          <FaWalking size={20} className="mr-4 flex-shrink-0 self-center" />
          <div className="mr-2 text-2xl font-bold text-white">12k</div>
          <div className="text-xs text-neutral-500">Steps</div>
        </div>

        <div className="flex items-center rounded-3xl bg-[#212121] p-3 text-neutral-400 @[14rem]:col-span-1 @[14rem]:row-span-2">
          <WiTime10 size={36} className="mr-2 self-center " />
          <div className="flex flex-col justify-center">
            <div className="mr-4 text-xl font-bold text-white">1hr 30mins</div>
            <div className="text-xs text-neutral-500 ">Total Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
