import { GoogleGenAI, Modality } from "@google/genai";
import { Poem, Language } from "../types";

const getSystemInstruction = (lang: Language) => {
  const instructions = {
    pt: `Você é um especialista profundo e filosófico na obra 'A Gaia Ciência' de Friedrich Nietzsche.
         Você deve responder no idioma Português do Brasil.
         Adote um tom levemente poético, mas claro e direto, similar ao estilo de Zaratustra, mas acessível.
         Se o usuário perguntar sobre um poema específico, analise suas rimas (se houver), métrica e significado filosófico profundo.
         Evite alucinações. Baseie-se no texto fornecido.`,
    en: `You are a profound and philosophical expert on Friedrich Nietzsche's 'The Gay Science'.
         You must respond in English.
         Adopt a tone that is slightly poetic but clear and direct, similar to Zarathustra's style, but accessible.
         If the user asks about a specific poem, analyze its rhymes, meter, and deep philosophical meaning.
         Avoid hallucinations. Base your answers on the provided text.`,
    es: `Eres un experto profundo y filosófico en la obra 'La Gaya Ciencia' de Friedrich Nietzsche.
         Debes responder en Español.
         Adopta un tono ligeramente poético pero claro y directo, similar al estilo de Zaratustra, pero accesible.
         Si el usuario pregunta sobre un poema específico, analiza sus rimas, métrica y significado filosófico profundo.
         Evita alucinaciones. Básate en el texto proporcionado.`
  };
  return instructions[lang];
};

export const generatePoemAnalysis = async (poem: Poem, question: string, lang: Language): Promise<string> => {
  if (!process.env.API_KEY) {
    console.error("API Key missing");
    return "Error: API Key not configured.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const context = `
    Contexto do Poema (Poem Context):
    Original German: ${poem.originalGerman}
    Translation (${lang}): ${poem.content[lang]}
    Title: ${poem.title[lang]}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${context}\n\nUser Question: ${question}`,
      config: {
        systemInstruction: getSystemInstruction(lang),
        temperature: 0.7,
      }
    });

    return response.text || "O abismo olhou de volta e não disse nada. (Erro ao gerar resposta)";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ocorreu um erro ao consultar os oráculos digitais.";
  }
};

export const generatePoemPodcast = async (poem: Poem, lang: Language): Promise<string | null> => {
  if (!process.env.API_KEY) {
    console.error("API Key missing");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompts = {
    pt: `Você é um filósofo narrador brasileiro. Crie um resumo em áudio de 1 minuto falando em Português do Brasil, explicando a essência e a beleza do poema "${poem.title.pt}" de Nietzsche.
         Fale diretamente com o ouvinte com uma voz calma, profunda e reflexiva.
         Conteúdo do poema: "${poem.content.pt}".
         Não leia apenas o poema, explique seu significado existencial e filosófico de forma resumida e impactante.`,
    en: `You are a philosophical narrator. Create a 1-minute audio summary explaining the essence and beauty of Nietzsche's poem "${poem.title.en}".
         Speak directly to the listener with a calm, profound, and reflective voice.
         Poem content: "${poem.content.en}".
         Do not just read the poem, explain its existential and philosophical meaning in a summarized, impactful way.`,
    es: `Eres un narrador filosófico. Crea un resumen de audio de 1 minuto explicando la esencia y la belleza del poema "${poem.title.es}" de Nietzsche.
         Habla directamente al oyente con una voz tranquila, profunda y reflexiva.
         Contenido del poema: "${poem.content.es}".
         No leas solo el poema, explica su significado existencial y filosófico de forma resumida e impactante.`
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-native-audio-preview-09-2025', 
      contents: prompts[lang],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Puck' }, 
          },
        },
      },
    });

    // Extract base64 audio data
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (error) {
    console.error("Gemini Audio Error:", error);
    return null;
  }
};

export const generatePoemArt = async (poem: Poem, style: string, lang: Language): Promise<string | null> => {
  if (!process.env.API_KEY) {
    console.error("API Key missing");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Construct a vivid prompt for image generation
  const prompt = `Create a masterpiece, high-quality, artistic image based on Friedrich Nietzsche's poem titled "${poem.title.en}".
  
  The image should visually interpret this meaning: "${poem.content.en}".
  
  The art style must be: ${style}.
  
  Mood: Philosophical, profound, slightly dark but with golden accents, symbolic.
  No text in the image.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData) {
          const base64String = part.inlineData.data;
          // Return the full data URL
          return `data:${part.inlineData.mimeType};base64,${base64String}`;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    return null;
  }
};

export const generateInfographic = async (poem: Poem, lang: Language): Promise<string | null> => {
  if (!process.env.API_KEY) {
    console.error("API Key missing");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const title = poem.title[lang];
  const content = poem.content[lang];

  let prompt = "";

  if (lang === 'pt') {
    prompt = `Crie um infográfico visual vertical, rico e detalhado, que explique os conceitos filosóficos do poema "${title}" de Friedrich Nietzsche.
    
    Conteúdo do Poema: "${content}"
    
    REGRAS RÍGIDAS DE IDIOMA:
    1. OBRIGATÓRIO: Todo o texto visível na imagem DEVE estar em PORTUGUÊS DO BRASIL.
    2. NÃO use inglês.
    3. Inclua o título "${title}" no topo.
    4. Identifique 3 a 4 conceitos-chave (ex: Amor Fati, Vontade, Coragem) e escreva os rótulos em Português.
    
    Estilo Visual:
    - Fundo: Preto Obsidiana (escuro e profundo).
    - Elementos: Dourado Metálico.
    - Estilo: Diagrama místico e estruturado, conectando os conceitos com linhas finas e geometria sagrada.
    - Tipografia: Serifada, elegante, legível e dourada.
    
    O resultado deve parecer uma página de um grimório filosófico moderno ou um diagrama de alta qualidade com texto em português.`;

  } else if (lang === 'es') {
    prompt = `Crea una infografía visual vertical, rica y detallada, que explique los conceptos filosóficos del poema "${title}" de Friedrich Nietzsche.
    
    Contenido del Poema: "${content}"
    
    REGLAS DE IDIOMA:
    1. OBLIGATORIO: Todo el texto visible en la imagen DEBE estar en ESPAÑOL.
    2. NO uses inglés.
    3. Incluye el título "${title}" en la parte superior.
    4. Identifica 3 o 4 conceptos clave y escribe las etiquetas claramente en Español.
    
    Estilo Visual:
    - Fondo: Negro Obsidiana.
    - Elementos: Dorado Metálico.
    - Estilo: Diagrama místico y estructurado, conectando conceptos con líneas finas y geometría sagrada.
    - Tipografía: Serif, elegante, legible y dorada.`;

  } else {
    // English (Default)
    prompt = `Create a vertical, rich, and detailed visual infographic explaining the philosophical concepts of Friedrich Nietzsche's poem "${title}".
    
    Poem Content: "${content}"
    
    LANGUAGE RULES:
    1. MANDATORY: All visible text MUST be in ENGLISH.
    2. Include the title "${title}" at the top.
    3. Identify 3 to 4 key concepts and label them clearly in English.
    
    Visual Style:
    - Background: Obsidian Black.
    - Elements: Metallic Gold.
    - Style: Mystical and structured diagram, connecting concepts with fine lines and sacred geometry.
    - Typography: Serif, elegant, readable, and golden.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData) {
          const base64String = part.inlineData.data;
          return `data:${part.inlineData.mimeType};base64,${base64String}`;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Gemini Infographic Gen Error:", error);
    return null;
  }
};
