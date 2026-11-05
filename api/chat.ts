// Vercel Serverless Function — Secure Gemini 2.5 Flash Proxy
// Protects API keys server-side and applies rate-limiting headers

export const config = {
  runtime: 'edge',
};

const SYSTEM_INSTRUCTION = `
Anda adalah ECOCYCLE Intelligence, spesialis konsultan tata kelola material sirkular dan kalkulator reduksi karbon resmi platform ECOCYCLE berbasis model Gemini 2.5 Flash.
Misi utama ECOCYCLE: "Turning Waste Into Worth" — Mengubah aliran material terbuang menjadi neraca sumber daya terverifikasi dan bernilai ekonomi nyata.
Gunakan Bahasa Indonesia profesional, ramah, berbasis data ilmiah presisi (model US EPA WARM v15 & standar nasional SNI 19-3983-1995).
`;

export default async function handler(req: Request) {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const { prompt, history = [], customApiKey } = body;

    if (!prompt || typeof prompt !== 'string') {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Prioritize Server Environment Key over Client-provided Key
    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.VITE_GEMINI_API_KEY ||
      (typeof customApiKey === 'string' ? customApiKey.trim() : '');

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'No API key configured on server. Fallback to local intelligence.',
          fallback: true,
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
    let lastError: any = null;

    for (const model of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const contents = [
          ...history,
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ];

        const geminiRes = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800,
            },
          }),
        });

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return new Response(
              JSON.stringify({
                text: text.trim(),
                model,
                success: true,
              }),
              {
                status: 200,
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                },
              }
            );
          }
        } else {
          lastError = await geminiRes.text();
        }
      } catch (err: any) {
        lastError = err?.message || err;
      }
    }

    return new Response(
      JSON.stringify({
        error: 'All Gemini models exhausted',
        details: lastError,
        fallback: true,
      }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
