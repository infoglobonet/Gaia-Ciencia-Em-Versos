import { Poem, BlogPost, Language } from './types';

export const UI_LABELS = {
  pt: {
    title: "A Gaia Ciência",
    subtitle: "Scherz, List und Rache",
    poems: "Poemas",
    blog: "Blog",
    join: "Junte-se",
    askAI: "Perguntar à IA",
    export: "Exportar",
    exportChat: "Salvar Diálogo",
    copy: "Copiar",
    copied: "Copiado!",
    share: "Compartilhar",
    readMore: "Ler Poema",
    readArticle: "Ler Artigo",
    back: "Voltar",
    aiPlaceholder: "Pergunte sobre o significado deste poema...",
    loading: "Pensando...",
    footerQuote: "Viver perigosamente. Construam suas cidades nas encostas do Vesúvio!",
    chatTitle: "Nietzsche AI",
    chatIntro: "Olá. Sou um eco digital de Friedrich Nietzsche. O que perturba teu espírito sobre estes versos?",
    audio: {
      button: "Resumo em Áudio",
      generating: "Sintetizando Voz...",
      download: "Baixar Resumo",
      listen: "Ouvir Resumo",
      title: "Resumo Filosófico"
    },
    categories: {
      all: "Todos",
      wisdom: "Sabedoria Prática",
      life_fate: "Vida e Destino",
      art_truth: "Arte e Verdade",
      morality_critique: "Crítica Moral"
    },
    register: {
      title: "Junte-se aos Espíritos Livres",
      subtitle: "Inscreva-se para receber atualizações e compartilhar sua jornada.",
      name: "Nome ou Pseudônimo",
      email: "Correio Eletrônico",
      link: "Seu Link (Site/Social)",
      archetype: "Seu Arquétipo",
      submit: "Tornar-se Membro",
      successTitle: "Bem-vindo ao Círculo",
      successDesc: "Sua vontade de potência foi registrada.",
      memberSince: "Membro desde",
      id: "ID do Espírito Livre",
      verification: {
        title: "Confirme seu Email",
        sentTo: "Um corvo mensageiro foi enviado para",
        instruction: "Verifique sua caixa de entrada e clique no link de confirmação para ativar seu ID.",
        spam: "Não esqueça de verificar a caixa de spam.",
        button: "Simular Confirmação",
        resend: "Reenviar Email"
      }
    },
    art: {
      title: "Seu Brinde de Leitura",
      subtitle: "Transforme este poema em uma visão eterna.",
      selectStyle: "Escolha o Estilo Artístico",
      generate: "Materializar Visão",
      generating: "Pintando o Abismo...",
      download: "Guardar Obra",
      styles: {
        surrealism: "Surrealismo Onírico",
        expressionism: "Expressionismo Alemão",
        oil: "Óleo Clássico Renascentista",
        oil_expressive: "Pintura a Óleo Expressiva",
        sketch: "Esboço a Carvão",
        cyberpunk: "Futurismo Distópico"
      }
    },
    infographic: {
      title: "Mapa Visual de Conceitos",
      subtitle: "Um diagrama simbólico das ideias centrais do poema.",
      generate: "Gerar Infográfico",
      button: "Infográfico",
      generating: "Estruturando Conceitos...",
      download: "Baixar Mapa",
      share: "Compartilhar",
      note: "Gera uma representação visual estruturada e simbólica."
    },
    chat: {
      shareResponse: "Compartilhar Reflexão",
      responseCopied: "Reflexão copiada!"
    }
  },
  en: {
    title: "The Gay Science",
    subtitle: "Joke, Cunning and Revenge",
    poems: "Poems",
    blog: "Blog",
    join: "Join Us",
    askAI: "Ask AI",
    export: "Export",
    exportChat: "Save Dialogue",
    copy: "Copy",
    copied: "Copied!",
    share: "Share",
    readMore: "Read Poem",
    readArticle: "Read Article",
    back: "Back",
    aiPlaceholder: "Ask about the meaning of this poem...",
    loading: "Thinking...",
    footerQuote: "Live dangerously. Build your cities on the slopes of Vesuvius!",
    chatTitle: "Nietzsche AI",
    chatIntro: "Hello. I am a digital echo of Friedrich Nietzsche. What troubles your spirit regarding these verses?",
    audio: {
      button: "Audio Summary",
      generating: "Synthesizing Voice...",
      download: "Download Summary",
      listen: "Listen to Summary",
      title: "Philosophical Summary"
    },
    categories: {
      all: "All",
      wisdom: "Practical Wisdom",
      life_fate: "Life & Fate",
      art_truth: "Art & Truth",
      morality_critique: "Moral Critique"
    },
    register: {
      title: "Join the Free Spirits",
      subtitle: "Sign up to receive updates and share your journey.",
      name: "Name or Pseudonym",
      email: "Electronic Mail",
      link: "Your Link (Site/Social)",
      archetype: "Your Archetype",
      submit: "Become a Member",
      successTitle: "Welcome to the Circle",
      successDesc: "Your will to power has been registered.",
      memberSince: "Member since",
      id: "Free Spirit ID",
      verification: {
        title: "Confirm your Email",
        sentTo: "A messenger raven has been sent to",
        instruction: "Check your inbox and click the confirmation link to activate your ID.",
        spam: "Don't forget to check your spam folder.",
        button: "Simulate Confirmation",
        resend: "Resend Email"
      }
    },
    art: {
      title: "Your Reading Gift",
      subtitle: "Transform this poem into an eternal vision.",
      selectStyle: "Choose Art Style",
      generate: "Materialize Vision",
      generating: "Painting the Abyss...",
      download: "Keep Artwork",
      styles: {
        surrealism: "Dreamlike Surrealism",
        expressionism: "German Expressionism",
        oil: "Classic Renaissance Oil",
        oil_expressive: "Expressive Oil Painting",
        sketch: "Charcoal Sketch",
        cyberpunk: "Dystopian Futurism"
      }
    },
    infographic: {
      title: "Visual Concept Map",
      subtitle: "A symbolic diagram of the poem's central ideas.",
      generate: "Generate Infographic",
      button: "Infographic",
      generating: "Structuring Concepts...",
      download: "Download Map",
      share: "Share",
      note: "Generates a structured and symbolic visual representation."
    },
    chat: {
      shareResponse: "Share Reflection",
      responseCopied: "Reflection copied!"
    }
  },
  es: {
    title: "La Gaya Ciencia",
    subtitle: "Broma, Astucia y Venganza",
    poems: "Poemas",
    blog: "Blog",
    join: "Únete",
    askAI: "Preguntar a la IA",
    export: "Exportar",
    exportChat: "Guardar Diálogo",
    copy: "Copiar",
    copied: "¡Copiado!",
    share: "Compartir",
    readMore: "Leer Poema",
    readArticle: "Leer Artículo",
    back: "Volver",
    aiPlaceholder: "Pregunta sobre el significado de este poema...",
    loading: "Pensando...",
    footerQuote: "¡Vivid peligrosamente! ¡Construid vuestras ciudades en las laderas del Vesubio!",
    chatTitle: "Nietzsche IA",
    chatIntro: "Hola. Soy un eco digital de Friedrich Nietzsche. ¿Qué perturba tu espíritu sobre estos versos?",
    audio: {
      button: "Resumen de Audio",
      generating: "Sintetizando Voz...",
      download: "Descargar Resumen",
      listen: "Escuchar Resumen",
      title: "Resumen Filosófico"
    },
    categories: {
      all: "Todos",
      wisdom: "Sabiduría Práctica",
      life_fate: "Vida y Destino",
      art_truth: "Arte y Verdad",
      morality_critique: "Crítica Moral"
    },
    register: {
      title: "Únete a los Espíritus Libres",
      subtitle: "Regístrate para recibir actualizaciones y compartir tu viaje.",
      name: "Nombre o Seudónimo",
      email: "Correo Electrónico",
      link: "Tu Enlace (Sitio/Social)",
      archetype: "Tu Arquetipo",
      submit: "Convertirse en Miembro",
      successTitle: "Bienvenido al Círculo",
      successDesc: "Tu voluntad de poder ha sido registrada.",
      memberSince: "Miembro desde",
      id: "ID de Espíritu Libre",
      verification: {
        title: "Confirma tu Correo",
        sentTo: "Un cuervo mensajero ha sido enviado a",
        instruction: "Revisa tu bandeja de entrada y haz clic en el enlace de confirmación para activar tu ID.",
        spam: "No olvides revisar tu carpeta de spam.",
        button: "Simular Confirmación",
        resend: "Reenviar Correo"
      }
    },
    art: {
      title: "Tu Regalo de Lectura",
      subtitle: "Transforma este poema en una visión eterna.",
      selectStyle: "Elige Estilo Artístico",
      generate: "Materializar Visión",
      generating: "Pintando el Abismo...",
      download: "Guardar Obra",
      styles: {
        surrealism: "Surrealismo Onírico",
        expressionism: "Expresionismo Alemán",
        oil: "Óleo Renacentista Clásico",
        oil_expressive: "Pintura al Óleo Expresiva",
        sketch: "Boceto al Carbón",
        cyberpunk: "Futurismo Distópico"
      }
    },
    infographic: {
      title: "Mapa Visual de Conceptos",
      subtitle: "Un diagrama simbólico de las ideas centrales del poema.",
      generate: "Generar Infografía",
      button: "Infografía",
      generating: "Estructurando Conceptos...",
      download: "Descargar Mapa",
      share: "Compartir",
      note: "Genera una representación visual estructurada y simbólica."
    },
    chat: {
      shareResponse: "Compartir Reflexión",
      responseCopied: "¡Reflexión copiada!"
    }
  }
};

