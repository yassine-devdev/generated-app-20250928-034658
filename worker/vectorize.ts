import { Env } from './core-utils';
const EMBEDDING_MODEL = '@cf/baai/bge-base-en-v1.5';
async function getEmbeddings(text: string, env: Env): Promise<number[]> {
  const response = await fetch(
    `${env.CF_AI_BASE_URL.replace('/openai', '')}/${EMBEDDING_MODEL}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.CF_AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: [text] }),
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get embeddings: ${response.status} ${errorText}`);
  }
  const result: { result: { data: number[][] } } = await response.json();
  return result.result.data[0];
}
export async function insertIntoVectorize(id: string, text: string, env: Env) {
  const embeddings = await getEmbeddings(text, env);
  await env.VECTORIZE_INDEX.insert([{ id, values: embeddings, metadata: { text } }]);
}
export async function queryVectorize(query: string, env: Env): Promise<string> {
  try {
    const queryEmbeddings = await getEmbeddings(query, env);
    const results = await env.VECTORIZE_INDEX.query(queryEmbeddings, { topK: 3 });
    if (!results.matches || results.matches.length === 0) {
      return '';
    }
    const context = results.matches
      .map(match => match.metadata?.text)
      .filter(Boolean)
      .join('\n\n---\n\n');
    return context;
  } catch (error) {
    console.error('Vectorize query failed:', error);
    return '';
  }
}
export async function deleteFromVectorize(id: string, env: Env) {
  await env.VECTORIZE_INDEX.deleteByIds([id]);
}