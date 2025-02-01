import styles from '@/components/common/SearchBar/SearchBar.module.scss'
import searchBarIcon from '@/assets/icons/search-bar.svg' 

interface SearchBarProps {
  value: string
  placeholder?: string
  onChange: (value: string) => void
  onSubmit?: (event: React.MouseEvent<HTMLImageElement> | React.KeyboardEvent<HTMLInputElement>) => void
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
      <img
        src={searchBarIcon}
        onClick={onSubmit}
        className={styles.searchButton}
        alt="Search Icon"
      />
    </div>
  )
}

export default SearchBar
