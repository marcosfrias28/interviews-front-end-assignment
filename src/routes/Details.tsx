import { Link, useParams } from "react-router-dom";
import { useRecipeStore } from "../store/recipeStore";
import { useEffect, useState } from "react";
import { API_URL, Layout } from "../App";
import axios from "axios";
import { recipeType } from "../types/api-types";
import { toast } from "sonner";
import DifficultyLabel from "../components/ui/DifficultyLabel";
import { Flag } from "../components/ui/FlagIcons";

function DetailsPage () {
    const { id } = useParams();
    const recipes = useRecipeStore(state => state.recipes)
    const cuisines = useRecipeStore(state => state.cuisines)
    const [currentRecipe, setCurrentRecipe] = useState([])
    useEffect(() => {
        axios.get(`${API_URL}/recipes/${id}`).then((response) => setCurrentRecipe(response.data)).catch((e) => toast.error('Something went wrong'))
    }, [])
    const { name, cuisineId, ingredients, instructions, difficultyId, image } = currentRecipe as unknown as recipeType
    return (
    <Layout>
      <article className='col-span-1 md:col-span-3 xl:col-span-4 row-span-1 px-10 sm:px-4 lg:px-4'>
                <h1 className='font-semibold text-8xl font-sans mb-4 text-center'>{name}</h1>
                <div className='relative w-full rounded-lg h-full max-h-[800px] overflow-hidden mb-4'>
                  <Link to={`/recipes/${id}`}>
                    <img className='h-full w-full object-cover object-center transition-all' src={`http://localhost:8080${image}`} alt={name} />
                  </Link>
                  <div className='absolute z-10 bottom-0 left-1/2 flex gap-5 m-auto -translate-x-1/2 mb-2'>
                    <span className='flex items-center text-nowrap justify-center gap-2 text-sm font-medium border border-white text-white bg-gray-500/20 backdrop-blur-lg py-1 rounded-full px-3 italic mx-auto'>
                      <Flag nationality={cuisineId} /> {cuisines.find(cuisine => cuisine.id === cuisineId)?.name}
                    </span>
                    <span className='flex items-center justify-center gap-2 text-sm font-medium border border-white text-white bg-gray-500/20 backdrop-blur-lg py-1 rounded-full px-3 italic mx-auto'>
                      Difficulty: <DifficultyLabel difficulty={difficultyId} />
                    </span>
                  </div>
                </div>
                <div className='flex justify-between mb-7'>
                  <ul className='w-1/2'>
                    <li className='text-center font-semibold text-sm italic'>Ingredients</li>
                  </ul>
                  <div className=' bg-black w-[3px] mx-5' />
                  <div className='w-1/2'>
                    <h3 className='text-center font-semibold text-sm italic'> instructions</h3>
                    <p>{instructions}</p>
                  </div>
                </div>
              </article>
    </Layout>
    )
  }
  export default DetailsPage;