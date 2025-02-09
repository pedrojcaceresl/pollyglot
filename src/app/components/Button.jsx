
export const Button = ({label, action}) => {
  return (
    <button className="bg-sky-800 w-full flex justify-center py-2 my-4 rounded-md text-white font-bold text-2xl" onClick={() => typeof(action) === 'function' ? action() : console.log('Error, a function is needed!')}>{ label }</button>
  )
}