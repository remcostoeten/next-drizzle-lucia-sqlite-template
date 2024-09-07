'use client'

import { Dialog, DialogContent, DialogHeader, Input } from "@/components/ui"
import { useKeyboardShortcut } from "@/core/hooks/useKeyboardShortcut"
import { FileText, HelpCircle, LayoutDashboard, MessageSquare, Search, Table } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

const searchOptions = [
  { icon: MessageSquare, label: 'Start a conversation', shortcut: 'C' },
  { icon: FileText, label: 'Write a query', shortcut: 'Q' },
  { icon: LayoutDashboard, label: 'Create a dashboard', shortcut: 'D' },
  { icon: Table, label: 'Create a table', shortcut: 'T' },
  { icon: HelpCircle, label: 'Contact support', shortcut: 'S' },
]

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [backdropVariant, setBackdropVariant] = useState<'light' | 'heavy'>('light')
  const inputRef = useRef<HTMLInputElement>(null)

  const openModal = useCallback(() => {
    setIsOpen(true)
    setSearchTerm('')
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setSearchTerm('')
  }, [])

  useKeyboardShortcut([
    { key: 'k', ctrlKey: true },
    { key: 'k', metaKey: true },
    { key: 's' }
  ], openModal)

  useKeyboardShortcut({ key: 'Escape' }, closeModal)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const toggleBackdropVariant = () => {
    setBackdropVariant(prev => prev === 'light' ? 'heavy' : 'light')
  }

  const backdropStyle = {
    '--tw-backdrop-blur': backdropVariant === 'heavy' ? '16px' : '8px',
    '--tw-backdrop-brightness': backdropVariant === 'heavy' ? '0.7' : '1',
  } as React.CSSProperties

  return (
    <>
      <div className="relative" onClick={openModal}>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
        <Input
          type="search"
          placeholder="Search"
          className="w-full py-2 pl-10 pr-12 bg-neutral-800 border border-neutral-700 rounded-md text-sm text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 cursor-pointer"
          readOnly
        />
        <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none inline-flex items-center border border-neutral-700 rounded px-1.5 font-mono text-[10px] font-medium text-neutral-400">
          ⌘K
        </kbd>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-neutral-900 text-white" style={backdropStyle}>
          <DialogHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
              <Input
                ref={inputRef}
                type="search"
                placeholder="Search your base..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 bg-neutral-800 border border-neutral-700 rounded-md text-sm text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 input-focus"
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
                  <div className="text-xs text-neutral-500">⌘</div>
                  <kbd className="bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded text-xs">{option.shortcut}</kbd>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={toggleBackdropVariant}
              className="text-sm text-neutral-400 hover:text-neutral-300 transition-colors"
            >
              Toggle Backdrop: {backdropVariant === 'light' ? 'Light' : 'Heavy'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
