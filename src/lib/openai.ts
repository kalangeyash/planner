import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export type ProjectData = {
  name: string;
  description: string;
  requirements: string[];
  industry: string;
  budget: number;
};

export async function generateProjectInsights(data: ProjectData) {
  try {
    // Get all insights from OpenAI including tech stack
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert software architect and project manager. Your task is to analyze project details and provide insights in a strict JSON format. Do not include any text before or after the JSON. The response must be a valid JSON object that can be parsed directly.

          The JSON should follow this exact structure:
          {
            "roadmap": { 
              "phases": [
                {
                  "phase": "string",
                  "duration": "string",
                  "description": "string",
                  "objectives": ["string"],
                  "deliverables": ["string"],
                  "tasks": [
                    {
                      "name": "string",
                      "description": "string",
                      "duration": "string",
                      "dependencies": ["string"],
                      "resources": ["string"],
                      "acceptance_criteria": ["string"]
                    }
                  ],
                  "risks": ["string"],
                  "success_criteria": ["string"],
                  "next_steps": ["string"]
                }
              ]
            },
            "architecture": {
              "components": ["string"],
              "relationships": ["string"],
              "mermaid": "string"
            },
            "timeline": { 
              "phases": [
                {
                  "name": "string",
                  "duration": "string",
                  "description": "string",
                  "milestones": [
                    {
                      "name": "string",
                      "description": "string",
                      "dependencies": ["string"]
                    }
                  ],
                  "tasks": [
                    {
                      "name": "string",
                      "duration": "string",
                      "description": "string",
                      "dependencies": ["string"]
                    }
                  ]
                }
              ]
            },
            "techStack": { 
              "frontend": ["string"],
              "database": ["string"], 
              "devops": ["string"] 
            },
            "costBreakdown": {
              "development": { "amount": number, "details": ["string"] },
              "infrastructure": { "amount": number, "details": ["string"] },
              "maintenance": { "amount": number, "details": ["string"] },
              "contingency": { "amount": number, "details": ["string"] }
            },
            "team": {
              "roles": ["string"],
              "structure": { 
                "teams": ["string"], 
                "reporting": ["string"] 
              }
            },
            "risks": {
              "technical": ["string"],
              "business": ["string"],
              "operational": ["string"],
              "mitigation": ["string"]
            },
            "successMetrics": {
              "kpis": ["string"],
              "milestones": ["string"],
              "quality": ["string"]
            }
          }

          For the mermaid diagram in the architecture section, use this format:
          graph TD
            A[Component A] --> B[Component B]
            B --> C[Component C]

          Remember: Return ONLY the JSON object, no additional text or explanation.`,
                  },
                  {
                    role: "user",
                    content: `Project Name: ${data.name}
          Description: ${data.description}
          Requirements: ${data.requirements.join(", ")}
          Industry: ${data.industry}
          Budget: $${data.budget}

          Provide the analysis in the specified JSON format.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 3500,
      response_format: { type: "json_object" },
    });

    const messageContent = response.choices[0]?.message?.content;

    if (!messageContent) {
      throw new Error("No content received from OpenAI");
    }

    try {
      const insights = JSON.parse(messageContent);

      // Use API response for all tech stack recommendations
      // insights.techStack already contains frontend, database, and devops from the API

      // Validate the insights structure
      if (!insights.architecture || !insights.roadmap || !insights.techStack) {
        throw new Error("Invalid insights structure: missing required fields");
      }

      return insights;
    } catch (error) {
      console.error("Failed to parse JSON from OpenAI response:", error);
      console.error("Received content:", messageContent);
      throw new Error("Invalid JSON structure in OpenAI response");
    }
  } catch (error) {
    console.error("Error generating project insights:", error);
    throw error;
  }
}
