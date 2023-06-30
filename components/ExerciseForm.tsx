"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Input from "components/ui/Input";
import TextArea from "components/ui/TextArea";

const ExerciseForm = ({
  open,
  close,
}: {
  open: Boolean;
  close: () => void;
}) => {
  const [formDetails, setFormDetails] = useState({
    label: "",
    description: "",
    type: "",
    weighted: false,
    timed: false,
    tags: [],
  });

  const updateFormDetail = (key: string, value: any) => {
    setFormDetails({ ...formDetails, [key]: value });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: "auto",
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              opacity: { duration: 0.1 },
            },
          }}
        >
          <div className="grid grid-cols-4 gap-x-4 gap-y-2 rounded-2xl bg-[#121212] p-5">
            <div className="col-span-2">
              <Input
                label={"Exercise Name"}
                value={formDetails.label}
                onChange={(value: any) => updateFormDetail("label", value)}
              />
            </div>
            <div className="col-span-2 row-span-2">
              <TextArea
                label={"Description"}
                value={formDetails.description}
                onChange={(value: any) =>
                  updateFormDetail("description", value)
                }
              />
            </div>
            <div className="col-span-2">
              <Input
                label={"Exercise Name"}
                value={formDetails.label}
                onChange={(value: any) => updateFormDetail("label", value)}
              />
            </div>
            <div
              className="col-span-4 w-fit rounded-xl border border-neutral-600 px-3 py-2"
              onClick={close}
            >
              Close
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExerciseForm;
