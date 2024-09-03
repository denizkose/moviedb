import Filter from '@/components/client/search/Filter';
import { ChangeEventHandler } from 'react';
import Switcher from '@/components/client/Switcher';

type FilterInputCheckboxType = {
  setData: ChangeEventHandler;
  id: string;
  title?: string;
  desc_true?: string;
  desc_false?: string;
  checked?: boolean;
};
export default function FilterInputCheckbox({
  setData,
  id,
  title,
  desc_true,
  desc_false,
  checked,
}: FilterInputCheckboxType) {
  return (
    <Filter title={title} id={id}>
      <Switcher
        isActive={checked || false}
        setData={setData}
        id={id}
        desc_true={desc_true}
        desc_false={desc_false}
      />
    </Filter>
  );
}
