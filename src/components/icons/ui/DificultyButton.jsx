const Easy = () => <span class=' pointer-events-none text-white bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 '>Easy</span>
const Medium = () => <span class='pointer-events-none text-white bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 '>Medium</span>
const Hard = () => <span class='pointer-events-none text-white bg-red-600 focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2'>Hard</span>

const SelectButton = {
  1: <Easy />,
  2: <Medium />,
  3: <Hard />
}
function DifficultyButton ({ difficulty }) {
  return SelectButton[difficulty]
}

export default DifficultyButton
