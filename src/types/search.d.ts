// Type alias for common modifier keys
type ModifierKeyAlias = 'Command' | 'Option' | 'Shift' | 'Control';

type KbdProps = {
    modifier?: ModifierKeyAlias;
    key?: string;
    fullShortcut?: string;
};

// Define the width classes
type WidthOption = 'sm' | 'search' | 'md' | 'lg' | 'full';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    isSearch?: boolean;
    searchWidth?: string;
    width?: 'w-72' | 'w-fit' | 'w-full' | 'auto' | `w-[${number}px]`; // Added width prop
    kbdProps?: KbdProps;
    backdropBlur?: BlurVariant;
    backdropDim?: DimVariant;
}
export type BlurVariant = 'sm' | 'md' | 'lg' | 'xl';
export type DimVariant = 'dimmed-soft' | 'dimmed' | 'dimmed-hard';
