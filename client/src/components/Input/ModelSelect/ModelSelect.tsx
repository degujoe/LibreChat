import { useGetModelsQuery } from 'librechat-data-provider/react-query';
import type { TConversation } from 'librechat-data-provider';
import type { TSetOption } from '~/common';
import { multiChatOptions } from './options';
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
  const modelsQuery = useGetModelsQuery();

  if (!conversation?.endpoint) {
    return null;
  }

  const subjectOptions = [
  { id: "pe", name: "OCR GCSE PE" },
  { id: "maths", name: "OCR A-Level Maths" },
  { id: "science", name: "AQA GCSE Science" },
  { id: "history", name: "Edexcel GCSE History" }
];

const selectedSubject = conversation.subject || "maths"; // Default subject


  return (
    <SelectDropDown
  value={selectedSubject}
  setValue={setOption("subject")}
  availableValues={subjectOptions.map(subject => subject.name)}
  showAbove={showAbove}
  showLabel={false}
/>
  );
}
