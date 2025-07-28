import React, { useState } from 'react';
import type { EditorBlock } from '../../types/editor';

const Editor: React.FC = () => {
  const [blocks, setBlocks] = useState<EditorBlock[]>([
    {
      id: '1',
      type: 'paragraph',
      content: 'Welcome to Notion AI! Start typing here...',
    },
  ]);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 });
  const [currentBlockId, setCurrentBlockId] = useState<string>('');

  const slashCommands = [
    { id: 'heading1', label: 'Heading 1', description: 'Big section heading' },
    { id: 'heading2', label: 'Heading 2', description: 'Medium section heading' },
    { id: 'paragraph', label: 'Paragraph', description: 'Just start writing' },
    { id: 'quote', label: 'Quote', description: 'Capture a quote' },
    { id: 'code', label: 'Code', description: 'Capture a code snippet' },
  ];

  const handleKeyDown = (e: React.KeyboardEvent, blockId: string) => {
    if (e.key === '/') {
      // Show slash menu
      setTimeout(() => {
        const rect = e.currentTarget.getBoundingClientRect();
        setSlashMenuPosition({ x: rect.left, y: rect.bottom });
        setCurrentBlockId(blockId);
        setShowSlashMenu(true);
      }, 0);
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      createNewBlock(blockId);
    } else if (e.key === 'Escape') {
      setShowSlashMenu(false);
    }
  };

  const handleContentChange = (blockId: string, content: string) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId 
        ? { ...block, content }
        : block
    ));

    // Hide slash menu if content doesn't start with /
    if (!content.startsWith('/')) {
      setShowSlashMenu(false);
    }
  };

  const createNewBlock = (afterBlockId: string) => {
    const newBlock: EditorBlock = {
      id: Date.now().toString(),
      type: 'paragraph',
      content: '',
    };

    setBlocks(prev => {
      const index = prev.findIndex(block => block.id === afterBlockId);
      const newBlocks = [...prev];
      newBlocks.splice(index + 1, 0, newBlock);
      return newBlocks;
    });
  };

  const executeSlashCommand = (commandId: string) => {
    const block = blocks.find(b => b.id === currentBlockId);
    if (!block) return;

    let updatedBlock = { ...block };
    
    switch (commandId) {
      case 'heading1':
        updatedBlock.type = 'heading';
        updatedBlock.level = 1;
        updatedBlock.content = block.content.replace('/', '');
        break;
      case 'heading2':
        updatedBlock.type = 'heading';
        updatedBlock.level = 2;
        updatedBlock.content = block.content.replace('/', '');
        break;
      case 'paragraph':
        updatedBlock.type = 'paragraph';
        updatedBlock.content = block.content.replace('/', '');
        break;
      case 'quote':
        updatedBlock.type = 'quote';
        updatedBlock.content = block.content.replace('/', '');
        break;
      case 'code':
        updatedBlock.type = 'code';
        updatedBlock.content = block.content.replace('/', '');
        break;
    }

    setBlocks(prev => prev.map(b => b.id === currentBlockId ? updatedBlock : b));
    setShowSlashMenu(false);
  };

  const renderBlock = (block: EditorBlock) => {
    const baseClasses = "w-full border-none outline-none resize-none min-h-[1.5rem] bg-transparent";
    
    switch (block.type) {
      case 'heading':
        const headingSize = block.level === 1 ? 'text-3xl font-bold' : 'text-2xl font-semibold';
        return (
          <textarea
            key={block.id}
            className={`${baseClasses} ${headingSize} text-gray-900`}
            value={block.content}
            onChange={(e) => handleContentChange(block.id, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, block.id)}
            placeholder={`Heading ${block.level}`}
            rows={1}
          />
        );
      case 'quote':
        return (
          <textarea
            key={block.id}
            className={`${baseClasses} italic border-l-4 border-gray-300 pl-4 text-gray-700`}
            value={block.content}
            onChange={(e) => handleContentChange(block.id, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, block.id)}
            placeholder="Quote"
            rows={1}
          />
        );
      case 'code':
        return (
          <textarea
            key={block.id}
            className={`${baseClasses} font-mono bg-gray-100 p-3 rounded-md text-sm`}
            value={block.content}
            onChange={(e) => handleContentChange(block.id, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, block.id)}
            placeholder="Code"
            rows={1}
          />
        );
      default:
        return (
          <textarea
            key={block.id}
            className={`${baseClasses} text-gray-900`}
            value={block.content}
            onChange={(e) => handleContentChange(block.id, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, block.id)}
            placeholder="Type '/' for commands"
            rows={1}
          />
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-8 min-h-[600px]">
        <div className="space-y-4">
          {blocks.map(block => (
            <div key={block.id} className="relative">
              {renderBlock(block)}
            </div>
          ))}
        </div>

        {/* Slash Command Menu */}
        {showSlashMenu && (
          <div
            className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-64"
            style={{ top: slashMenuPosition.y, left: slashMenuPosition.x }}
          >
            {slashCommands.map(command => (
              <button
                key={command.id}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex flex-col"
                onClick={() => executeSlashCommand(command.id)}
              >
                <span className="font-medium text-gray-900">{command.label}</span>
                <span className="text-sm text-gray-500">{command.description}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* AI Actions Panel */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">AI Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="text-sm font-medium">Summarize</div>
            <div className="text-xs text-gray-500">Get a summary</div>
          </button>
          <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="text-sm font-medium">Generate</div>
            <div className="text-xs text-gray-500">Create content</div>
          </button>
          <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="text-sm font-medium">Translate</div>
            <div className="text-xs text-gray-500">Change language</div>
          </button>
          <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="text-sm font-medium">Ask AI</div>
            <div className="text-xs text-gray-500">Get answers</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;