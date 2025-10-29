// A simple markdown parser to format the AI's response safely for HTML.
// It handles specific markdown elements used in the system prompt.
export const formatVibeResult = (text: string): string => {
  const lines = text.split('\n');
  let html = '';
  let inList = false;

  for (const line of lines) {
    // Close list if a non-list item is found
    if (!line.startsWith('- ') && inList) {
      html += '</ul>';
      inList = false;
    }

    if (line.startsWith('### ')) {
      html += `<h3>${line.substring(4)}</h3>`;
    } else if (line.startsWith('- ')) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      // Handle bolding within list items
      const listItem = line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html += `<li>${listItem}</li>`;
    } else {
      if (line.trim() === '') {
        html += '<br/>';
      } else {
        // Handle bolding in regular text
        const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html += `<p>${formattedLine}</p>`;
      }
    }
  }

  // Close any open list at the end of the text
  if (inList) {
    html += '</ul>';
  }

  return html;
};