'use client';

import { Dialog, DialogContent, DialogHeader } from "@/components/ui";
import { useKeyboardShortcut } from "@/core/hooks/useKeyboardShortcut";
import { InputProps } from "@/types/search";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from 'react';

// Map the alias to actual symbols
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

// Define the width classes
const widthClasses: Record<WidthOption, string> = {
    sm: 'w-64',
    search: 'w-72',
    md: 'w-96',
    lg: 'w-128',
    full: 'w-full',
};

export default function Input({
    isSearch = false,
    placeholder = "Enter text...",
    className = "",
    width = 'search',
    searchOptions = [],
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

    const baseInputClasses = `py-2 px-4 border border-border rounded-md text-sm text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-outline bg-input-bg focus:bg-input-focus ${widthClasses[width]}`;

    if (!isSearch) {
        return (
            <input
                type="text"
                className={`${baseInputClasses} ${className}`}
                placeholder={placeholder}
                {...props}
            />
        );
    }

    return (
        <>
            <div className="relative" onClick={openModal}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
                <input
                    type="search"
                    placeholder={placeholder}
                    className={`${baseInputClasses} pl-10 pr-12 cursor-pointer ${className}`}
                    readOnly
                    {...props}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    {renderKbdIcon({ modifier: 'Command', key: 'K' })}
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px] bg-neutral-900 text-white">
                    <DialogHeader>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
                            <input
                                ref={inputRef}
                                type="search"
                                placeholder="Search your base..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`${baseInputClasses} pl-10 pr-4`}
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
                                <div className="flex items-center space-x-2">
                                    {renderKbdIcon({ modifier: 'Command', key: 'K', fullShortcut: option.shortcut })}
                                </div>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
