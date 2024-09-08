'use client';

import { useCallback, useEffect } from 'react';

type KeyCombo = {
  key: string
  ctrlKey?: boolean
  metaKey?: boolean
}

export function useKeyboardShortcut(keyCombo: KeyCombo | KeyCombo[], callback: () => void) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Ignore if the active element is an input or textarea
    if (
      document.activeElement instanceof HTMLInputElement ||
      document.activeElement instanceof HTMLTextAreaElement
    ) {
      return;
    }

    const combos = Array.isArray(keyCombo) ? keyCombo : [keyCombo]

    const isMatch = combos.some(combo =>
      event.key.toLowerCase() === combo.key.toLowerCase() &&
      (combo.ctrlKey === undefined || event.ctrlKey === combo.ctrlKey) &&
      (combo.metaKey === undefined || event.metaKey === combo.metaKey)
    )

    if (isMatch) {
      event.preventDefault()
      callback()
    }
  }, [keyCombo, callback])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
