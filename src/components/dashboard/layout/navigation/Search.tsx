'use client'

import { Dialog, DialogContent, DialogHeader, Input } from "@/components/ui"
import { useKeyboardShortcut } from '@/core/hooks/useKeyboardShortcut'
import { HelpCircle, LayoutDashboard, Search as SearchIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

const searchOptions = [
  { icon: LayoutDashboard, label: 'Start a conversation', shortcut: 'C' },
  { icon: Search, label: 'Write a query', shortcut: 'Q' },
  { icon: LayoutDashboard, label: 'Create a dashboard', shortcut: 'D' },
  { icon: LayoutDashboard, label: 'Create a table', shortcut: 'T' },
  { icon: HelpCircle, label: 'Contact support', shortcut: 'S' },
]

export default function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const toggleSearch = useCallback(() => {
    setIsOpen(prev => !prev)
    setSearchTerm('')
  }, [])

  useKeyboardShortcut([
    { key: 'k', ctrlKey: true },
    { key: 'k', metaKey: true },
    { key: 's' }
  ], toggleSearch)

  return (
    <>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
        <Input
          type="search"
          placeholder="Search"
          className="w-full py-2  pr-12 bg-neutral-800 border border-neutral-700 rounded-md text-sm text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600"
          onClick={toggleSearch}
          readOnly
        />
        <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none inline-flex items-center border border-neutral-700 rounded px-1.5 font-mono text-[10px] font-medium text-neutral-400">
          ⌘K
        </kbd>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-modal text-white">
          <DialogHeader>
            <Input
              type="search"
              placeholder="Search your base..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2  pr-4 bg-neutral-800 border border-neutral-700 rounded-md text-sm text-neutral-300 placeholder-neutral-500 focus:outline-none focuwwws:ring-2 focus:ring-neutral-600"
              autoFocus
            />
          </DialogHeader>
          <div className="mt-4">
            {searchOptions.map((option, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-4 hover:bg-neutral-800 rounded-md cursor-pointer">
                <div className="flex items-center">
                  <option.icon className="mr-3 text-neutral-400" size={18} />
                  <span>{option.label}</span>
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
  )
}
