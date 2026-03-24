import { Trash2, Upload, ZoomIn, ZoomOut, Edit } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { cn } from '~/lib/utils';
import Cropper from 'react-easy-crop';
import { Slider } from '~/components/ui/slider';
import { useTranslation } from 'react-i18next';
import { Spinner } from '~/components/ui/spinner';
import { userService } from '~/services/user.service';

interface Point {
  x: number;
  y: number;
}

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Props for the ImageUploader component
 */
interface ImageUploaderProps {
  onSave?: () => void;
  isUploading?: boolean;
  headerTitle?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  initialImage?: string;
  onImageUpload?: (url: string) => void;
  /**
   * The aspect ratio of the cropped image (width / height)
   * @default 1 (square)
   */
  aspectRatio?: number;

  /**
   * Maximum file size in bytes
   * @default 5242880 (5MB)
   */
  maxSize?: number;

  /**
   * Allowed file types
   * @default ['image/jpeg', 'image/png', 'image/webp']
   */
  acceptedFileTypes?: string[];

  /**
   * CSS class name for the container
   */
  className?: string;

  /**
   * Callback function that returns the cropped image as a blob or file
   */
  onImageCropped?: (
    blob: Blob,
    fileInfo: { name: string; type: string },
  ) => void;
}

/**
 * A reusable image uploader component with drag & drop, preview, and crop functionality
 * Supports both Dialog mode (if open/setOpen provided) and Inline mode
 */
