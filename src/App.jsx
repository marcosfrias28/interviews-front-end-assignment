import { Link, NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import SearchIcon from './components/icons/search'
import { Toaster, toast } from 'sonner'
import DifficultyButton from './components/ui/DificultyButton.jsx'
import Logo from './components/icons/Logo.jsx'

const ENDPOINT = 'http://localhost:8080'

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

function isActive ({ isActive }) {
  return isActive ? 'bg-yellow-200 pointer-events-none px-2 py-1 rounded-full' : 'rounded-full hover:bg-yellow-50 transition-colors px-2 py-1'
}

export function Details () {
  const { id } = useParams()
  const [currentRecipe, setCurrentRecipe] = useState([])

  useEffect(() => {
    axios.get(`${ENDPOINT}/recipes/${id}`).then((response) => setCurrentRecipe(response.data)).catch((e) => toast.error('Something went wrong'))
  }, [])

  console.log(currentRecipe)

  return (
    <Layout>
      <h1>{currentRecipe.name}</h1>
    </Layout>
  )
}

export function HomePage () {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(`${ENDPOINT}/recipes`).then((response) => setRecipes(response.data)).catch((e) => toast.error('Something went wrong')).finally(() => setLoading(false))
  }, [])

  const shuffledRecipes = shuffle(recipes)

  return (
    <Layout>
      <h1 className='text-4xl font-bold text-center mt-10'>Explore our best Recipes!</h1>
      <section className='grid grid-cols-12 gap-10 py-20 max-w-screen-2xl mx-auto px-10 sm:px-4 lg:px-4 transition-all place-content-center'>
        {
          loading && <div className='w-36 h-36 col-span-full border-black border-t-4 border-b-4 rounded-full animate-spin mx-auto' />
        }
        {
      !loading && shuffledRecipes.length > 0 && shuffledRecipes.map((recipe, i) => {
        if (i > 11) return []
        const { id, name, ingredients, instructions, cuisineId, dietId, difficultyId, image } = recipe
        return (
          <article key={id} className='col-span-12 hover:shadow-sm md:col-span-6 xl:col-span-4'>
            <h2 className='font-semibold text-2xl font-sans mb-2 text-center'>{name}</h2>
            <div className='w-full rounded-lg h-full max-h-96 overflow-hidden'>
              <Link to={`/recipes/${id}`}>
                <img className='h-full w-full object-cover object-center hover:scale-105 transition-all' src={`http://localhost:8080${image}`} alt={name} />
              </Link>
            </div>
            <div className='flex justify-between'>
              <ul className='w-1/2'>
                <li className='text-center font-medium text-sm italic'>Ingredients</li>
                {ingredients.map((ingredient, i) => <li className=' list-inside list-item list-disc' key={i}>{ingredient}</li>)}
              </ul>
              <div className='w-1/2'>
                <h3 className='font-medium text-sm italic text-center'> instructions</h3>
                <p>{instructions}</p>
              </div>
            </div>
            <p>{cuisineId}</p>
            <p>{dietId}</p>
            <DifficultyButton difficulty={difficultyId} />
          </article>
        )
      })
    }
      </section>
    </Layout>
  )
}

export function SearchPage () {
  return (
    <Layout>
      <h1>Search Page</h1>
    </Layout>
  )
}

export function Welcome () {
  return (
    <section className='relative min-h-dvh flex justify-center items-center'>
      <div className='absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#f6cb54_100%)]' />
      <div className='grid max-w-screen-xl px-4 py-8 mx-auto gap-10 lg:py-16 lg:grid-cols-12'>
        <div className='lg:mt-0 lg:col-span-7 lg:flex'>
          <img src='eating-healthy.svg' alt='mockup' />
        </div>

        <div className='mr-auto place-self-center lg:col-span-5'>
          <h1 className='max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl'>
            RecipeBook
          </h1>
          <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
            Discover, create, and share delicious recipes from all over the
            world with RecipeBook. Your culinary journey starts here.
          </p>

          <Link
            to='/home'
            className='inline-flex px-8 py-2 rounded-full hover:scale-105 transition-all bg-red-500 text-white active:bg-red-800 items-center justify-center text-bas font-medium text-center'
          >
            Explore Recipes
          </Link>
        </div>
      </div>
    </section>
  )
}

export function Layout ({ children }, props) {
  return (
    <>
      <header>
        <nav>
          <div className='max-w-screen-xl flex flex-nowrap items-center justify-between mx-auto p-4 gap-4'>
            <Link
              to='/home'
              className='flex items-center space-x-3 rtl:space-x-reverse'
            >
              <Logo />
              <span className='self-center text-2xl font-semibold whitespace-nowrap'>
                RecipeBook
              </span>
            </Link>
            <div className='flex md:order-1'>
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
              <div className='relative hidden md:block'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                  <SearchIcon />
                  <span className='sr-only'>Search icon</span>
                </div>
                {/* DESKTOP SEARCH BAR */}
                <input
                  type='text'
                  id='search-navbar'
                  className='transition-all block sm:min-w-40 md:min-w-52 lg:min-w-60 xl:min-w-96 w-full p-2 ps-10 text-sm text-gray-900 border-yellow-500 rounded-full bg-gray-100 focus:ring-yellow-500 focus:border-yellow-500'
                  placeholder='Search...'
                />
              </div>
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
              <div className='relative mt-3 md:hidden'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 20'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                    />
                  </svg>
                </div>
                {/* MOBILE SEARCH BAR */}
                <input
                  type='text'
                  id='search-navbar'
                  className='transition-all block w-full p-2 ps-10 text-sm text-gray-900 border-yellow-500 rounded-full bg-gray-100 focus:ring-yellow-500 focus:border-yellow-500'
                  placeholder='Search...'
                />
              </div>
              <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 '>
                <li>
                  <NavLink
                    to='/home'
                    className={isActive}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    data-popover-target='popover-default'
                    to='/search'
                    className={isActive}
                  >
                    Search
                  </NavLink>
                  <div data-popover id='popover-default' role='tooltip' class='absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0'>
                    <div class='px-3 py-2'>
                      <p>Advanced research</p>
                    </div>
                    <div data-popper-arrow />
                  </div>
                </li>
                <li className=' hover:scale-105 transition-all'>
                  <NavLink
                    to='/add-recipe'
                    className='px-5 lg:px-8 py-2 rounded-full bg-red-500 text-white active:bg-red-800'
                  >
                    Add Recipe
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className='min-h-dvh [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#f6cb54_100%)]'>
        {children}
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
