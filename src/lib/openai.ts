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
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert software architect and project manager. Analyze the project details and provide comprehensive insights including roadmap, architecture, timeline, tech stack recommendations, cost breakdown, team composition, risk assessment, and success metrics.

For the roadmap section, provide detailed phases with the following structure for each phase:
{
  "phase": "Phase Name",
  "duration": "X weeks/months",
  "description": "Overall phase description",
  "objectives": ["List of specific objectives for this phase"],
  "deliverables": ["List of concrete deliverables"],
  "tasks": [
    {
      "name": "Task name",
      "description": "Detailed task description",
      "duration": "X days/weeks",
      "dependencies": ["List of tasks this depends on"],
      "resources": ["Required resources/team members"],
      "acceptance_criteria": ["List of criteria for task completion"]
    }
  ],
  "risks": ["Phase-specific risks"],
  "success_criteria": ["How to measure phase success"],
  "next_steps": ["What needs to be prepared for the next phase"]
}



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
      const insights = JSON.parse(jsonString);
      
      // Validate the insights structure
      if (!insights.architecture || !insights.roadmap || !insights.techStack) {
        throw new Error('Invalid insights structure: missing required fields');
      }
      
      return insights;
    } catch (error) {
      console.error('Failed to parse JSON from OpenAI response:', error);
      console.error('Received content:', messageContent);
      throw new Error('Invalid JSON structure in OpenAI response');
    }
  } catch (error) {
    console.error('Error generating project insights:', error);
    throw error;
  }
}