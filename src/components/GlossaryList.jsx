

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
