import { openai } from '../utils/openAIUtils';
import { parseAssistantResponse } from '../utils/parseAssistantResponse';

export const createFlashcards = async (content: string, pdfFile: Express.Multer.File) => {
  const assistantId = process.env.ASSISTANT_ID;
  if (!assistantId) {
    throw new Error('No ASSISTANT_ID found in environment variables.');
  }

  try {
    // 1) Upload the PDF to OpenAI
    const uploadedFile = await openai.files.create({
      file: {
        name: pdfFile.originalname, // Original filename from multer
        data: pdfFile.buffer,       // Buffer data from multer
      },
      purpose: 'assistants', // Ensure the purpose is correctly set
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
      response_format: { type: 'json_object' }, // Request the response in JSON format
    });

    if (run.status !== 'completed') {
      throw new Error(`Run did not complete. Status: ${run.status}`);
    }

    // 4) Retrieve the final assistant message
    const finalAssistantMessage = run.result.message;

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
