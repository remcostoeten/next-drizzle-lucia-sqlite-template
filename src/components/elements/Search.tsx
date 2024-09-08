'use client';

import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { useKeyboardShortcut } from "@/core/hooks/useKeyboardShortcut";
import { InputProps } from "@/types/search";
import { FileText, HelpCircle, LayoutDashboard, MessageSquare, Search, Table, X } from "lucide-react";
import { useEffect, useRef, useState } from 'react';

const searchOptions = [
    { icon: MessageSquare, label: 'Start a conversation', shortcut: '⌘1' },
    { icon: FileText, label: 'Write a query', shortcut: '⌘2' },
    { icon: LayoutDashboard, label: 'Create a dashboard', shortcut: '⌘3' },
    { icon: Table, label: 'Create a table', shortcut: '⌘4' },
    { icon: HelpCircle, label: 'Contact support', shortcut: '⌘5' },
];

export default function Input({
    isSearch = false,
    placeholder = "Enter text...",
    className = "",
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

    return (
        <>
            <div className="relative" onClick={openModal}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
                <input
                    type="search"
                    placeholder={placeholder}
                    className={`py-2 px-4  pr-12 border border-neutral-700 rounded-md text-sm text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-neutral-800 focus:bg-neutral-700 cursor-pointer ${className}`}
                    readOnly
                    {...props}
                />
                <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none inline-flex items-center border border-neutral-700 rounded px-1.5 font-mono text-[10px] font-medium text-neutral-400">
                    ⌘K
                </kbd>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm backdrop-opacity-40" />
                <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg p-0 overflow-hidden">
                    <div className="relative border-b border-neutral-800">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
                        <input
                            ref={inputRef}
                            type="search"
                            placeholder="Search your base..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-3 px-4 s pr-10 bg-neutral-900 text-neutral-100 placeholder-neutral-500 focus:outline-none"
                        />
                        <button
                            onClick={closeModal}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                        >
                            <X size={18} />
                        </button>
                    </div>
                    <div className="p-1">
                        {searchOptions.map((option, index) => (
                            <div key={index} className="flex items-center justify-between py-2 px-3 hover:bg-neutral-800 rounded-md cursor-pointer">
                                <div className="flex items-center">
                                    <option.icon className="mr-3 text-neutral-400" size={18} />
                                    <span className="text-sm text-neutral-300">{option.label}</span>
                                </div>
                                <kbd className="inline-flex items-center border border-neutral-700 rounded px-1.5 font-mono text-[10px] font-medium text-neutral-400">
                                    {option.shortcut}
                                </kbd>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
