import { SelectDropDown } from '~/components/ui';

export default function ModelSelect() {
  // Define subjects (static list)
  const subjectOptions = [
    { id: "pe", name: "OCR GCSE PE" },
    { id: "maths", name: "OCR A-Level Maths" },
    { id: "science", name: "AQA GCSE Science" },
    { id: "history", name: "Edexcel GCSE History" }
  ];

  // Default to showing "OCR A-Level Maths" (or any other default subject)
  const defaultSubject = "OCR A-Level Maths";

  return (
    <div className="relative z-50 w-full">
      <SelectDropDown
        value={defaultSubject} // Always show the default subject
        setValue={() => {}} // Do nothing when user selects a new one
        availableValues={subjectOptions.map(subject => subject.name)}
        showAbove={true}
        showLabel={false}
        className="cursor-pointer"
      />
    </div>
  );
}



