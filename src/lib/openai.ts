import OpenAI from 'openai';

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
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an expert software architect and project manager. Analyze the project details and provide comprehensive insights including roadmap, architecture, timeline, tech stack recommendations, cost breakdown, team composition, risk assessment, and success metrics.

For the architecture section, provide a Mermaid diagram code that visualizes the system architecture. The diagram should:
1. Use appropriate Mermaid syntax for system architecture
2. Include all major components and their relationships
3. Use clear and descriptive labels
4. Follow Mermaid best practices for readability

Example format for architecture:
{
  "architecture": {
    "components": [...],
    "relationships": [...],
    "mermaid": "graph TD\n  A[Component A] --> B[Component B]\n  B --> C[Component C]"
  }
}`
      },
      {
        role: "user",
        content: `Project Name: ${data.name}
Description: ${data.description}
Requirements: ${data.requirements.join(', ')}
Industry: ${data.industry}
Budget: $${data.budget}

Please provide detailed analysis in JSON format with the following structure:
{
  "roadmap": { "phases": [] },
  "architecture": {
    "components": [],
    "relationships": [],
    "mermaid": ""
  },
  "timeline": { "milestones": [] },
  "techStack": { "frontend": [], "backend": [], "database": [], "devops": [] },
  "costBreakdown": {
    "development": { "amount": 0, "details": [] },
    "infrastructure": { "amount": 0, "details": [] },
    "maintenance": { "amount": 0, "details": [] },
    "contingency": { "amount": 0, "details": [] }
  },
  "team": {
    "roles": [],
    "structure": { "teams": [], "reporting": [] }
  },
  "risks": {
    "technical": [],
    "business": [],
    "operational": [],
    "mitigation": []
  },
  "successMetrics": {
    "kpis": [],
    "milestones": [],
    "quality": []
  }
}`
      }
    ],
    temperature: 0.7,
    max_tokens: 2500,
  });

  const messageContent = response.choices[0]?.message?.content;

  if (!messageContent) {
    throw new Error('No content received from OpenAI');
  }

  // Extract JSON from code block if present
  const match = messageContent.match(/```json\s*([\s\S]+?)\s*```/);
  const jsonString = match ? match[1] : messageContent;

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to parse JSON from OpenAI response:', error);
    console.error('Received content:', messageContent);
    throw new Error('Invalid JSON structure in OpenAI response');
  }
}