import axios from 'axios'
import { API_URL } from '../App'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRecipeStore } from '../store/recipeStore'
import SearchIcon from './icons/search'

function Search (props) {
  const [dietary, setDietary] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/diets`).then((response) => setDietary(response.data)).catch((e) => toast.error('Something went wrong'))
  }, [])

  const setFilter = useRecipeStore(state => state.setFilter)
  const filter = useRecipeStore(state => state.filter)
  const cuisines = useRecipeStore(state => state.cuisines)

  const difficulties = ['Easy', 'Medium', 'Hard']

  function handleSubmit (e) {
    e.preventDefault()
    console.log(e.target)
  }

  return (
    <form onSubmit={handleSubmit} {...props}>
      <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
        <SearchIcon />
        <span className='sr-only'>Search icon</span>
      </div>
      {/* DESKTOP SEARCH BAR */}
      <input
        list={filter}
        autoComplete='off'
        id='search-navbar'
        className='block p-2 ps-10 pe-32 text-sm w-full text-gray-900 border-yellow-500 rounded-full bg-gray-100 focus:ring-yellow-500 focus:border-yellow-500 outline-none'
        placeholder='Search...'
      />

      <datalist value='' id='cuisineId'>
        {cuisines.map((cuisine, i) => <option key={i} value={cuisine.name} />)}
      </datalist>
      <datalist id='difficultyId'>
        {difficulties.map((difficulty, i) => <option key={i} value={difficulty} />)}
      </datalist>
      <datalist id='dietId'>
        {dietary.map((diet, i) => <option key={i} value={diet.name} />)}
      </datalist>

      {/* DESKTOP FILTER SELECT */}
      <div className='absolute inset-y-0 end-0 bg-transparent '>
        <select onChange={(e) => setFilter(e.target.value)} className='text-sm w-32 h-full bg-transparent border border-black/20 rounded-tr-full rounded-br-full outline-0 focus:ring-0 focus:ring-yellow-500 focus:border-yellow-500' value={filter} aria-placeholder='Search by...' name='' id=''>
          <option value='q'>Name</option>
          <option value='cuisineId'>Cuisine</option>
          <option value='difficultyId'>Difficulty</option>
          <option value='dietId'>Dietary</option>
        </select>
      </div>
    </form>
  )
}

export default Search
