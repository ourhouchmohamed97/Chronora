const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash";

export interface StudyContent {
  summary: {
    title: string;
    overview: string;
    concepts: {
      title: string;
      explanation: string;
    }[];
  };
  studyPlan: {
    totalDays: number;
    days: {
      day: number;
      title: string;
      tasks: {
        id: string;
        type: "read" | "practice" | "review" | "build";
        title: string;
        description: string;
        estimatedMinutes: number;
      }[];
    }[];
  };
  quiz: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // index of correct option
    explanation: string;
  }[];
  flashcards: {
    id: string;
    front: string;
    back: string;
  }[];
}

const SYSTEM_PROMPT = `You are an expert educational content creator. 
When given text from a PDF document, you analyze it and return a structured JSON study package.
You MUST return ONLY valid JSON — no markdown, no backticks, no explanation, just the raw JSON object.`;

const buildUserPrompt = (pdfText: string) => `
Analyze the following document and return a JSON object with this exact structure:

{
  "summary": {
    "title": "document title or topic",
    "overview": "2-3 sentence overview of the entire document",
    "concepts": [
      { "title": "concept name", "explanation": "clear explanation in 2-3 sentences" }
    ]
  },
  "studyPlan": {
    "totalDays": number,
    "days": [
      {
        "day": 1,
        "title": "short title for this day",
        "tasks": [
          {
            "id": "unique string like task-1-1",
            "type": "read" | "practice" | "review" | "build",
            "title": "task title",
            "description": "what exactly to do",
            "estimatedMinutes": number
          }
        ]
      }
    ]
  },
  "quiz": [
    {
      "id": "unique string like q-1",
      "question": "question text",
      "options": ["option A", "option B", "option C", "option D"],
      "correctAnswer": 0,
      "explanation": "why this answer is correct"
    }
  ],
  "flashcards": [
    {
      "id": "unique string like fc-1",
      "front": "term or question",
      "back": "definition or answer"
    }
  ]
}

Rules:
- summary: extract 5-10 key concepts
- studyPlan: create a realistic day-by-day plan (3-7 days depending on content volume). Mix task types: read, practice, review, build
- quiz: generate 8-12 multiple choice questions that test real understanding, not just memorization
- flashcards: generate 10-15 flashcards for key terms and concepts
- Keep language clear and beginner-friendly
- Return ONLY the JSON object, nothing else

Document text:
---
${pdfText.slice(0, 12000)}
---
`;

export async function processDocumentWithAI(pdfText: string): Promise<StudyContent> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set in environment variables.");
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
      "X-Title": "StudyAI",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(pdfText) },
      ],
      temperature: 0.4, // lower = more consistent structured output
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error ${response.status}: ${error}`);
  }

  const data = await response.json();
  const rawContent = data.choices?.[0]?.message?.content;

  if (!rawContent) {
    throw new Error("No content returned from OpenRouter.");
  }

  // Strip markdown code fences if model adds them anyway
  const cleaned = rawContent
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned) as StudyContent;
    return parsed;
  } catch {
    throw new Error("Failed to parse AI response as JSON. Raw: " + cleaned.slice(0, 200));
  }
}