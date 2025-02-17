import styles from '@/components/common/SearchBar/SearchBar.module.scss'

interface SearchBarProps {
  value: string
  placeholder?: string
  onChange: (value: string) => void
  onSubmit?: (event: React.MouseEvent<HTMLImageElement> | React.KeyboardEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function SearchBar({ value, placeholder, onChange, onSubmit }: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(e) 
    }
  }

  return (
    <div className={styles.Wrapper} tabIndex={0}>
      <input
        className={styles.InputWrapper}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default SearchBar
