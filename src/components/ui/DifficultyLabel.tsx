const Easy = () => <span className=' pointer-events-none text-white bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1.5 text-center dark:bg-green-600 '>Easy</span>
const Medium = () => <span className='pointer-events-none text-white bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-3 py-1.5 text-center '>Medium</span>
const Hard = () => <span className='pointer-events-none text-white bg-red-500 focus:ring-4 font-medium rounded-full text-sm px-3 py-1.5 text-center'>Hard</span>

const SelectButton = {
  1: <Easy />,
  2: <Medium />,
  3: <Hard />
}
function DifficultyLabel ({ difficulty } ) {
  return SelectButton[difficulty]
}

export default DifficultyLabel
