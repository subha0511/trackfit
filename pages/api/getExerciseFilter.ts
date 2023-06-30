import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { cursor, count } = req.body;

  const jsonDir = path.join(process.cwd(), "data");

  const exerciseJson = await fs.readFile(jsonDir + "/exercises.json", "utf-8");
  const exercise = JSON.parse(exerciseJson);
  const totalExercise = exercise.length;

  const currCursor = cursor === -1 ? 0 : cursor;

  const exerciseSlice = exercise.slice(
    currCursor * count,
    (currCursor + 1) * count
  );

  const nextCursor =
    (currCursor + 1) * count < totalExercise ? currCursor + 1 : -1;

  res.status(200).json({
    data: exerciseSlice,
    total: totalExercise,
    cursor: nextCursor,
  });
}
