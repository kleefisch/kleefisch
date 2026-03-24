"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/lib/cropImage";
import { Image as ImageIcon, Upload, Crop, Check, X, RotateCcw } from "lucide-react";
import Image from "next/image";

interface ImageCropperFieldProps {
  currentImageUrl?: string | null;
  onCropComplete: (blob: Blob | null) => void;
}

export function ImageCropperField({ currentImageUrl, onCropComplete }: ImageCropperFieldProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result?.toString() || "");
        setIsCropping(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleEditCurrent = () => {
    if (currentImageUrl) {
      // Usar a imagem atual para edição
      // Se for um link de blob, pode demorar pra carregar ou ter bloqueio de cors, então lib/cropImage adiciona crossorigin attr
      setImageSrc(currentImageUrl);
      setIsCropping(true);
    }
  };

  const onCropCompleteEvent = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    if (!imageSrc) return;
    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      if (croppedImageBlob) {
        const url = URL.createObjectURL(croppedImageBlob);
        setPreviewUrl(url);
        onCropComplete(croppedImageBlob);
      }
      setIsCropping(false);
      setImageSrc(null);
    } catch (e) {
      console.error(e);
      alert("Não foi possível recortar a imagem. Erro de CORS ou imagem inválida.");
      setIsCropping(false);
    }
  };

  const handleCancelCrop = () => {
    setIsCropping(false);
    setImageSrc(null);
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onCropComplete(null);
  };

  if (isCropping && imageSrc) {
    return (
      <div className="space-y-4">
        <label className="block text-sm font-medium text-neutral-300">Ajustar Imagem</label>
        <div className="relative h-64 w-full bg-neutral-900 rounded-xl overflow-hidden border border-white/10">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={21 / 9} // aspect ratio que é utilizado na listagem e na página do projeto
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropCompleteEvent}
            onZoomChange={setZoom}
          />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-neutral-400 font-medium">Zoom</span>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-accent-cyan"
          />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-neutral-400 font-medium">Rotação</span>
          <input
            type="range"
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby="Rotation"
            onChange={(e) => setRotation(Number(e.target.value))}
            className="w-full accent-accent-cyan"
          />
        </div>

        <div className="flex items-center gap-2 justify-end pt-2">
          <button
            type="button"
            onClick={handleCancelCrop}
            className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSaveCrop}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-cyan text-black text-sm font-bold rounded-md hover:bg-accent-cyan/90 transition-colors"
          >
            <Check className="h-4 w-4" />
            Salvar Recorte
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-neutral-300">
        Imagem do Projeto (Aspecto 21:9)
      </label>

      {previewUrl ? (
        <div className="relative group rounded-xl overflow-hidden border border-white/10 aspect-[21/9] bg-neutral-900 flex items-center justify-center">
          <Image src={previewUrl} alt="Preview" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-md transition-colors backdrop-blur-sm border border-white/10">
              <Upload className="h-4 w-4" />
              Trocar
              <input type="file" accept="image/*" onChange={onSelectFile} className="hidden" />
            </label>
            <button
              type="button"
              onClick={handleEditCurrent}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-md transition-colors backdrop-blur-sm border border-white/10"
            >
              <Crop className="h-4 w-4" />
              Ajustar
            </button>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/80 hover:bg-red-500 text-white text-sm font-medium rounded-md transition-colors backdrop-blur-sm border border-red-500/50"
            >
              <X className="h-4 w-4" />
              Remover
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 hover:border-accent-cyan/50 hover:bg-white/5 rounded-xl cursor-pointer transition-all">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-neutral-400">
            <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
            <p className="mb-1 text-sm">
              <span className="font-semibold text-accent-cyan">Clique para enviar</span>
            </p>
            <p className="text-xs opacity-70">PNG, JPG, WEBP até 5MB</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={onSelectFile} />
        </label>
      )}
    </div>
  );
}
