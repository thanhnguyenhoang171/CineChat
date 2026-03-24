import path from 'path';

export const CommonUtil = {
  parseFileUploadName(originalName: string): string {
    // Separate file name and extension
    const parsed = path.parse(originalName);
    const nameWithoutExt = parsed.name;
    const extension = parsed.ext; // ".png"

    const timestamp = Date.now();
    const sanitizedName = nameWithoutExt.replace(/\s+/g, '_').toLowerCase();

    return `${sanitizedName}-${timestamp}${extension}`;
  },
};
