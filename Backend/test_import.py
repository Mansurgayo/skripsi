import sys
sys.path.append('.')

try:
    from app import app
    print('App imported successfully')
except Exception as e:
    print('Import error:', e)
    import traceback
    traceback.print_exc()