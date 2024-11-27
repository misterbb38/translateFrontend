// // src/components/GlossaryList.jsx
// export default function GlossaryList({
//   glossaries,
//   selectedGlossaries,
//   setSelectedGlossaries,
// }) {
//   const handleCheckboxChange = (glossaryId) => {
//     if (selectedGlossaries.includes(glossaryId)) {
//       setSelectedGlossaries(
//         selectedGlossaries.filter((id) => id !== glossaryId)
//       );
//     } else {
//       setSelectedGlossaries([...selectedGlossaries, glossaryId]);
//     }
//   };

//   return (
//     <div className="w-64 bg-base-200 p-4">
//       <h2 className="text-lg font-bold mb-2">Glossaires</h2>
//       <ul>
//         {glossaries.map((glossary) => (
//           <li key={glossary._id} className="flex items-center mb-2">
//             <input
//               type="checkbox"
//               className="checkbox checkbox-primary"
//               checked={selectedGlossaries.includes(glossary._id)}
//               onChange={() => handleCheckboxChange(glossary._id)}
//             />
//             <span className="ml-2">{glossary.name}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// // src/components/GlossaryList.jsx

export default function GlossaryList({
  glossaries,
  selectedGlossaries,
  setSelectedGlossaries,
}) {
  const handleCheckboxChange = (glossaryId) => {
    if (selectedGlossaries.includes(glossaryId)) {
      setSelectedGlossaries(
        selectedGlossaries.filter((id) => id !== glossaryId)
      );
    } else {
      setSelectedGlossaries([...selectedGlossaries, glossaryId]);
    }
  };

  return (
    <div className="p-4 bg-base-200 md:w-64 md:sticky md:top-0">
      <h2 className="text-lg font-bold mb-4">Glossaires</h2>
      <div className="flex flex-wrap gap-2">
        {glossaries.map((glossary) => (
          <label
            key={glossary._id}
            className={`btn btn-sm ${
              selectedGlossaries.includes(glossary._id)
                ? "btn-primary"
                : "btn-outline"
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={selectedGlossaries.includes(glossary._id)}
              onChange={() => handleCheckboxChange(glossary._id)}
            />
            {glossary.name}
          </label>
        ))}
      </div>
    </div>
  );
}
