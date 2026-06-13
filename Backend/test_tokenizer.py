import pickle
import os

print("Testing tokenizer loading...")
try:
    with open('model_binary/tokenizer.pkl', 'rb') as f:
        tokenizer = pickle.load(f)
    print("Tokenizer loaded successfully")
    print("Tokenizer type:", type(tokenizer))
except Exception as e:
    print("Tokenizer error:", e)
    import traceback
    traceback.print_exc()