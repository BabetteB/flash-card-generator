export function parseAssistantResponse(content: string) {
    try {
      const data = JSON.parse(content);
      return data.flashcards || [];
    } catch (e) {
      throw new Error('Assistant response is not valid JSON.');
    }
  }
  