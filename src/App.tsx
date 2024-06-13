import { Link, NavLink, useParams} from 'react-router-dom'
import SearchIcon from './components/Search'
import { Toaster, toast } from 'sonner'
import DifficultyButton from './components/ui/DifficultyButton'
import Logo from './components/icons/Logo'
import { Flag } from './components/ui/FlagIcons'
import { useRecipeStore } from './store/recipeStore'
import Search from './components/Search'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { recipeType } from './types/api-types'

export const API_URL = import.meta.env.VITE_ENDPOINT_BACKEND;

const shuffle = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5)

export function Details () {
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
              <div className='relative w-full rounded-lg h-full max-h-96 overflow-hidden mb-4'>
                <Link to={`/recipes/${id}`}>
                  <img className='h-full w-full object-cover object-center hover:scale-105 transition-all' src={`http://localhost:8080${image}`} alt={name} />
                </Link>
                <div className='absolute z-10 bottom-0 left-1/2 flex gap-5 m-auto -translate-x-1/2 mb-2'>
                  <span className='flex items-center text-nowrap justify-center gap-2 text-sm font-medium border border-white text-white bg-gray-500/20 backdrop-blur-lg py-1 rounded-full px-3 italic mx-auto'>
                    <Flag nationality={cuisineId} /> {cuisines.find(cuisine => cuisine.id === cuisineId)?.name}
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
                  {ingredients.length > 0 && ingredients.map((ingredient: string, i: number) => <li className='list-inside list-item list-disc' key={i}>{ingredient}</li>)}
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

export function Layout (props: { children: React.ReactNode }) {

  return (
    <>
      <header className='bg-gradient-to-b from-0% from-[#fc7c4ab8] to-100% to-[#f7f7f7] h-72'>
        <nav className='max-w-screen-xl flex flex-wrap md:flex-nowrap items-center pt-7 justify-between mx-auto p-4 gap-10'>
          <Link
            to='/home'
            className='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <Logo />
            <span className='self-center text-4xl font-black whitespace-nowrap'>
              RecipeBook
            </span>
          </Link>
          <div className='flex md:order-1 md:w-full'>
            <button
              type='button'
              data-collapse-toggle='navbar-search'
              aria-controls='navbar-search'
              aria-expanded='false'
              className='md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 me-1'
            >
              <SearchIcon />
              <span className='sr-only'>Search</span>
            </button>

            {/* SEARCH FORM COMPONENT FOR DESKTOP */}
            <Search className='relative hidden md:block w-full' />

            <button
              data-collapse-toggle='navbar-search'
              type='button'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='navbar-search'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </button>
          </div>
          <div
            className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
            id='navbar-search'
          >
            {/* SEARCH FORM COMPONENT FOR MOBILE */}
            <Search className='relative md:hidden w-full' />

            <ul className='flex p-4 flex-col items-center md:bg-transparent bg-[#f7f7f7] md:items-start gap-5 md:gap-0 md:p-0 mt-4 font-medium border rounded-lg md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 '>
              <div className='flex gap-6 md:gap-2.5 md:mr-3'>
                <li>
                  <NavLink
                    to='/home'
                    className={({ isActive }) => (isActive ? 'text-red-500' : '')}
                  >
                    <div className='flex flex-col justify-center items-center'>
                      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='icon icon-tabler icons-tabler-outline icon-tabler-home'><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M5 12l-2 0l9 -9l9 9l-2 0' /><path d='M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7' /><path d='M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6' /></svg>
                      <span className='block md:hidden'>
                        Home
                      </span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? 'text-red-500' : '')}
                    data-popover-target='popover-default'
                    to='/search'
                  >
                    <div className='flex flex-col justify-center items-center'>
                      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='icon icon-tabler icons-tabler-outline icon-tabler-search'><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' /><path d='M21 21l-6 -6' /></svg>
                      <span className='block md:hidden'>
                        Search
                      </span>
                    </div>

                  </NavLink>
                  <div data-popover id='popover-default' role='tooltip' className='absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0'>
                    <div className='px-3 py-2'>
                      <p>Advanced research</p>
                    </div>
                    <div data-popper-arrow />
                  </div>
                </li>
              </div>

              <li className='hover:scale-105 transition-all'>
                <NavLink
                  to='/add-recipe'
                  className='px-5 lg:px-8 py-2 rounded-full bg-red-500 text-white active:bg-red-800 text-nowrap'
                >
                  Add Recipe
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className='min-h-dvh bg-[#f7f7f7]'>
        {props.children}
      </main>

      <footer className='bg-white rounded-lg shadow dark:bg-gray-200 relative bottom-0 w-full'>
        <div className='w-full max-w-screen-xl mx-auto md:flex p-4 md:items-center md:justify-between'>
          <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
            © 2023{' '}
            <Link to='/' className='hover:underline'>
              Welcome
            </Link>
            . All Rights Reserved.
          </span>
          <ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
            <li>
              <a href='#' className='hover:underline me-4 md:me-6'>
                About
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline me-4 md:me-6'>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline me-4 md:me-6'>
                Licensing
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <Toaster richColors position='bottom-center' />
    </>
  )
}