export function ImageUploader({
  headerTitle = 'Image Uploader',
  open,
  setOpen,
  initialImage,
  onImageUpload,
  aspectRatio = 1,
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedFileTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className,
  onImageCropped,
  onSave,
  isUploading = false,
}: ImageUploaderProps) {
  const { t } = useTranslation(['app']);
  const [image, setImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [originalFile, setOriginalFile] = useState<{
    name: string;
    type: string;
  } | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(initialImage || null);
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);

  const [isInternalUploading, setIsInternalUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImage) {
      setPreviewImage(initialImage);
    }
  }, [initialImage]);

  const handleFileSelect = (file: File | null) => {
    if (!file) return;

    setError(null);

    if (!acceptedFileTypes.includes(file.type)) {
      setError(
        `File type not supported. Accepted types: ${acceptedFileTypes.join(', ')}`,
      );
      return;
    }

    if (file.size > maxSize) {
      setError(`File is too large. Maximum size: ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    setOriginalFile({ name: file.name, type: file.type });

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setIsCropDialogOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const cropImage = useCallback(async () => {
    if (!image || !croppedAreaPixels || !originalFile) return;

    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = image;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(
        img,
        croppedAreaPixels.x * scaleX,
        croppedAreaPixels.y * scaleY,
        croppedAreaPixels.width * scaleX,
        croppedAreaPixels.height * scaleY,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
      );

      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            setIsInternalUploading(true);
            setIsCropDialogOpen(false); // Đóng dialog crop để hiện loading ở preview

            // Gọi API upload thật
            const response = await userService.uploadAvatar('avatars', blob, {
              name: originalFile.name,
              type: originalFile.type,
            });

            const realUrl = response.data?.picture?.url;

            if (realUrl) {
              setPreviewImage(realUrl);
              if (onImageUpload) {
                onImageUpload(realUrl);
              }
              if (onImageCropped) {
                onImageCropped(blob, originalFile);
              }
            } else {
              setError('Upload failed: No URL returned');
            }
          } catch (err: any) {
            setError(err?.response?.data?.message || 'Upload to Cloudinary failed');
          } finally {
            setIsInternalUploading(false);
          }
        }
      }, originalFile.type);
    }
  }, [image, croppedAreaPixels, originalFile, onImageCropped, onImageUpload]);

  useEffect(() => {
    if (open !== undefined && !open) {
      if (!initialImage) {
        clearImage();
      }
    }
  }, [open, initialImage]);

  const clearImage = () => {
    setPreviewImage(null);
    setImage(null);
    setCroppedAreaPixels(null);
    setOriginalFile(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    if (onImageUpload) {
      onImageUpload('');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const renderContent = () => (
    <div className={cn('w-full h-full group/uploader', className)}>
      {!previewImage ? (
        <div
          className='border-2 border-dashed rounded-lg h-full flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-muted/20 transition-colors'
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}>
          <input
            ref={inputRef}
            type='file'
            className='hidden'
            accept={acceptedFileTypes.join(',')}
            onChange={(e) =>
              handleFileSelect(
                e.target.files ? e.target.files[0] : null,
              )
            }
          />
          <Upload className='h-8 w-8 text-muted-foreground' />
          <p className='mt-2 text-xs text-muted-foreground'>
            {t('app:upload.field.dragAndDrop')}
          </p>
          {error && (
            <p className='mt-2 text-[10px] text-destructive'>{error}</p>
          )}
        </div>
      ) : (
        <div className='relative h-full w-full rounded-lg overflow-hidden border border-border'>
          {isInternalUploading && (
            <div className='absolute inset-0 z-10 bg-black/20 flex items-center justify-center backdrop-blur-[1px]'>
              <Spinner className='size-8 text-primary animate-spin' />
            </div>
          )}
          <img
            src={previewImage}
            alt='Preview'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black/40 opacity-0 group-hover/uploader:opacity-100 transition-opacity flex items-center justify-center gap-2'>
            <Button
              size='icon'
              variant='secondary'
              className='h-8 w-8 rounded-full'
              onClick={() => inputRef.current?.click()}>
              <Edit size={14} />
            </Button>
            <Button
              size='icon'
              variant='destructive'
              className='h-8 w-8 rounded-full'
              onClick={clearImage}>
              <Trash2 size={14} />
            </Button>
          </div>
          <input
            ref={inputRef}
            type='file'
            className='hidden'
            accept={acceptedFileTypes.join(',')}
            onChange={(e) =>
              handleFileSelect(
                e.target.files ? e.target.files[0] : null,
              )
            }
          />
        </div>
      )}

      <Dialog open={isCropDialogOpen} onOpenChange={setIsCropDialogOpen}>
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
          </DialogHeader>
          {image && (
            <div className='space-y-4'>
              <div className='relative w-full h-80 bg-muted rounded-md overflow-hidden'>
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspectRatio}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <div className='flex items-center gap-4'>
                <ZoomOut className='h-4 w-4 text-muted-foreground' />
                <Slider
                  value={[zoom]}
                  min={1}
                  max={3}
                  step={0.1}
                  onValueChange={(value) => setZoom(value[0])}
                />
                <ZoomIn className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='flex justify-end gap-2'>
                <Button
                  variant='outline'
                  onClick={() => setIsCropDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={cropImage}>Apply</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );

  if (open === undefined && setOpen === undefined) {
    return renderContent();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (isUploading) return;
        setOpen?.(val);
      }}>
      <DialogContent
        onEscapeKeyDown={(e) => isUploading && e.preventDefault()}
        onPointerDownOutside={(e) => isUploading && e.preventDefault()}
        className='p-0 rounded-[14px] border-none shadow-none'>
        <div className={cn('w-full', className)}>
          <Card className='w-full'>
            <CardHeader>
              <CardTitle className='flex items-center justify-between'>
                {headerTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderContent()}
            </CardContent>
            <CardFooter className='flex justify-between'>
              <div className='flex justify-between w-full items-center'>
                <p className='text-xs text-muted-foreground'>
                  {previewImage ? t('app:upload.ready') : t('app:upload.text')}
                </p>
                <div className='flex gap-2'>
                  <Button
                    variant='ghost'
                    onClick={() => setOpen?.(false)}
                    disabled={isUploading}>
                    {t('app:upload.cancelBtn')}
                  </Button>
                  <Button
                    onClick={onSave}
                    disabled={!previewImage || isUploading}>
                    {isUploading ? (
                      <>
                        <Spinner className='mr-2 size-4 animate-spin text-blue-500' />
                        <span>{t('app:upload.processing')}</span>
                      </>
                    ) : (
                      t('app:upload.saveBtn')
                    )}
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
