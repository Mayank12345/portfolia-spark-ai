
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const groqApiKey = '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';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeText } = await req.json();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: `You are a resume parser. Extract information from resumes and return ONLY valid JSON in this exact format:
{
  "name": "Full Name",
  "title": "Job Title/Position",
  "summary": "Professional summary or objective",
  "skills": ["skill1", "skill2", "skill3"],
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "years": "2020 - Present",
      "details": "Description of responsibilities and achievements"
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "url": "https://github.com/user/project",
      "description": "Project description"
    }
  ],
  "contactLinks": [
    {
      "type": "Email",
      "url": "mailto:email@example.com"
    },
    {
      "type": "LinkedIn",
      "url": "https://linkedin.com/in/username"
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "degree": "Degree Name",
      "year": "2020"
    }
  ]
}

Return ONLY the JSON, no other text.`
          },
          {
            role: 'user',
            content: `Parse this resume text and extract the information: ${resumeText}`
          }
        ],
        temperature: 0.1,
        max_tokens: 2000
      }),
    });

    const data = await response.json();
    const parsedContent = data.choices[0].message.content;
    
    try {
      const parsedResume = JSON.parse(parsedContent);
      return new Response(JSON.stringify(parsedResume), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      throw new Error('Invalid JSON response from AI');
    }

  } catch (error) {
    console.error('Error in parse-resume function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
