import type { TConversation } from 'librechat-data-provider';
import type { TSetOption } from '~/common';
import { SelectDropDown } from '~/components/ui';

type TGoogleProps = {
  showExamples: boolean;
  isCodeChat: boolean;
};

type TSelectProps = {
  conversation: TConversation | null;
  setOption: TSetOption;
  extraProps?: TGoogleProps;
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

  // Get selected subject or default to "maths"
  const selectedSubject = conversation?.subject || "maths";

  return (
    <SelectDropDown
      value={selectedSubject}
      setValue={(value) => setOption("subject", value)} // Fixes state update
      availableValues={subjectOptions.map(subject => subject.name)}
      showAbove={showAbove}
      showLabel={false}
    />
  );
}

