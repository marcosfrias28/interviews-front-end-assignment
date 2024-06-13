import { useEffect } from "react"
import { useRecipeStore } from "../store/recipeStore"
import { Layout } from "../App"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { Flag } from "../components/ui/FlagIcons"
import DifficultyButton from "../components/ui/DifficultyButton"

const shuffle = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5)

export function HomePage () {
    /*
  
    Getting all necessary states and functions from the store using zustand
    IMPORTANT NOT GETTING ALL THE STATE AT ONCE, JUST THE ONES NEEDED TO AVOID RE-RENDERING
     --------------------------------------------------------------------------
    */
    const loading = useRecipeStore(state => state.loading)
    const recipes = useRecipeStore(state => state.recipes)
    const cuisines = useRecipeStore(state => state.cuisines)
    const getRecipes = useRecipeStore(state => state.getRecipes)
    const getCuisines = useRecipeStore(state => state.getCuisines)
  
    // --------------------------------------------------------------------------
    // Fetching all recipes and cuisines on component mount
  
  
    useEffect(() => {
      getCuisines()
      getRecipes(12, 1)
    }, [])
  
    const shuffledRecipes = shuffle(recipes)
  
    return (
      <Layout>
        <h1 className='text-7xl mb-10 font-bold text-center'>Explore our <span className='italic'>best </span>  Recipes!</h1>
        <section className='grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 grid-flow-row gap-x-5 gap-y-20 py-20 max-w-screen-2xl mx-auto transition-all place-content-center'>
          {
            loading && shuffledRecipes.length === 0 && <div className='w-36 h-36 col-span-full border-black border-t-4 border-b-4 rounded-full animate-spin mx-auto' />
          }
          {
            shuffledRecipes.length === 0 && <p className='col-span-full text-center'>No recipes found, Please contact the admin... It cannot be possible</p>
          }
          {
          !loading && shuffledRecipes.length > 0 && shuffledRecipes.map((recipe, i) => {
            if (!recipe.name) return toast.error('Something went wrong')
            const { id, name, cuisineId, ingredients, instructions, difficultyId, image } = recipe
            const cuisine = cuisines?.find(cuisine => cuisine.id === cuisineId)
            return (
              <article key={id} className='col-span-1 md:col-span-3 xl:col-span-4 row-span-1 px-10 sm:px-4 lg:px-4'>
                <div className='relative w-full rounded-lg h-full max-h-96 overflow-hidden mb-4'>
                  <Link to={`/recipes/${id}`}>
                    <img className='h-full w-full object-cover object-center hover:scale-105 transition-all' src={`http://localhost:8080${image}`} alt={name} />
                  </Link>
                  <div className='absolute z-10 bottom-0 left-1/2 flex gap-5 m-auto -translate-x-1/2 mb-2'>
                    <span className='flex items-center text-nowrap justify-center gap-2 text-sm font-medium border border-white text-white bg-gray-500/20 backdrop-blur-lg py-1 rounded-full px-3 italic mx-auto'>
                      <Flag nationality={cuisineId} /> {cuisine?.name}
                    </span>
                    <span className='flex items-center justify-center gap-2 text-sm font-medium border border-white text-white bg-gray-500/20 backdrop-blur-lg py-1 rounded-full px-3 italic mx-auto'>
                      Difficulty: <DifficultyButton difficulty={difficultyId} />
                    </span>
                  </div>
                </div>
                <h2 className='font-semibold text-2xl font-sans mb-4 text-center'>{name}</h2>
                <div className='flex justify-between mb-7'>
                  <ul className='w-1/2'>
                    <li className='text-center font-semibold text-sm italic'>Ingredients</li>
                    {ingredients.map((ingredient: string, i: number) => <li className=' list-inside list-item list-disc' key={i}>{ingredient}</li>)}
                  </ul>
                  <div className=' bg-black w-[3px] mx-5' />
                  <div className='w-1/2'>
                    <h3 className='text-center font-semibold text-sm italic'> instructions</h3>
                    <p>{instructions}</p>
                  </div>
                </div>
              </article>
            )
          })
      }
        </section>
      </Layout>
    )
  }