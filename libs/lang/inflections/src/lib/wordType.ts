export enum WordType {
  adj_f = 'adj-f', // noun or verb acting prenominally
  adj_i = 'adj-i', // adjective (keiyoushi)
  adj_ix = 'adj-ix', // adjective (keiyoushi) - yoi/ii class
  adj_kari = 'adj-kari', // 'kari' adjective (archaic)
  adj_ku = 'adj-ku', // 'ku' adjective (archaic)
  adj_na = 'adj-na', // adjectival nouns or quasi-adjectives (keiyodoshi)
  adj_nari = 'adj-nari', // archaic/formal form of na-adjective
  adj_no = 'adj-no', // nouns which may take the genitive case particle 'no'
  adj_pn = 'adj-pn', // pre-noun adjectival (rentaishi)
  adj_shiku = 'adj-shiku', // 'shiku' adjective (archaic)
  adj_t = 'adj-t', // 'taru' adjective
  adv = 'adv', // adverb (fukushi)
  adv_to = 'adv-to', // adverb taking the 'to' particle
  aux = 'aux', // auxiliary
  aux_adj = 'aux-adj', // auxiliary adjective
  aux_v = 'aux-v', // auxiliary verb
  conj = 'conj', // conjunction
  cop = 'cop', // copula
  ctr = 'ctr', // counter
  exp = 'exp', // expressions (phrases, clauses, etc.)
  int = 'int', // interjection (kandoushi)
  n = 'n', // noun (common) (futsuumeishi)
  n_adv = 'n-adv', // adverbial noun (fukushitekimeishi)
  n_pr = 'n-pr', // proper noun
  n_pref = 'n-pref', // noun, used as a prefix
  n_suf = 'n-suf', // noun, used as a suffix
  n_t = 'n-t', // noun (temporal) (jisoumeishi)
  num = 'num', // numeric
  pn = 'pn', // pronoun
  pref = 'pref', // prefix
  prt = 'prt', // particle
  suf = 'suf', // suffix
  unc = 'unc', // unclassified
  v_unspec = 'v-unspec', // verb unspecified
  v1 = 'v1', // Ichidan verb
  v1_s = 'v1-s', // Ichidan verb - kureru special class
  v2a_s = 'v2a-s', // Nidan verb with 'u' ending (archaic)
  v2b_k = 'v2b-k', // Nidan verb (upper class) with 'bu' ending (archaic)
  v2b_s = 'v2b-s', // Nidan verb (lower class) with 'bu' ending (archaic)
  v2d_k = 'v2d-k', // Nidan verb (upper class) with 'dzu' ending (archaic)
  v2d_s = 'v2d-s', // Nidan verb (lower class) with 'dzu' ending (archaic)
  v2g_k = 'v2g-k', // Nidan verb (upper class) with 'gu' ending (archaic)
  v2g_s = 'v2g-s', // Nidan verb (lower class) with 'gu' ending (archaic)
  v2h_k = 'v2h-k', // Nidan verb (upper class) with 'hu/fu' ending (archaic)
  v2h_s = 'v2h-s', // Nidan verb (lower class) with 'hu/fu' ending (archaic)
  v2k_k = 'v2k-k', // Nidan verb (upper class) with 'ku' ending (archaic)
  v2k_s = 'v2k-s', // Nidan verb (lower class) with 'ku' ending (archaic)
  v2m_k = 'v2m-k', // Nidan verb (upper class) with 'mu' ending (archaic)
  v2m_s = 'v2m-s', // Nidan verb (lower class) with 'mu' ending (archaic)
  v2n_s = 'v2n-s', // Nidan verb (lower class) with 'nu' ending (archaic)
  v2r_k = 'v2r-k', // Nidan verb (upper class) with 'ru' ending (archaic)
  v2r_s = 'v2r-s', // Nidan verb (lower class) with 'ru' ending (archaic)
  v2s_s = 'v2s-s', // Nidan verb (lower class) with 'su' ending (archaic)
  v2t_k = 'v2t-k', // Nidan verb (upper class) with 'tsu' ending (archaic)
  v2t_s = 'v2t-s', // Nidan verb (lower class) with 'tsu' ending (archaic)
  v2w_s = 'v2w-s', // Nidan verb (lower class) with 'u' ending and 'we' conjugation (archaic)
  v2y_k = 'v2y-k', // Nidan verb (upper class) with 'yu' ending (archaic)
  v2y_s = 'v2y-s', // Nidan verb (lower class) with 'yu' ending (archaic)
  v2z_s = 'v2z-s', // Nidan verb (lower class) with 'zu' ending (archaic)
  v4b = 'v4b', // Yodan verb with 'bu' ending (archaic)
  v4g = 'v4g', // Yodan verb with 'gu' ending (archaic)
  v4h = 'v4h', // Yodan verb with 'hu/fu' ending (archaic)
  v4k = 'v4k', // Yodan verb with 'ku' ending (archaic)
  v4m = 'v4m', // Yodan verb with 'mu' ending (archaic)
  v4n = 'v4n', // Yodan verb with 'nu' ending (archaic)
  v4r = 'v4r', // Yodan verb with 'ru' ending (archaic)
  v4s = 'v4s', // Yodan verb with 'su' ending (archaic)
  v4t = 'v4t', // Yodan verb with 'tsu' ending (archaic)
  v5aru = 'v5aru', // Godan verb - -aru special class
  v5b = 'v5b', // Godan verb with 'bu' ending
  v5g = 'v5g', // Godan verb with 'gu' ending
  v5k = 'v5k', // Godan verb with 'ku' ending
  v5k_s = 'v5k-s', // Godan verb - Iku/Yuku special class
  v5m = 'v5m', // Godan verb with 'mu' ending
  v5n = 'v5n', // Godan verb with 'nu' ending
  v5r = 'v5r', // Godan verb with 'ru' ending
  v5r_i = 'v5r-i', // Godan verb with 'ru' ending (irregular verb)
  v5s = 'v5s', // Godan verb with 'su' ending
  v5t = 'v5t', // Godan verb with 'tsu' ending
  v5u = 'v5u', // Godan verb with 'u' ending
  v5u_s = 'v5u-s', // Godan verb with 'u' ending (special class)
  v5uru = 'v5uru', // Godan verb - Uru old class verb (old form of Eru)
  vi = 'vi', // intransitive verb
  vk = 'vk', // Kuru verb - special class
  vn = 'vn', // irregular nu verb
  vr = 'vr', // irregular ru verb, plain form ends with -ri
  vs = 'vs', // noun or participle which takes the aux. verb suru
  vs_c = 'vs-c', // su verb - precursor to the modern suru
  vs_i = 'vs-i', // suru verb - included
  vs_s = 'vs-s', // suru verb - special class
  vt = 'vt', // transitive verb
  vz = 'vz', // Ichidan verb - zuru verb (alternative form of -jiru verbs)
}

