'use client';

import { useCallback, useEffect } from 'react';

type KeyCombo = {
  key: string
  ctrlKey?: boolean
  metaKey?: boolean
}

export function useKeyboardShortcut(keyCombo: KeyCombo | KeyCombo[], callback: () => void) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
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


// Usage example:
// const ExampleComponent: React.FC = () => {
//   const handleShortcut = () => {
//     console.log('Keyboard shortcut triggered!');
//     // Add your shortcut action here
//   };

//   // Single key combo
//   useKeyboardShortcut({ key: 's', ctrlKey: true }, handleShortcut);

//   // Multiple key combos
//   useKeyboardShortcut([
//     { key: 's', ctrlKey: true },
//     { key: 's', metaKey: true }
//   ], handleShortcut);

//   return (
//     <div>
//       <p>Press Ctrl+S (or Cmd+S on Mac) to trigger the shortcut</p>
//     </div>
//   );
// };
