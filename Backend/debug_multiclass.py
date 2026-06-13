import numpy as np
from tensorflow.keras.models import load_model

model = load_model('model_baru/model_bilstm.h5')
print('MODEL OUTPUT SHAPE:', model.output_shape)
print('MODEL SUMMARY LAST LAYERS:')
for layer in model.layers[-3:]:
    print(layer.name, layer.output_shape)

x = np.zeros((1, 100), dtype=np.int32)
try:
    y = model.predict(x, verbose=0)
    print('PREDICT SHAPE:', np.shape(y))
    print('PREDICT VALUE:', y)
except Exception as e:
    print('PREDICT ERROR:', type(e).__name__, e)