export type AdjectiveType =
  | WordType.adj_f
  | WordType.adj_i
  | WordType.adj_ix
  | WordType.adj_kari
  | WordType.adj_ku
  | WordType.adj_na
  | WordType.adj_nari
  | WordType.adj_no
  | WordType.adj_pn
  | WordType.adj_shiku
  | WordType.adj_t
  | WordType.aux_adj;

export type VerbType =
  | WordType.v_unspec
  | WordType.v1
  | WordType.v1_s
  | WordType.v2a_s
  | WordType.v2b_k
  | WordType.v2b_s
  | WordType.v2d_k
  | WordType.v2d_s
  | WordType.v2g_k
  | WordType.v2g_s
  | WordType.v2h_k
  | WordType.v2h_s
  | WordType.v2k_k
  | WordType.v2k_s
  | WordType.v2m_k
  | WordType.v2m_s
  | WordType.v2n_s
  | WordType.v2r_k
  | WordType.v2r_s
  | WordType.v2s_s
  | WordType.v2t_k
  | WordType.v2t_s
  | WordType.v2w_s
  | WordType.v2y_k
  | WordType.v2y_s
  | WordType.v2z_s
  | WordType.v4b
  | WordType.v4g
  | WordType.v4h
  | WordType.v4k
  | WordType.v4m
  | WordType.v4n
  | WordType.v4r
  | WordType.v4s
  | WordType.v4t
  | WordType.v5aru
  | WordType.v5b
  | WordType.v5g
  | WordType.v5k
  | WordType.v5k_s
  | WordType.v5m
  | WordType.v5n
  | WordType.v5r
  | WordType.v5r_i
  | WordType.v5s
  | WordType.v5t
  | WordType.v5u
  | WordType.v5u_s
  | WordType.v5uru
  | WordType.vi
  | WordType.vk
  | WordType.vn
  | WordType.vr
  | WordType.vs
  | WordType.vs_c
  | WordType.vs_i
  | WordType.vs_s
  | WordType.vt
  | WordType.vz
  | WordType.aux_v;

export type CopulaType = WordType.cop;

