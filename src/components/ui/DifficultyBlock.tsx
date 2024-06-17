import DifficultyLabel from "./DifficultyLabel";
import { GetFlag } from "./FlagIcons";
import React from "react";

interface Props {
  className?: string;
  cuisineId: string;
  name: string | undefined;
  difficultyId: string;
}

function DifficultyBlock({ cuisineId, name, difficultyId, className }: Props) {
  return (
    <div className={className ? className : ""}>
      <span className="flex items-center text-nowrap justify-center bg-black/10 py-1.5 gap-2 text-sm font-medium border text-black h-full rounded-full px-3 italic mx-auto">
        {name} <GetFlag nationality={cuisineId} />
      </span>
      <span className="flex items-center text-nowrap justify-center bg-black/10 py-1 gap-2 text-sm font-medium border text-black h-full rounded-full px-3 italic mx-auto">
        Difficulty: <DifficultyLabel difficulty={difficultyId} />
      </span>
    </div>
  );
}

export default DifficultyBlock;
