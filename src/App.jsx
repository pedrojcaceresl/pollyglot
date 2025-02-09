import { useState } from 'react';
import { Button } from './app/components/Button'

function App() {

  const [selected, setSelected] = useState("French");
  const [textToTranslate, setTextToTranslate] = useState("");

  const languages = [
		{ name: "French", flag: "https://flagcdn.com/w40/fr.png" },
		{ name: "Spanish", flag: "https://flagcdn.com/w40/es.png" },
		{ name: "Japanese", flag: "https://flagcdn.com/w40/jp.png", box: true },
  ];

  const translate = () => {
		console.log(`Translating "${textToTranslate}" to ${selected}...`);
		// Aquí podrías implementar la traducción con una API externa
  };

  return (
		<>
			<div className="w-fit m-5 shadow-md shadow-black/30 pb-4 ">
				<img
					src="src\assets\images\pollyGlot.png"
					alt="pollyGlot image"
				/>

				<div className="border-4 mt-6 flex flex-col py-4 my-4 mx-4 items-center border-black px-4 rounded-xl">
					<h1 className="p-2 my-2 rounded-lg text-xl font-bold text-sky-700">
						Text to translate 👇🏻
					</h1>
					<textarea
						className="p-2 rounded-lg placeholder:text-gray-700 bg-gray-100 text-xl font-bold w-full"
						name="textToTranslate"
						id="textToTranslate"
						rows={4}
						onChange={(e) => setTextToTranslate(e.target.value)}
						value={textToTranslate}
						placeholder="How are you?"
					></textarea>
					<h1 className="p-2 my-2 rounded-lg text-xl font-bold text-sky-700">
						Select a language 👇🏻
					</h1>

					<div className="space-y-2 w-full px-6">
						{languages.map((lang) => (
							<label
								key={lang.name}
								className="flex text-xl items-center space-x-2 font-bold text-gray-900 cursor-pointer"
							>
								<input
									type="radio"
									name="language"
									value={lang.name}
									checked={selected === lang.name}
									onChange={() => setSelected(lang.name)}
									className="accent-blue-500"
								/>
								<span>{lang.name}</span>
								<img
									src={lang.flag}
									alt={`${lang.name} Flag`}
									className={`w-5 h-4 ${
										lang.box
											? "border border-gray-400 rounded-sm"
											: ""
									}`}
								/>
							</label>
						))}
					</div>
					<Button label="Translate" action={translate} />
				</div>
			</div>
		</>
  );
}

export default App
