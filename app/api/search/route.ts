import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { createTokenizer } from '@orama/tokenizers/mandarin';
import { stopwords as mandarinStopwords } from '@orama/stopwords/mandarin';

export const revalidate = false;

export const { staticGET: GET } = createFromSource(source, {
  // 站点以中文为主，使用 Orama 的 mandarin 分词器以支持中文搜索
  // https://docs.orama.com/docs/orama-js/supported-languages
  components: {
    tokenizer: createTokenizer({
      language: 'mandarin',
      stopWords: mandarinStopwords,
    }),
  },
  search: {
    threshold: 0,
    tolerance: 0,
  },
});
