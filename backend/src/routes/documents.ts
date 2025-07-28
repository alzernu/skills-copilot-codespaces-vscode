import express from 'express';

const router = express.Router();

// Placeholder document storage
const documents: any[] = [];

// Get all documents
router.get('/', (req, res) => {
  res.json({ documents });
});

// Get document by ID
router.get('/:id', (req, res) => {
  const document = documents.find(doc => doc.id === parseInt(req.params.id));
  if (!document) {
    return res.status(404).json({ message: 'Document not found' });
  }
  res.json({ document });
});

// Create new document
router.post('/', (req, res) => {
  const { title, content, workspaceId } = req.body;
  
  const document = {
    id: documents.length + 1,
    title: title || 'Untitled',
    content: content || { blocks: [] },
    workspaceId: workspaceId || 1,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  documents.push(document);
  res.status(201).json({ document });
});

// Update document
router.put('/:id', (req, res) => {
  const documentIndex = documents.findIndex(doc => doc.id === parseInt(req.params.id));
  if (documentIndex === -1) {
    return res.status(404).json({ message: 'Document not found' });
  }
  
  const { title, content } = req.body;
  documents[documentIndex] = {
    ...documents[documentIndex],
    title: title || documents[documentIndex].title,
    content: content || documents[documentIndex].content,
    updatedAt: new Date()
  };
  
  res.json({ document: documents[documentIndex] });
});

// Delete document
router.delete('/:id', (req, res) => {
  const documentIndex = documents.findIndex(doc => doc.id === parseInt(req.params.id));
  if (documentIndex === -1) {
    return res.status(404).json({ message: 'Document not found' });
  }
  
  documents.splice(documentIndex, 1);
  res.json({ message: 'Document deleted successfully' });
});

export default router;