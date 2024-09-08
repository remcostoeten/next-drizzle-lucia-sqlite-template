'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, Upload, X } from 'lucide-react';
import { useCallback } from 'react';
import { DropzoneOptions, FileRejection, useDropzone } from 'react-dropzone';

interface AvatarUploadProps {
  avatarPreview: string | null;
  setAvatarPreview: (preview: string | null) => void;
  setFieldValue: (field: string, value: any) => void;
}

export function AvatarUpload({ avatarPreview, setAvatarPreview, setFieldValue }: AvatarUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        setFieldValue('avatar', result);
      };
      reader.readAsDataURL(file);
    } else if (fileRejections.length > 0) {
      console.error('File rejected:', fileRejections[0].errors);
      // Handle file rejection (e.g., show an error message to the user)
    }
  }, [setAvatarPreview, setFieldValue]);

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg']
    },
    maxFiles: 1,
    multiple: false,
    onDragEnter: () => { },
    onDragOver: () => { },
    onDragLeave: () => { },
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions);

  const handleRemoveAvatar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAvatarPreview(null);
    setFieldValue('avatar', '');
  };

  return (
    <div {...getRootProps()} className="relative cursor-pointer group">
      <input {...getInputProps()} />
      <Avatar className="h-32 w-32 border-4 border-gray-700 group-hover:border-gray-500 transition-colors duration-300">
        <AvatarImage src={avatarPreview || ''} alt="Avatar preview" />
        <AvatarFallback className="bg-gray-800 text-gray-400">
          {avatarPreview ? (
            <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
          ) : (
            <Camera className="w-12 h-12" />
          )}
        </AvatarFallback>
      </Avatar>
      <AnimatePresence>
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
          >
            <Upload className="text-white w-12 h-12" />
          </motion.div>
        )}
      </AnimatePresence>
      {avatarPreview && (
        <motion.button
          type="button"
          onClick={handleRemoveAvatar}
          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4 text-white" />
        </motion.button>
      )}
    </div>
  );
}t
