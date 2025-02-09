import { useState } from 'react';
import { Button } from './app/components/Button'
import OpenAI from 'openai/index.mjs';

const client = new OpenAI({
	apiKey: "",
	dangerouslyAllowBrowser: true,
});

const messages =(text, language) => [
	{
		role: "system",
		content:
			"You are a translator, you will receive a text in any language and you should translate it to the indicated language by the user, which will be French, Spanish or Japanese",
	},
	{
		role: "user",
		content:
			`${text} to the languge ${language}`,
	},
];

function App() {

  const [selected, setSelected] = useState("French");
  const [textToTranslate, setTextToTranslate] = useState("");

  const [translatedText, setTranslatedText] = useState("")


  const languages = [
		{ name: "French", flag: "https://flagcdn.com/w40/fr.png" },
		{ name: "Spanish", flag: "https://flagcdn.com/w40/es.png" },
		{ name: "Japanese", flag: "https://flagcdn.com/w40/jp.png", box: true },
  ];

  const translate = async () => {
		console.log(`Translating "${textToTranslate}" to ${selected}...`);

    const result = await client.chat.completions.create({
				model: "gpt-4",
				messages: messages(textToTranslate, selected),
			});

      setTranslatedText(result.choices[0].message.content);

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
						{translatedText
							? "Original text 👇🏻"
							: "Text to translate 👇🏻"}
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

					{!translatedText && (
						<>
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
											onChange={() =>
												setSelected(lang.name)
											}
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
						</>
					)}

					{translatedText && (
						<>
							<h1 className="p-2 my-2 rounded-lg text-xl font-bold text-sky-700">
								Your translation 👇🏻
							</h1>
							<textarea
								className="p-2 rounded-lg placeholder:text-gray-700 bg-gray-100 text-xl font-bold w-full"
								name="translatedText"
								id="translatedText"
								rows={4}
								value={translatedText}
							></textarea>
							<Button label="Start Over" action={() => setTranslatedText("")} />
						</>
					)}
				</div>
			</div>
		</>
  );
}

export default App
