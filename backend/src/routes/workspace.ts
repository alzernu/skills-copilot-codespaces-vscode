import express from 'express';

const router = express.Router();

// Placeholder workspace storage
const workspaces: any[] = [
  {
    id: 1,
    name: 'Default Workspace',
    description: 'Your personal workspace',
    createdAt: new Date(),
    members: []
  }
];

// Get all workspaces
router.get('/', (req, res) => {
  res.json({ workspaces });
});

// Get workspace by ID
router.get('/:id', (req, res) => {
  const workspace = workspaces.find(ws => ws.id === parseInt(req.params.id));
  if (!workspace) {
    return res.status(404).json({ message: 'Workspace not found' });
  }
  res.json({ workspace });
});

// Create new workspace
router.post('/', (req, res) => {
  const { name, description } = req.body;
  
  const workspace = {
    id: workspaces.length + 1,
    name: name || 'New Workspace',
    description: description || '',
    createdAt: new Date(),
    members: []
  };
  
  workspaces.push(workspace);
  res.status(201).json({ workspace });
});

// Update workspace
router.put('/:id', (req, res) => {
  const workspaceIndex = workspaces.findIndex(ws => ws.id === parseInt(req.params.id));
  if (workspaceIndex === -1) {
    return res.status(404).json({ message: 'Workspace not found' });
  }
  
  const { name, description } = req.body;
  workspaces[workspaceIndex] = {
    ...workspaces[workspaceIndex],
    name: name || workspaces[workspaceIndex].name,
    description: description || workspaces[workspaceIndex].description,
    updatedAt: new Date()
  };
  
  res.json({ workspace: workspaces[workspaceIndex] });
});

// Delete workspace
router.delete('/:id', (req, res) => {
  const workspaceIndex = workspaces.findIndex(ws => ws.id === parseInt(req.params.id));
  if (workspaceIndex === -1) {
    return res.status(404).json({ message: 'Workspace not found' });
  }
  
  workspaces.splice(workspaceIndex, 1);
  res.json({ message: 'Workspace deleted successfully' });
});

// Add member to workspace
router.post('/:id/members', (req, res) => {
  const workspace = workspaces.find(ws => ws.id === parseInt(req.params.id));
  if (!workspace) {
    return res.status(404).json({ message: 'Workspace not found' });
  }
  
  const { userId, role = 'member' } = req.body;
  
  const member = {
    userId,
    role,
    joinedAt: new Date()
  };
  
  workspace.members.push(member);
  res.json({ workspace });
});

export default router;