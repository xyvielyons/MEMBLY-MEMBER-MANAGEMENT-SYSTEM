'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'
import { useDropzone } from '@uploadthing/react'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { Button } from './ui/button'

const convertFileToUrl = (file: File) => URL.createObjectURL(file)
import { assets } from '@/public/assets';
import Image from 'next/image'
type FileUploaderProps = {
  onFieldChange: (url: string) => void
  imageUrl: string
  setFiles: Dispatch<SetStateAction<File[]>>
}

export function ImageUploader({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(acceptedFiles)
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(['image/*']),
  })
  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden bg-grey-50">
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <Image
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex items-center flex-col py-5 text-grey-500 border-2 border-dotted border-gray-500">
          <Image src={assets.upload} width={77} height={77} alt="file upload" />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" variant="secondary" className="rounded-md">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  )
}