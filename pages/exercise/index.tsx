import { useState, useMemo, useReducer, useId, Key } from "react";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { getExercise } from "shared/query/exerciseQuery";
import ExerciseForm from "components/ExerciseForm";

const initialFilterData = {
  label: "",
  difficulty: "",
  type: "",
  tags: "",
  sortBy: "",
  count: 50,
  cursor: 0,
};

export default function Exercise() {
  const [openForm, setOpenForm] = useState<boolean>(false);

  const [filter, setFilter] = useState(initialFilterData);

  const { data, isLoading } = useQuery({
    queryKey: ["exercise", filter],
    queryFn: () => getExercise(filter),
  });

  const openExerciseForm = () => setOpenForm(true);
  const closeExerciseForm = () => setOpenForm(false);

  return (
    <>
      <Head>
        <title>Exercise</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <svg>
        <filter id="floaty">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.04"
            numOctaves="1"
            result="warp"
          />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="20" />
        </filter>
      </svg>

      <div className="relative mx-5 grid grow grid-cols-3 gap-3">
        <div className="col-span-2 flex flex-col gap-4 p-5 pt-8">
          <div className="col-span-5 flex w-full justify-between text-4xl text-neutral-300">
            <div>Exercises</div>
            <div className="aspect-square h-full rounded-2xl border border-neutral-800 duration-200 hover:border-sky-300/50"></div>
          </div>

          <div className="flex items-center justify-between text-neutral-400">
            <div className="">{data?.data?.length ?? 0} exercises</div>

            <div
              className=" w-fit cursor-pointer rounded-xl border border-neutral-800 px-4 py-2 text-neutral-400"
              onClick={openForm ? closeExerciseForm : openExerciseForm}
            >
              {!openForm ? "Add Exercise" : "Close Form"}
            </div>
          </div>

          <ExerciseForm open={openForm} close={closeExerciseForm} />
          <div className="grid gap-3 rounded-2xl ">
            {data?.data?.map((item: any) => (
              <ExerciseCard data={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const ExerciseCard = ({ data }: any) => {
  return (
    <div className="flex flex-col rounded-2xl bg-[#121212] px-5 py-4 text-neutral-400">
      <div className="flex items-baseline justify-between">
        <div className="grow truncate text-2xl">{data.title}</div>
        <div className="shrink-0 text-sm text-neutral-500">
          {data?.bodyPart}
        </div>
      </div>
      <div className="flex items-baseline justify-between text-neutral-500">
        <div className="text-sm">{data.level}</div>
        <div className="text-sm">{data.type}</div>
      </div>
    </div>
  );
};