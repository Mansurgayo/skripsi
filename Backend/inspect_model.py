from tensorflow.keras.models import load_model
import os
m_path = os.path.join('Backend', 'model_baru', 'model_bilstm.h5')
print('Loading', m_path)
model = load_model(m_path)
model.summary()
print('Output shape:', model.output_shape)
print('Output dtype:', getattr(model, 'output_dtype', None))
print('Number of outputs:', len(model.outputs))
