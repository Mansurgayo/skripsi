import urllib.request
import json

url = "http://127.0.0.1:5000/predict"
headers = {"Content-Type": "application/json"}

# Test binary model
data = {"text": "saya sangat stress hari ini", "model": "binary"}
req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers, method='POST')

try:
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode('utf-8'))
        print("SUCCESS - Binary model response:")
        print(json.dumps(result, indent=2))
except Exception as e:
    print("ERROR:", e)