import { Link, useParams } from "react-router-dom";
import useRecipeStore from "../hooks/useRecipeStore";
import { useEffect, useState } from "react";
import { API_URL, Layout } from "../App";
import axios from "axios";
import { cuisineType, ingredientType, recipeType } from "../types/api-types";
import { toast } from "sonner";
import DifficultyLabel from "../components/ui/DifficultyLabel";
import { GetFlag } from "../components/ui/FlagIcons";

function DetailsPage() {
  const { id } = useParams();
  const { cuisines, recipes } = useRecipeStore();
  const [currentRecipe, setCurrentRecipe] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/recipes/${id}`)
      .then((response) => setCurrentRecipe(response.data))
      .catch((e) => toast.error("Something went wrong"));
  }, []);
  const { name, cuisineId, ingredients, instructions, difficultyId, image } =
    currentRecipe as unknown as recipeType;
  return (
    <Layout>
      <article className="col-span-1 md:col-span-3 xl:col-span-4 row-span-1 px-10 sm:px-4 lg:px-4">
        <h1 className="font-black text-7xl font-lato text-center mb-10">
          {name}
        </h1>
        <div className="relative w-full rounded-lg h-full max-h-[800px] overflow-hidden mb-4">
          <Link to={`/recipes/${id}`}>
            <img
              className="h-full w-full object-cover object-center transition-all"
              src={`http://localhost:8080${image}`}
              alt={name}
            />
          </Link>
          <div className="absolute z-10 bottom-0 left-1/2 flex gap-5 m-auto -translate-x-1/2 mb-2">
            <span className="flex items-center text-nowrap justify-center gap-2 text-sm font-medium border border-white text-white bg-gray-500/20 backdrop-blur-lg py-1 rounded-full px-3 italic mx-auto">
              <GetFlag nationality={cuisineId} />
              {
                cuisines.find(
                  (cuisine: cuisineType) => cuisine.id === cuisineId
                )?.name
              }
            </span>
            <span className="flex items-center justify-center gap-2 text-sm font-medium border border-white text-white bg-gray-500/20 backdrop-blur-lg py-1 rounded-full px-3 italic mx-auto">
              Difficulty: <DifficultyLabel difficulty={difficultyId} />
            </span>
          </div>
        </div>
        <div className="flex justify-between mb-7">
          <ul className="w-1/2">
            <li className="text-center font-semibold text-sm italic">
              Ingredients
            </li>
            {ingredients?.map((ingredient: ingredientType, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-sm">{ingredient}</span>
              </li>
            ))}
          </ul>
          <div className=" bg-black w-[3px] mx-5" />
          <div className="w-1/2">
            <h3 className="text-center font-semibold text-sm italic">
              instructions
            </h3>
            <p>{instructions}</p>
          </div>
        </div>
      </article>
    </Layout>
  );
}
export default DetailsPage;
