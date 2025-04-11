"use client"

import type React from "react"

import { useState, useRef, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, ImageIcon, Save } from "lucide-react"
import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css"
import { cropperStyles } from "./_utils/cropper-style"

export default function ImageUploader() {
  const [image, setImage] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [isCropping, setIsCropping] = useState(false)
  const cropperRef = useRef<HTMLImageElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string)
        setIsCropping(true)
        setCroppedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string)
        setIsCropping(true)
        setCroppedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleCrop = () => {
    if (cropperRef.current && typeof (cropperRef.current as any).cropper !== "undefined") {
      setCroppedImage((cropperRef.current as any).cropper.getCroppedCanvas().toDataURL())
      setIsCropping(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const resetImage = () => {
    setImage(null)
    setCroppedImage(null)
    setIsCropping(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const cropperContainerStyle = {
    height: 400,
    width: "100%",
  }

  return (
    <div className="">
      <style>{cropperStyles}</style>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      {!image && (
        <Card>
          <CardContent
            className="flex flex-col items-center justify-center h-80 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-12"
            onClick={triggerFileInput}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-center mb-1">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500 text-center">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </CardContent>
        </Card>
      )}

      {image && isCropping && (
        <div className="grid gap-4">
          <Card>
            <CardContent className="p-4">
              <Cropper
                src={image}
                style={cropperContainerStyle}
                initialAspectRatio={16 / 9}
                guides={true}
                ref={cropperRef}
                viewMode={1}
                dragMode="move"
                cropBoxMovable={true}
                cropBoxResizable={true}
                toggleDragModeOnDblclick={true}
              />
            </CardContent>
          </Card>
          <div className="flex gap-2">
            <Button onClick={handleCrop} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Crop Image
            </Button>
            <Button variant="outline" onClick={resetImage}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {croppedImage && (
        <div className="grid gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-center">
                <img src={croppedImage || "/placeholder.svg"} alt="Cropped" className="max-h-[400px] object-contain" />
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-2">
            <Button onClick={() => setIsCropping(true)} className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Edit Again
            </Button>
            <Button variant="outline" onClick={resetImage}>
              Upload New Image
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
