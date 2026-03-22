export enum RoleLevel {
  ADMIN = 0,
  MANAGER = 1,
  USER = 2,
}

export enum ActiveStatus {
  ACTIVE = 1,
  INACTIVE = 0,
  PENDING = 2,
}

export enum Gender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}

export enum LoginProvider {
  GOOGLE = 0,
  USERNAME = 1,
}

export enum MovieDepartment {
  ACTING = 'Acting',
  DIRECTING = 'Directing',
  WRITING = 'Writing',
  PRODUCTION = 'Production',
  EDITING = 'Editing',
  CAMERA = 'Camera',
  SOUND = 'Sound',
  VISUAL_EFFECTS = 'Visual Effects',
  ART = 'Art', // Thiết kế bối cảnh, đạo cụ
  COSTUME_MAKEUP = 'Costume & Make-Up',
  CREW = 'Crew', // Các vai trò kỹ thuật khác
}

//File
export const MAX_FILE_SIZE = 500 * 1024 * 1024; // 5MB Global Limit
export const ALLOWED_MIME_TYPES = /^image\/(jpg|jpeg|png|gif|webp)$/;
