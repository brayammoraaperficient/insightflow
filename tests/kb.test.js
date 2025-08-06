const { retrieveKBContext } = require('../controllers/kb');

describe('Knowledge Base Retrieval', () => {
  it('should retrieve context for known product query', () => {
    const msg = 'How do I upload data?';
    const context = retrieveKBContext(msg);
    expect(context).toMatch(/upload data/i);
    expect(context).toMatch(/CSV/i);
  });

  it('should return empty string for unknown query', () => {
    const msg = 'What is the weather today?';
    const context = retrieveKBContext(msg);
    expect(context).toBe('');
  });
});
