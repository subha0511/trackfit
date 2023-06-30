import { createPostQuery } from "./query.config";

const server = "http://localhost:3000";

export const getExercise = async (body: {
  label: string;
  difficulty: string;
  type: string;
  tags: string;
  sortBy: string;
  count: number;
  cursor: number;
}) => {
  const res = await createPostQuery(`${server}/api/getExercise`, body);
  const data = await res.json();
  console.log(data);
  return data;
};
