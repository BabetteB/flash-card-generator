import { openai } from '../utils/openAIUtils';
import { parseAssistantResponse } from '../utils/parseAssistantResponse';
import { File } from 'node-fetch'; // Import File from node-fetch

export const createFlashcards = async (content: string, pdfFile: Express.Multer.File) => {
  const assistantId = process.env.ASSISTANT_ID;
  if (!assistantId) {
    throw new Error('No ASSISTANT_ID found in environment variables.');
  }

  try {
    // Create a File object from the buffer
    const file = new File([pdfFile.buffer], pdfFile.originalname, {
      type: pdfFile.mimetype,
      lastModified: Date.now(),
    });

    const uploadedFile = await openai.files.create({
      file: file, // Pass the File object
      purpose: 'assistants',
    });

    // 2) Create a Thread with an initial user message
    const thread = await openai.beta.threads.create({
      messages: [
        {
          role: 'user',
          content: `Please generate flashcards from this PDF. Please cover all subjects`,
          attachments: [
            {
              file_id: uploadedFile.id,
              tools: [{ type: 'file_search' }], // Use 'file_search' for file-related tasks
            },
          ],
        },
      ],
    });

    // 3) Create a Run and poll until it completes
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistantId,
      response_format: { type: 'json_object' },
    }) as any;
    
    if (run.status !== 'completed') {
      throw new Error(`Run did not complete. Status: ${run.status}`);
    }
    
    const finalAssistantMessage = run.result?.message;
    
    if (!finalAssistantMessage) {
      throw new Error('No final assistant message found.');
    }

    // 5) Parse the response as JSON
    let flashcards = [];
    try {
      if (finalAssistantMessage.content) {
        const parsed = JSON.parse(finalAssistantMessage.content);
        if (parsed && parsed.flashcards) {
          flashcards = parsed.flashcards;
        }
      }
    } catch (err) {
      console.error('Assistant response is not valid JSON:', finalAssistantMessage.content);
      throw new Error('Assistant did not return valid JSON.');
    }

    return flashcards;
  } catch (err) {
    console.error('Error creating flashcards:', err);
    throw err;
  }
};