export function isAdjectiveType(type: WordType): type is AdjectiveType {
  return (
    type === WordType.adj_f ||
    type === WordType.adj_i ||
    type === WordType.adj_ix ||
    type === WordType.adj_kari ||
    type === WordType.adj_ku ||
    type === WordType.adj_na ||
    type === WordType.adj_nari ||
    type === WordType.adj_no ||
    type === WordType.adj_pn ||
    type === WordType.adj_shiku ||
    type === WordType.adj_t ||
    type === WordType.aux_adj
  );
}

export function isVerbType(type: WordType): type is VerbType {
  return (
    type === WordType.v_unspec ||
    type === WordType.v1 ||
    type === WordType.v1_s ||
    type === WordType.v2a_s ||
    type === WordType.v2b_k ||
    type === WordType.v2b_s ||
    type === WordType.v2d_k ||
    type === WordType.v2d_s ||
    type === WordType.v2g_k ||
    type === WordType.v2g_s ||
    type === WordType.v2h_k ||
    type === WordType.v2h_s ||
    type === WordType.v2k_k ||
    type === WordType.v2k_s ||
    type === WordType.v2m_k ||
    type === WordType.v2m_s ||
    type === WordType.v2n_s ||
    type === WordType.v2r_k ||
    type === WordType.v2r_s ||
    type === WordType.v2s_s ||
    type === WordType.v2t_k ||
    type === WordType.v2t_s ||
    type === WordType.v2w_s ||
    type === WordType.v2y_k ||
    type === WordType.v2y_s ||
    type === WordType.v2z_s ||
    type === WordType.v4b ||
    type === WordType.v4g ||
    type === WordType.v4h ||
    type === WordType.v4k ||
    type === WordType.v4m ||
    type === WordType.v4n ||
    type === WordType.v4r ||
    type === WordType.v4s ||
    type === WordType.v4t ||
    type === WordType.v5aru ||
    type === WordType.v5b ||
    type === WordType.v5g ||
    type === WordType.v5k ||
    type === WordType.v5k_s ||
    type === WordType.v5m ||
    type === WordType.v5n ||
    type === WordType.v5r ||
    type === WordType.v5r_i ||
    type === WordType.v5s ||
    type === WordType.v5t ||
    type === WordType.v5u ||
    type === WordType.v5u_s ||
    type === WordType.v5uru ||
    type === WordType.vi ||
    type === WordType.vk ||
    type === WordType.vn ||
    type === WordType.vr ||
    type === WordType.vs ||
    type === WordType.vs_c ||
    type === WordType.vs_i ||
    type === WordType.vs_s ||
    type === WordType.vt ||
    type === WordType.vz ||
    type === WordType.aux_v
  );
}

export function isCopulaType(type: WordType): type is CopulaType {
  return type === WordType.cop;
}

export function isWordType(type: string): type is WordType {
  return wordTypesSet.has(type);
}

const wordTypesSet = new Set([
  'adj-f',
  'adj-i',
  'adj-ix',
  'adj-kari',
  'adj-ku',
  'adj-na',
  'adj-nari',
  'adj-no',
  'adj-pn',
  'adj-shiku',
  'adj-t',
  'adv',
  'adv-to',
  'aux',
  'aux-adj',
  'aux-v',
  'conj',
  'cop',
  'ctr',
  'exp',
  'int',
  'n',
  'n-adv',
  'n-pr',
  'n-pref',
  'n-suf',
  'n-t',
  'num',
  'pn',
  'pref',
  'prt',
  'suf',
  'unc',
  'v-unspec',
  'v1',
  'v1-s',
  'v2a-s',
  'v2b-k',
  'v2b-s',
  'v2d-k',
  'v2d-s',
  'v2g-k',
  'v2g-s',
  'v2h-k',
  'v2h-s',
  'v2k-k',
  'v2k-s',
  'v2m-k',
  'v2m-s',
  'v2n-s',
  'v2r-k',
  'v2r-s',
  'v2s-s',
  'v2t-k',
  'v2t-s',
  'v2w-s',
  'v2y-k',
  'v2y-s',
  'v2z-s',
  'v4b',
  'v4g',
  'v4h',
  'v4k',
  'v4m',
  'v4n',
  'v4r',
  'v4s',
  'v4t',
  'v5aru',
  'v5b',
  'v5g',
  'v5k',
  'v5k-s',
  'v5m',
  'v5n',
  'v5r',
  'v5r-i',
  'v5s',
  'v5t',
  'v5u',
  'v5u-s',
  'v5uru',
  'vi',
  'vk',
  'vn',
  'vr',
  'vs',
  'vs-c',
  'vs-i',
  'vs-s',
  'vt',
  'vz',
]);
