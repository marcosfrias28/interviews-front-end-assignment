import { useEffect } from 'react';
import { useState } from 'react'
import { } from 'react-router-dom'

function App() {

  useEffect(() => {
    fetch('http://localhost:8080/recipes')
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])

  return (
    <>
      <section class="relative min-h-dvh flex justify-center items-center">
        <div class="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#f6cb54_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#222_40%,#f6cb54_100%)]"></div>
        <div class="grid max-w-screen-xl px-4 py-8 mx-auto gap-10 lg:py-16 lg:grid-cols-12">
          <div class="lg:mt-0 lg:col-span-7 lg:flex">
            <img src="eating-healthy.svg" alt="mockup" />
          </div>

          <div class="mr-auto place-self-center lg:col-span-5">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">RecipeBook</h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Discover, create, and share delicious recipes from all over the world with RecipeBook. Your culinary journey starts here.</p>

            <a href="#" class="inline-flex self-center items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-500 dark:bg-gray-700 dark:focus:ring-gray-800">
              Explore Recipes
            </a>
          </div>
        </div>
      </section>

    </>
  );
}

export default App
