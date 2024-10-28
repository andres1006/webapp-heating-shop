import { FC } from 'react';
import FilterInput from '../ui/filterInputs';

interface FiltersProps {
  onSearch: (query: string) => void;
}

const Filters: FC<FiltersProps> = ({ onSearch }) => (
  <div className="mb-6">
    <FilterInput
      placeholder="Buscar producto..."
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

export default Filters;