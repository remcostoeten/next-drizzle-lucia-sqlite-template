

import { Dialog, DialogContent, DialogHeader, DialogOverlay } from "@/components/ui/dialog";
import { useKeyboardShortcut } from "@/core/hooks/useKeyboardShortcut";
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type ModifierKeyAlias = 'Command' | 'Option' | 'Shift' | 'Control';
type BlurVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';

type KbdProps = {
  modifier?: ModifierKeyAlias;
  key: string;
  fullShortcut?: string;
}

type InputProps = {
  isSearch?: boolean;
  searchWidth?: string;
  width?: string;
  kbdProps?: KbdProps;
  backdropBlur?: BlurVariant;
  backdropColor?: string;
  backdropOpacity?: number;
  placeholder?: string;
  className?: string;
  searchOptions?: Array<{ icon: React.ComponentType; label: string }>;
  hasBlur?: boolean;
  [key: string]: any;
}

const modifierKeySymbols: Record<ModifierKeyAlias, string> = {
  Command: '⌘',
  Option: '⌥',
  Shift: '⇧',
  Control: '⌃',
};

function renderKbdIcon({ modifier, key, fullShortcut }: KbdProps) {
  const shortcut = fullShortcut || (modifier ? `${modifierKeySymbols[modifier]} ${key}` : key);

  return (
    <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none inline-flex items-center border border-neutral-700 rounded px-1.5 font-mono text-[10px] font-medium text-neutral-400">
      {shortcut}
    </kbd>
  );
}

const blurValues: Record<BlurVariant, string> = {
  xs: 'backdrop-blur-[1px]',
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
  none: 'backdrop-blur-none'
};

export default function Input({
  isSearch = false,
  searchWidth = 'w-72',
  width = 'w-full',
  kbdProps = { modifier: 'Command', key: 'K' },
  backdropBlur = 'none',
  backdropColor = 'black',
  backdropOpacity = 0.3,
  placeholder = "Enter text...",
  className = "",
  searchOptions = [],
  hasBlur = true,
  ...props
}: InputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const openModal = () => {
    if (isSearch) {
      setIsOpen(true);
      setSearchTerm('');
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setSearchTerm('');
  };

  useKeyboardShortcut([
    { key: 'k', ctrlKey: true },
    { key: 'k', metaKey: true },
    { key: 's' }
  ], openModal);

  useKeyboardShortcut({ key: 'Escape' }, closeModal);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const baseInputClasses = "py-2 px-4 border border-border ";

  const backdropStyle = {
    backgroundColor: backdropColor,
    opacity: backdropOpacity,
  };

  if (!isSearch) {
    return (
      <input
        type="text"
        className={`${baseInputClasses} ${width} ${className}`}
        placeholder={placeholder}
        {...props}
      />
    );
  }

  return (
    <>
      <div className={`relative ${searchWidth}`} onClick={openModal}>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
        <input
          type="search"
          placeholder={placeholder}
          className={`${baseInputClasses} w-full pr-12 relative cursor-pointer ${className}`}
          readOnly
          {...props}
        />
        {renderKbdIcon(kbdProps)}
      </div>

      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogOverlay
          className={hasBlur ? blurValues[backdropBlur] : ''}
          style={backdropStyle}
        />
        <DialogContent className="sm:max-w-[425px] bg-neutral-900 text-white relative z-50">
          <DialogHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
              <input
                ref={inputRef}
                type="search"
                placeholder="Search your base..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${baseInputClasses} w-full pl-10 pr-4 text-neutral-300`}
              />
            </div>
          </DialogHeader>
          <div className="mt-4">
            {searchOptions.map((option, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-4 hover:bg-neutral-800 rounded-md cursor-pointer">
                <div className="flex items-center">
                  <option.icon className="mr-3 text-neutral-400" size={18} />
                  <span className="text-sm text-neutral-300">{option.label}</span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
