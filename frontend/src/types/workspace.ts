export interface Workspace {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  members: WorkspaceMember[];
}

export interface WorkspaceMember {
  userId: number;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
}