import { Request } from 'express';

//  Helper method để extract token từ header
export const  extractTokenFromHeader = (request: Request): string | undefined => {
  const authHeader = request.headers.authorization;
  if (!authHeader) return undefined;

  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined; // Chỉ trả về phần token
}


// Helper method để match permission với endpoint
export const matchPermission = (permission: any, method: string, endpoint: string): boolean => {
  // Check method trước (case insensitive)
  if (permission.method.toLowerCase() !== method.toLowerCase()) {
    return false;
  }

  // Check exact path match
  if (permission.apiPath === endpoint) {
    return true;
  }

  // Check dynamic routes (ví dụ: /api/users/:id)
  if (permission.apiPath.includes(':')) {
    const permissionPathParts = permission.apiPath.split('/');
    const endpointPathParts = endpoint.split('/');

    if (permissionPathParts.length !== endpointPathParts.length) {
      return false;
    }

    for (let i = 0; i < permissionPathParts.length; i++) {
      if (permissionPathParts[i].startsWith(':')) {
        continue; // Skip dynamic parts
      }
      if (permissionPathParts[i] !== endpointPathParts[i]) {
        return false;
      }
    }
    return true;
  }

  return false;
}