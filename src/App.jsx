import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import SearchIcon from './components/icons/search'

function isActive ({ isActive }) {
  return isActive ? 'bg-yellow-200 pointer-events-none px-2 py-1 rounded-full' : 'rounded-full hover:bg-yellow-50 transition-colors px-2 py-1'
}

export function HomePage () {
  const [recipes, setRecipes] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    axios.get('http://localhost:8080/ingredients').then((response) => setIngredients(response.data)).finally(() => setLoading(false))
    axios.get('http://localhost:8080/recipes').then((response) => setRecipes(response.data)).finally(() => setLoading(false))
  }, [])

  return (
    <Layout>
      <h1>Home Page</h1>
      <section className='grid grid-cols-12 gap-x-10 max-w-screen-2xl mx-auto'>
        {
          loading && <div className=' w-36 h-36 border-black border-t-4 border-b-4 rounded-full animate-spin' />
        }
        {
      !loading && recipes.length > 0 && recipes.map((recipe, i) => {
        if (i > 11) return []
        const { id, name, ingredients, instructions, cuisineId, dietId, difficultyId, image } = recipe
        return (
          <article key={id} className=' col-span-12 sm:col-span-6 md:col-span-4'>
            <div className='w-full h-1/2 overflow-hidden'>
              <img className='h-full w-full object-cover object-center hover:scale-105 transition-all' src={`http://localhost:8080${image}`} alt={name} />
            </div>
            <h2>{name}</h2>
            <p>{ingredients}</p>
            <p>{instructions}</p>
            <p>{cuisineId}</p>
            <p>{dietId}</p>
            <p>{difficultyId}</p>
          </article>
        )
      })
    }
      </section>

      <button className='px-8 py-2 rounded-full bg-red-500 text-white transition-colors active:bg-red-800'>
        Load More
      </button>
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
            className='inline-flex self-center items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-500 dark:bg-gray-700 dark:focus:ring-gray-800'
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
        <nav className='bg-white border-gray-200 dark:bg-gray-200'>
          <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
            <Link
              to='/home'
              className='flex items-center space-x-3 rtl:space-x-reverse'
            >
              <img
                src='recipe-svgrepo-com.svg'
                className='h-8'
                alt='Flowbite Logo'
              />
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
                className='md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1'
              >
                <SearchIcon />
                <span className='sr-only'>Search</span>
              </button>
              <div className='relative hidden md:block'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                  <SearchIcon />
                  <span className='sr-only'>Search icon</span>
                </div>
                <input
                  type='text'
                  id='search-navbar'
                  className='transition-all block md:min-w-72 lg:min-w-96 w-full p-2 ps-10 text-sm text-gray-900 border-yellow-500 rounded-full bg-gray-100 focus:ring-yellow-500 focus:border-yellow-500'
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
                <input
                  type='text'
                  id='search-navbar'
                  className='transition-all block md:min-w-72 lg:min-w-96 w-full p-2 ps-10 text-sm text-gray-900 border-yellow-500 rounded-full bg-gray-100 focus:ring-yellow-500 focus:border-yellow-500'
                  placeholder='Search...'
                />
              </div>
              <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 '>
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
                    to='/search'
                    className={isActive}
                  >
                    Search
                  </NavLink>
                </li>
                <li className=' hover:scale-105 transition-all'>
                  <NavLink
                    to='/add-recipe'
                    className='px-8 py-2 rounded-full bg-red-500 text-white transition-colors active:bg-red-800'
                  >
                    Add Recipe
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className='min-h-dvh'>{children}</main>

      <footer className='bg-white rounded-lg shadow dark:bg-gray-200 relative bottom-0 w-full'>
        <div className='w-full mx-auto md:flex p-4 md:items-center md:justify-between'>
          <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
            © 2023{' '}
            <a href='https://flowbite.com/' className='hover:underline'>
              Flowbite™
            </a>
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
    </>
  )
}
