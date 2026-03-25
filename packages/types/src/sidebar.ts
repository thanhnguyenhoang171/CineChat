export interface Item {
  id: string;
  title: string;
  url: string;
  icon?: any;
  isActive?: boolean;
  items?: Item[];
}

export interface Category {
  id: string;
  title: string;
  url: string;
  icon: any;
  isActive?: boolean;
  items?: Item[];
}

export interface Workspace {
  id: string;
  name: string;
  url: string;
  logo?: any;
  icon?: any;
  plan: string;
  title: string;
}

// Chuyển sang export interface/type thay vì gán giá trị rỗng để tránh lỗi khi dùng trong Constant
export type MainNav = (Item | Category)[];
export type Workspaces = Workspace[];
