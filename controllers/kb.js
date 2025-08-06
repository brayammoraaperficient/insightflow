const fs = require('fs');
const path = require('path');

// Simple keyword-based retrieval from kb.json
function retrieveKBContext(userMessage) {
  const kbPath = path.join(__dirname, '../kb.json');
  let kb;
  try {
    kb = JSON.parse(fs.readFileSync(kbPath, 'utf8'));
  } catch (err) {
    return '';
  }
  // Find KB entries where the question matches non-empty keywords in the user message
  const keywords = userMessage.toLowerCase().split(/\W+/).filter(Boolean);
  const matches = kb.filter(entry => {
    // Only match if ALL keywords are present in the question
    return keywords.length > 0 && keywords.every(kw => entry.question.toLowerCase().includes(kw));
  });
  if (matches.length === 0) return '';
  // Concatenate answers for context
  return matches.map(m => `Q: ${m.question}\nA: ${m.answer}`).join('\n');
}

module.exports = { retrieveKBContext };
