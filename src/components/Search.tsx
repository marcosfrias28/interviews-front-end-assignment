import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRecipeStore } from '../store/recipeStore'
import SearchIcon from './icons/search'
import React from 'react'
import { dietType, filterSearchType } from '../types/api-types'

interface Props {
  mobile?: boolean
  style?: React.CSSProperties
  children?: React.ReactNode
}


function Search({mobile} : Props) {

  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('q');

  /*
  Getting all necessary states and functions from the store using zustand
  IMPORTANT NOT GETTING THE WHOLE STATE AT ONCE, JUST THE ONES NEEDED TO AVOID RE-RENDERING
   -------------------------------------------------------------------------------------------------------------------------
  */
  const {diets, getDiets } = useRecipeStore(state => ({diets: state.diets, getDiets: state.getDiets}))
  const {difficulties, getDifficulties} = useRecipeStore(state => ({difficulties: state.difficulties, getDifficulties: state.getDifficulties}))
  const searchResults = useRecipeStore(state => state.searchResults)
  const cuisines = useRecipeStore(state => state.cuisines)
  const getRecipeBySearch = useRecipeStore(state => state.getRecipeBySearch)
  const setSearchResults = useRecipeStore(state => state.setSearchResults)
   // ----------------------------------------------------------------------------------------------------------------------


  useEffect(() => {
    getDiets()
    getDifficulties()
  }, [])

  useEffect(() => {
    setInput('')
  }, [filter, searchResults]);

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    // e.preventDefault()
    switch (filter) {
      case 'q':
        getRecipeBySearch(filter, input)
        break

      case 'cuisineId':
        const cuisine = cuisines.find(cuisine => cuisine.name === input)
        if (cuisine) {
          getRecipeBySearch(filter, cuisine.id)
        } else {
          toast.error('Cuisine not found')
          setSearchResults([])
        }
        break

      case 'difficultyId':
        const difficulty = difficulties.find(difficulty => difficulty.name === input)
        if (difficulty) {
          getRecipeBySearch(filter, difficulty.id)
        } else {
          toast.error('Difficulty not found')
          setSearchResults([])
        }
        break

      case 'dietId':
        const diet = diets.find(diet => diet.name === input)
        if (diet) {
          getRecipeBySearch(filter, diet.id)
        } else {
          toast.error('Diet not found')
          setSearchResults([])
        }
        break
    }
    setInput('')
  }

  return (
    <form onSubmit={handleSubmit} action='/search' className={!mobile ? 'relative hidden md:block w-full' : 'relative md:hidden w-full'} >
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
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <datalist id='cuisineId'>
        {cuisines.map((cuisine) => <option key={cuisine.id} value={cuisine.name} />)}
      </datalist>
      <datalist id='difficultyId'>
        {difficulties.map((difficulty) => <option key={difficulty.id} value={difficulty.name} />)}
      </datalist>
      <datalist id='dietId'>
        {diets.map((diet : dietType) => <option key={diet.id} value={diet.name} />)}
      </datalist>

      {/* DESKTOP FILTER SELECT */}
      <div className='absolute inset-y-0 end-0 bg-transparent '>
        <select onChange={e => {
          const value = e.target.value as filterSearchType
          setFilter(value)
        }} className='text-sm w-32 h-full bg-transparent border border-black/20 rounded-tr-full rounded-br-full outline-0 focus:ring-0 focus:ring-yellow-500 focus:border-yellow-500' value={filter} aria-placeholder='Search by...' name='' id=''>
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
