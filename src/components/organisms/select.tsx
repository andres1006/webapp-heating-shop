import {
  Select as SelectPrimitive,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import clsx from 'clsx'

type SelectOption = {
  options: { value: string; label: string }[]
  placeholder: string
  value: string
  onChange: (value: string) => void
  className?: string
}

const Select = ({ options, placeholder, value, onChange, className }: SelectOption) => {
  return (
    <SelectPrimitive
      onValueChange={(e) => {
        onChange(e)
      }}
      value={value}
    >
      <SelectTrigger className={clsx('w-full', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectPrimitive>
  )
}

export default Select
