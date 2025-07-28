export interface EditorBlock {
  id: string;
  type: 'paragraph' | 'heading' | 'list' | 'quote' | 'code';
  content: string;
  level?: number; // for headings
  children?: EditorBlock[];
}

export interface Document {
  id: number;
  title: string;
  content: {
    blocks: EditorBlock[];
  };
  workspaceId: number;
  createdAt: string;
  updatedAt: string;
}

export interface SlashCommand {
  id: string;
  label: string;
  description: string;
  action: () => void;
}