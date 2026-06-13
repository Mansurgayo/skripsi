import urllib.request
import urllib.error
import json

url = 'http://127.0.0.1:5000/predict'
headers = {'Content-Type': 'application/json'}

data = {
    'text': 'saya sangat stress hari ini',
    'model': 'multiclass'
}

req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers, method='POST')
try:
    with urllib.request.urlopen(req) as response:
        print('Status:', response.status)
        print(response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print('HTTPError code:', e.code)
    body = e.read().decode('utf-8')
    print('Body:', body)
except Exception as e:
    print('Other error:', type(e).__name__, e)
