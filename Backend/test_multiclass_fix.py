#!/usr/bin/env python
"""Test multiclass model output to verify the fix"""

import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle
import os
import json

# Config
model_path = os.path.join('model_baru', 'model_bilstm.h5')
tokenizer_path = os.path.join('model_baru', 'tokenizer.pkl')
MULTICLASS_LABELS = ['Berat', 'Sangat Berat', 'Sangat Positif', 'Sedang', 'Ringan']
max_len = 100

print("=" * 80)
print("MULTICLASS MODEL OUTPUT TEST")
print("=" * 80)

# Load model
try:
    print(f"\n1. Loading model from: {model_path}")
    model = load_model(model_path)
    print(f"   ✓ Model loaded successfully")
    print(f"   Model output shape: {model.output_shape}")
except Exception as e:
    print(f"   ✗ Error loading model: {e}")
    exit(1)

# Load tokenizer
try:
    print(f"\n2. Loading tokenizer from: {tokenizer_path}")
    with open(tokenizer_path, 'rb') as f:
        tokenizer = pickle.load(f)
    print(f"   ✓ Tokenizer loaded successfully")
except Exception as e:
    print(f"   ✗ Error loading tokenizer: {e}")
    exit(1)

# Test inputs
test_texts = [
    "saya sangat stress hari ini",
    "aku capek banget kerjaan numpuk",
    "tidak ada masalah semuanya baik-baik saja",
]

print(f"\n3. Testing predictions on {len(test_texts)} sample texts:")
print("-" * 80)

for i, text in enumerate(test_texts, 1):
    print(f"\n   Test {i}: \"{text}\"")
    
    try:
        # Preprocess
        sequence = tokenizer.texts_to_sequences([text])
        padded = pad_sequences(sequence, maxlen=max_len)
        
        # Predict
        raw_output = model.predict(padded, verbose=0)
        output = np.asarray(raw_output).squeeze()
        
        print(f"   Raw output shape: {raw_output.shape}")
        print(f"   After squeeze: {output.shape if hasattr(output, 'shape') else 'scalar'}")
        print(f"   Output values: {output}")
        
        # Get prediction
        probs = np.asarray(output)
        if probs.ndim > 1:
            probs = probs.flatten()
        
        class_index = int(np.argmax(probs))
        class_prob = float(probs[class_index])
        class_label = MULTICLASS_LABELS[class_index] if class_index < len(MULTICLASS_LABELS) else f"Class_{class_index}"
        
        print(f"   ✓ Predicted: {class_label} (index={class_index}, prob={class_prob:.4f})")
        print(f"     Class probabilities:")
        for idx, label in enumerate(MULTICLASS_LABELS):
            print(f"       {label}: {probs[idx]:.4f}")
        
    except Exception as e:
        print(f"   ✗ Error: {e}")

print("\n" + "=" * 80)
print("TEST COMPLETE")
print("=" * 80)
print("\n✓ If all predictions show dataset labels (Berat, Sangat Berat, etc.), the fix works!")
