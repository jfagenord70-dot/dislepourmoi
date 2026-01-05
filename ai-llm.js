// ai-llm.js
// Ce fichier est prêt pour OpenAI (ou autre) mais désactivé

export async function getLLMReply(message, lang) {
  // 🔒 PAS DE CLÉ = PAS D’IA
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  // ⚠️ PLUS TARD : appel OpenAI ici
  // Pour l’instant on retourne null volontairement
  return null;
}
