export class FullTextSearchHelper {
  static strToTSQuery(str: string) {
    return str.match(/(([^\x00-\x7F]|\w))+/gi)
      .filter(s => s.length)
      .map(s => `${s}:*`)
      .join(` & `);
  }

  static genQueryStr(entity: string, { search, lang }) {
    const textSearchQuery = [];
    const tsQuery = FullTextSearchHelper.strToTSQuery(search);
    const likeQuery = search.match(/(([^\x00-\x7F]|\w))+/gi).join(" ");
    if (tsQuery) {
      textSearchQuery.push(`make_query_tsvector(${entity}.name_${lang}, ${entity}.description_${lang}) @@ to_tsquery('russian', '${tsQuery}')`);
    }
    if (likeQuery) {
      textSearchQuery.push(`${entity}.name_${lang} ilike '%${likeQuery}%'`);
      textSearchQuery.push(`${entity}.description_${lang} ilike '%${likeQuery}%'`);
    }
    
    return textSearchQuery.join(" or ");
  }
}
