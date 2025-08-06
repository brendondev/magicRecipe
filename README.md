# Magic Recipe

Aplicação Next.js para geração de receitas com IA.

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes chaves:

```
# Hygraph
HYGRAPH_URL=''
HYGRAPH_TOKEN=''

# Discord
WEBHOOK_URL=''

# Gemini
GEMINI_API_KEY=''
```

Substitua os valores conforme necessário.

## Deploy

Defina as mesmas variáveis de ambiente no provedor de hospedagem escolhido.
Use `GEMINI_API_KEY` (sem o prefixo `NEXT_PUBLIC_`) para fornecer a chave da API do Gemini apenas no servidor.