// Sample of the 63 poems (Scherz, List und Rache)
export const POEMS: Poem[] = [
  {
    id: 1,
    category: 'wisdom',
    title: {
      pt: "Convite",
      en: "Invitation",
      es: "Invitación"
    },
    originalGerman: "Wagt's mit meiner Kost, ihr Esser!\nMorgen schmeckt sie euch schon besser\nUnd schon übermorgen gut!\nWollt ihr dann noch mehr davon,\nSo werden meine alten sieben\nSätze mir vorlieb: Mut!",
    content: {
      pt: "Arriscai provar minha comida, comilões!\nAmanhã ela vos saberá melhor,\nE depois de amanhã, boa!\nSe quiserdes então mais,\nEntão as minhas velhas sete\nSentenças me bastarão: Coragem!",
      en: "Venture with my food, you eaters!\nTomorrow it will taste better to you,\nAnd the day after tomorrow, good!\nIf you then want more of it,\nThen my old seven\nSentences will suffice me: Courage!",
      es: "¡Atreveos con mi comida, comedores!\nMañana os sabrá mejor\nY pasado mañana, ¡buena!\nSi queréis entonces más,\nEntonces mis viejas siete\nSentencias me bastarán: ¡Coraje!"
    }
  },
  {
    id: 2,
    category: 'life_fate',
    title: {
      pt: "Minha Felicidade",
      en: "My Happiness",
      es: "Mi Felicidad"
    },
    originalGerman: "Seit ich des Suchens müde ward,\nErlernte ich das Finden.\nSeit mir ein Wind hält Widerpart,\nSegl’ ich mit allen Winden.",
    content: {
      pt: "Desde que me cansei de procurar,\nAprendi a encontrar.\nDesde que um vento me opõe resistência,\nVelejo com todos os ventos.",
      en: "Since I grew tired of the search\nI taught myself to find.\nSince the wind blows in my face,\nI sail with every wind.",
      es: "Desde que me cansé de buscar,\nAprendí a encontrar.\nDesde que un viento se me opone,\nNavego con todos los vientos."
    }
  },
  {
    id: 3,
    category: 'morality_critique',
    title: {
      pt: "O Destemido",
      en: "The Undaunted",
      es: "El Impávido"
    },
    originalGerman: "Wo du stehst, grab tief hinein!\nDrunten ist die Quelle!\nLass die dunklen Männer schrein:\n»Stets ist drunten – Hölle!«",
    content: {
      pt: "Onde estás, cava fundo!\nLá embaixo está a fonte!\nDeixa os homens sombrios gritarem:\n«Lá embaixo é sempre – o inferno!»",
      en: "Where you stand, dig deep!\nDown there is the well!\nLet the dark men cry:\n\"Down there is always – Hell!\"",
      es: "Donde estás, ¡cava hondo!\n¡Abajo está la fuente!\nDeja que los hombres oscuros griten:\n«¡Abajo siempre está – el infierno!»"
    }
  },
  {
    id: 4,
    category: 'life_fate',
    title: {
      pt: "Diálogo",
      en: "Dialogue",
      es: "Diálogo"
    },
    originalGerman: "A. War ich krank? bin ich genesen?\nUnd wer ist mein Arzt gewesen?\nWie vergaß ich alles das!\nB. Jetzt erst glaub' ich, dass du genasest:\nDenn gesund ist, wer vergaß.",
    content: {
      pt: "A. Estive doente? Curei-me?\nE quem foi o meu médico?\nComo esqueci tudo isso!\nB. Só agora creio que te curaste:\nPois saudável é quem esqueceu.",
      en: "A. Was I sick? Have I recovered?\nAnd who was my doctor?\nHow did I forget all that!\nB. Only now do I believe you recovered:\nFor healthy is he who forgot.",
      es: "A. ¿Estuve enfermo? ¿Me he curado?\n¿Y quién ha sido mi médico?\n¡Cómo olvidé todo eso!\nB. Sólo ahora creo que te has curado:\nPues sano es quien olvidó."
    }
  },
  {
    id: 5,
    category: 'morality_critique',
    title: {
      pt: "Ao virtuoso",
      en: "To the Virtuous",
      es: "Al virtuoso"
    },
    originalGerman: "Auch unsern Tugenden ist's nicht recht,\nDass jeder ihre Knie bricht:\nManch' Dreck ist für den Gott zu schlecht,\nManch' Dreck ist für den Gott zu schlecht!",
    content: {
      pt: "Também às nossas virtudes não agrada,\nQue qualquer um lhes dobre os joelhos:\nMuita sujeira é ruim demais para o deus,\nMuita sujeira é ruim demais para o deus!",
      en: "Even our virtues don't like it,\nThat everyone bends their knees to them:\nSome dirt is too bad for the god,\nSome dirt is too bad for the god!",
      es: "Tampoco a nuestras virtudes les agrada,\nQue cualquiera doble ante ellas la rodilla:\n¡Mucha inmundicia es demasiado mala para el dios,\nMucha inmundicia es demasiado mala para el dios!"
    }
  },
  {
    id: 6,
    category: 'wisdom',
    title: {
      pt: "Sabedoria do Mundo",
      en: "Worldly Wisdom",
      es: "Sabiduría Mundana"
    },
    originalGerman: "Bleib nicht auf ebnem Feld!\nSteig nicht zu hoch hinaus!\nAm schönsten sieht die Welt\nVon halber Höhe aus.",
    content: {
      pt: "Não fiques em campo plano!\nNão subas alto demais!\nO mundo parece mais belo\nVisto de meia altura.",
      en: "Stay not on level plain!\nClimb not too high above!\nThe world looks fairest\nFrom halfway up.",
      es: "¡No te quedes en campo llano!\n¡No subas demasiado alto!\nEl mundo se ve más hermoso\nDesde media altura."
    }
  },
  {
    id: 21,
    category: 'morality_critique',
    title: {
      pt: "Contra a soberba",
      en: "Against Arrogance",
      es: "Contra la soberbia"
    },
    originalGerman: "Nicht blase dich auf: denn die kleinste Nadel\nSticht dich zu Nichts, du Platz-Blase!\nSchon ein Nadel-Stich\nMacht dich lächerlich.",
    content: {
      pt: "Não te incheis: pois a menor agulha\nTe fura e tornas ao nada, ó balão estufado!\nApenas uma picada de agulha\nTe torna ridículo.",
      en: "Don't puff yourself up: for the smallest needle\nPricks you to nothing, you bursting bubble!\nJust a needle prick\nMakes you ridiculous.",
      es: "No te hinches: pues la aguja más pequeña\nTe pincha hasta la nada, ¡burbuja hinchada!\nBasta un pinchazo de aguja\nPara volverte ridículo."
    }
  },
  {
    id: 22,
    category: 'wisdom',
    title: {
      pt: "Homem e Mulher",
      en: "Man and Woman",
      es: "Hombre y Mujer"
    },
    originalGerman: "Raub' dir das Weib, für das dein Herze fühlt!\nSo denkt der Mann; das Weib raubt nicht, es stiehlt.",
    content: {
      pt: "Rouba para ti a mulher por quem teu coração sente!\nAssim pensa o homem; a mulher não rouba, ela furta.",
      en: "Seize for yourself the woman for whom your heart feels!\nSo thinks the man; the woman does not seize, she steals.",
      es: "¡Róbate a la mujer por la que tu corazón siente!\nAsí piensa el hombre; la mujer no roba, ella hurta."
    }
  },
  {
    id: 23,
    category: 'art_truth',
    title: {
      pt: "Interpretação",
      en: "Interpretation",
      es: "Interpretación"
    },
    originalGerman: "Leg ich mich aus, so leg ich mich hinein:\nIch kann nicht selbst mein eigner Ausleger sein.\nDoch wer nur steigt auf seiner eignen Bahn,\nTrägt auch mein Bild zu hellerm Licht hinan.",
    content: {
      pt: "Se me interpreto, projeto-me para dentro:\nNão posso ser eu mesmo o meu intérprete.\nMas quem sobe apenas a sua própria via,\nLeva também a minha imagem para uma luz mais clara.",
      en: "If I interpret myself, I put myself into it:\nI cannot be my own interpreter.\nBut whoever climbs only on his own path,\nCarries my image to a brighter light as well.",
      es: "Si me interpreto, me proyecto dentro:\nNo puedo ser yo mismo mi propio intérprete.\nPero quien sube solo por su propio camino,\nLleva también mi imagen hacia una luz más clara."
    }
  },
  {
    id: 25,
    category: 'wisdom',
    title: {
      pt: "Pedido",
      en: "Request",
      es: "Petición"
    },
    originalGerman: "Bestiehl mich nicht! Schenk mir nichts!\nIch bitte dich: Nimm, was ich habe!\nDas ist die einzige Gabe,\nDie ich von dir begehre.",
    content: {
      pt: "Não me roubes! Não me dês nada!\nPeço-te: toma o que tenho!\nEsta é a única dádiva\nQue de ti desejo.",
      en: "Don't steal from me! Give me nothing!\nI ask you: take what I have!\nThat is the only gift\nI desire from you.",
      es: "¡No me robes! ¡No me regales nada!\nTe lo ruego: ¡toma lo que tengo!\nEsa es la única dádiva\nQue deseo de ti."
    }
  },
  {
    id: 27,
    category: 'life_fate',
    title: {
      pt: "O Andarilho",
      en: "The Wanderer",
      es: "El Caminante"
    },
    originalGerman: "»Kein Pfad mehr! Abgrund rings und Totenstille!\nSo wolltest du’s! Vom Pfade wich dein Wille!\nNun, Wandrer, gilt’s! Nun blicke kalt und klar!\nVerloren bist du, glaubst du an – Gefahr.«",
    content: {
      pt: "«Não há mais caminho! Abismo em volta e silêncio mortal!\nAssim quiseste! Do caminho desviou-se tua vontade!\nAgora, andarilho, vale! Agora olha frio e claro!\nPerdido estás, se acreditas em — perigo.»",
      en: "\"No path anymore! Abyss all around and deathly silence!\nSo you wanted it! Your will strayed from the path!\nNow, wanderer, it matters! Now look cold and clear!\nYou are lost if you believe in — danger.\"",
      es: "«¡Ya no hay sendero! ¡Abismo alrededor y silencio mortal!\n¡Así lo quisiste! ¡Tu voluntad se apartó del camino!\n¡Ahora, caminante, es el momento! ¡Mira ahora frío y claro!\nEstás perdido si crees en el — peligro.»"
    }
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Amor Fati: O Amor ao Destino",
    excerpt: "Como Nietzsche nos convida a abraçar cada momento da vida, inclusive o sofrimento, como algo necessário e belo.",
    date: "2024-05-15",
    readTime: "5 min",
    content: "O conceito de Amor Fati é central na obra de Nietzsche. Não é apenas resignação, mas uma aceitação entusiástica de tudo o que aconteceu, acontece e acontecerá..."
  },
  {
    id: "2",
    title: "A Morte de Deus e o Niilismo",
    excerpt: "Entendendo o aforismo 125 e o que significa a ausência de um horizonte absoluto de valores no mundo moderno.",
    date: "2024-05-18",
    readTime: "8 min",
    content: "Quando Nietzsche declara que 'Deus está morto', ele não está celebrando o ateísmo vulgar, mas diagnosticando o colapso dos valores supremos da civilização ocidental..."
  },
  {
    id: "3",
    title: "O Eterno Retorno",
    excerpt: "O peso mais pesado. Você viveria sua vida novamente, infinitas vezes, sem mudar um único detalhe?",
    date: "2024-05-20",
    readTime: "6 min",
    content: "Esta é a prova existencial definitiva. O Eterno Retorno não é necessariamente uma teoria cosmológica, mas um imperativo ético para viver de forma autêntica..."
  }
];