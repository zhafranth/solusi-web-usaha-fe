import { useState } from 'react'
import { X } from 'lucide-react'

const TagsInput = ({
  value = [],
  onChange,
  placeholder = 'Ketik tag dan tekan Enter atau koma...',
  className = '',
  disabled = false,
}) => {
  const [input, setInput] = useState('')

  const addTag = (raw) => {
    const tag = raw.trim()
    if (!tag) return
    if (value.includes(tag)) return
    onChange([...value, tag])
  }

  const removeTag = (target) => {
    onChange(value.filter((t) => t !== target))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(input)
      setInput('')
    } else if (e.key === 'Backspace' && input === '' && value.length > 0) {
      removeTag(value[value.length - 1])
    }
  }

  const handleBlur = () => {
    if (input.trim()) {
      addTag(input)
      setInput('')
    }
  }

  const inputClass =
    'w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue focus:bg-white text-sm transition-all outline-none border-gray-200'

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`${inputClass} ${className}`}
      />
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1.5 bg-primary-blue/5 text-primary-blue text-xs rounded-lg border border-primary-blue/10"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                disabled={disabled}
                className="ml-2 text-primary-blue/60 hover:text-primary-blue transition-colors disabled:opacity-50"
                aria-label={`Hapus tag ${tag}`}
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default TagsInput
