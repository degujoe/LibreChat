import React from 'react';
import {
  Label,
  Listbox,
  Transition,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import type { Option, OptionWithIcon, DropdownValueSetter } from '~/common';
import CheckMark from '~/components/svg/CheckMark';
import { useMultiSearch } from './MultiSearch';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils/';

type SelectDropDownProps = {
  id?: string;
  title?: string;
  disabled?: boolean;
  value: string | null | Option | OptionWithIcon;
  setValue: DropdownValueSetter | ((value: string) => void);
  tabIndex?: number;
  availableValues?: string[] | Option[] | OptionWithIcon[];
  emptyTitle?: boolean;
  showAbove?: boolean;
  showLabel?: boolean;
  iconSide?: 'left' | 'right';
  optionIconSide?: 'left' | 'right';
  renderOption?: () => React.ReactNode;
  containerClassName?: string;
  currentValueClass?: string;
  optionsListClass?: string;
  optionsClass?: string;
  subContainerClassName?: string;
  className?: string;
  placeholder?: string;
  searchClassName?: string;
  searchPlaceholder?: string;
  showOptionIcon?: boolean;
};

function getOptionText(option: string | Option | OptionWithIcon): string {
  if (typeof option === 'string') {
    return option;
  }
  if ('label' in option) {
    return option.label ?? '';
  }
  if ('value' in option) {
    return (option.value ?? '') + '';
  }
  return '';
}

function SelectDropDown({
  title: _title,
  value,
  disabled,
  setValue,
  availableValues,
  showAbove = false,
  showLabel = true,
  emptyTitle = false,
  iconSide = 'right',
  optionIconSide = 'left',
  placeholder,
  containerClassName,
  optionsListClass,
  optionsClass,
  currentValueClass,
  subContainerClassName,
  className,
  renderOption,
  searchClassName,
  searchPlaceholder,
  showOptionIcon = false,
}: SelectDropDownProps) {
  const localize = useLocalize();
  const transitionProps = { className: 'top-full mt-3' };
  if (showAbove) {
    transitionProps.className = 'bottom-full mb-3';
  }

  let title = _title;

  if (emptyTitle) {
    title = '';
  } else if (!(title ?? '')) {
    title = localize('com_ui_model');
  }

  const values = availableValues ?? [];

  // Detemine if we should to convert this component into a searchable select.  If we have enough elements, a search
  // input will appear near the top of the menu, allowing correct filtering of different model menu items. This will
  // reset once the component is unmounted (as per a normal search)
  const [filteredValues, searchRender] = useMultiSearch<string[] | Option[]>({
    availableOptions: values,
    placeholder: searchPlaceholder,
    getTextKeyOverride: (option) => getOptionText(option).toUpperCase(),
    className: searchClassName,
    disabled,
  });
  const hasSearchRender = searchRender != null;
  const options = hasSearchRender ? filteredValues : values;

  const renderIcon = showOptionIcon && value != null && (value as OptionWithIcon).icon != null;

  return (
    <div className={cn('flex items-center justify-center gap-2 ', containerClassName ?? '')}>
      <div className={cn('relative w-full', subContainerClassName ?? '')}>

      </div>
    </div>
  );
}

export default SelectDropDown;
