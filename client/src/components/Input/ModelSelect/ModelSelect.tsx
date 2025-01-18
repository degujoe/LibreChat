import type { TConversation } from 'librechat-data-provider';
import type { TSetOption } from '~/common';
import { SelectDropDown } from '~/components/ui';

type TSelectProps = {
  conversation: TConversation | null;
  setOption: TSetOption;
  showAbove?: boolean;
  popover?: boolean;
};

export default function ModelSelect({
  conversation,
  setOption,
  popover = false,
  showAbove = true,
}: TSelectProps) {
  // Define subject options instead of AI models
  const subjectOptions = [
    { id: "pe", name: "OCR GCSE PE" },
    { id: "maths", name: "OCR A-Level Maths" },
    { id: "science", name: "AQA GCSE Science" },
    { id: "history", name: "Edexcel GCSE History" }
  ];

  // Get the currently selected subject, defaulting to "maths"
  const selectedSubject = conversation?.subject || "maths";

  return (
    <div className="relative z-50 w-full">
      <SelectDropDown
        value={selectedSubject}
        setValue={(value) => setOption("subject", value)} // ✅ Fix state update
        availableValues={subjectOptions.map(subject => subject.name)}
        showAbove={showAbove}
        showLabel={false}
        className="cursor-pointer"
      />
    </div>
  );
}


