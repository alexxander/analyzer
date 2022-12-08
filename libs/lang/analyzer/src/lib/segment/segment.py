import spacy
import json
import time
import sys


nlp = spacy.load('ja_core_news_sm')


def get_reading(token):
    readings = token.morph.get('Reading')
    return readings[0] if len(readings) > 0 else None


def analyze(text):
    doc = nlp(text)
    return [{
        "i": token.i,
        "surface": token.text,
        "norm": token.norm_,
        "dict": token.lemma_,
        "reading": get_reading(token),
        "tag": token.tag_,
        "pos": token.pos_,
        "head": token.head.i,
        "dep": token.dep_,
    } for token in doc]


if __name__ == '__main__':
    for line in sys.stdin:
        out = analyze(line.replace('\\n', '\n').strip())
        sys.stdout.write(json.dumps(out))
        sys.stdout.flush()
