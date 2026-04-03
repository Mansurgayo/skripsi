import re
import string
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import nltk

# Download NLTK data if not already downloaded
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt', quiet=True)
    nltk.download('punkt_tab', quiet=True)

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords', quiet=True)

# STOPWORDS
list_stopwords = set(stopwords.words('indonesian'))
list_stopwords.update(['iya', 'yaa', 'gak', 'nya', 'na', 'sih', 'ku', 'di', 'ga', 'ya', 'gaa', 'loh', 'kah', 'woi', 'woii', 'woy'])

# STEMMER
factory = StemmerFactory()
stemmer = factory.create_stemmer()

def clean_text(text):
    text = re.sub(r'@[A-Za-z0-9]+', '', text)  # mention
    text = re.sub(r'#[A-Za-z0-9]+', '', text)  # hashtag
    text = re.sub(r"http\S+", '', text)        # URL
    text = re.sub(r"[0-9]+", '', text)         # angka
    text = re.sub(r"[^\w\s]", '', text)        # tanda baca
    text = text.lower()
    text = text.strip()
    return text

def tokenize_filter_stem(text):
    tokens = word_tokenize(text)
    filtered = [t for t in tokens if t not in list_stopwords]
    stemmed = [stemmer.stem(word) for word in filtered]
    return ' '.join(stemmed)

def preprocess(text):
    text = clean_text(text)
    text = tokenize_filter_stem(text)
    return text