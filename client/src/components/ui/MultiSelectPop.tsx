import { Wrench } from 'lucide-react';
import { Root, Trigger, Content, Portal } from '@radix-ui/react-popover';
import type { TPlugin } from 'librechat-data-provider';
import MenuItem from '~/components/Chat/Menus/UI/MenuItem';
import { useMultiSearch } from './MultiSearch';
import { cn } from '~/utils/';

type SelectDropDownProps = {
  title?: string;
  value: Array<{ icon?: string; name?: string; isButton?: boolean }>;
  disabled?: boolean;
  setSelected: (option: string) => void;
  availableValues: TPlugin[];
  showAbove?: boolean;
  showLabel?: boolean;
  containerClassName?: string;
  isSelected: (value: string) => boolean;
  className?: string;
  optionValueKey?: string;
  searchPlaceholder?: string;
};

function MultiSelectPop({
  title: _title = 'Plugins',
  value,
  setSelected,
  availableValues,
  showAbove = false,
  showLabel = true,
  containerClassName,
  isSelected,
  optionValueKey = 'value',
  searchPlaceholder,
}: SelectDropDownProps) {
  // const localize = useLocalize();

  const title = _title;
  const excludeIds = ['select-plugin', 'plugins-label', 'selected-plugins'];

  // Detemine if we should to convert this component into a searchable select
  const [filteredValues, searchRender] = useMultiSearch<TPlugin[]>({
    availableOptions: availableValues,
    placeholder: searchPlaceholder,
    getTextKeyOverride: (option) => (option.name || '').toUpperCase(),
  });
  const hasSearchRender = Boolean(searchRender);
  const options = hasSearchRender ? filteredValues : availableValues;

  return (
    <Root>
      <div className={cn('flex items-center justify-center gap-2', containerClassName ?? '')}>
        <div className="relative">
          <Portal>
            <Content
              side="bottom"
              align="center"
              className={cn(
                'mt-2 max-h-[52vh] min-w-full overflow-hidden overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-700 dark:text-white',
                hasSearchRender && 'relative',
              )}
            >
              {searchRender}
              {options.map((option) => {
                if (!option) {
                  return null;
                }
                const selected = isSelected(option[optionValueKey]);
                return (
                  <MenuItem
                    key={`${option[optionValueKey]}`}
                    title={option.name}
                    value={option[optionValueKey]}
                    selected={selected}
                    onClick={() => setSelected(option.pluginKey)}
                    icon={
                      option.icon ? (
                        <img
                          src={option.icon}
                          alt={`${option.name} logo`}
                          className="icon-sm mr-1 rounded-sm bg-cover"
                        />
                      ) : (
                        <Wrench className="icon-sm mr-1 rounded-sm bg-white bg-cover dark:bg-gray-800" />
                      )
                    }
                  />
                );
              })}
            </Content>
          </Portal>
        </div>
      </div>
    </Root>
  );
}

export default MultiSelectPop;
