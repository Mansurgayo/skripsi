import urllib.request
import json

# Test API dengan binary model
url = "http://127.0.0.1:5000/predict"
headers = {"Content-Type": "application/json"}

# Test binary model
data_binary = {
    "text": "saya sangat stress hari ini",
    "model": "binary"
}

try:
    req = urllib.request.Request(url, data=json.dumps(data_binary).encode('utf-8'), headers=headers, method='POST')
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode('utf-8'))
        print("Binary model response:")
        print("Status code:", response.getcode())
        print("Response:", result)
except Exception as e:
    print("Binary model error:", e)

# Test multiclass model
data_multiclass = {
    "text": "saya sangat stress hari ini",
    "model": "multiclass"
}

try:
    req = urllib.request.Request(url, data=json.dumps(data_multiclass).encode('utf-8'), headers=headers, method='POST')
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode('utf-8'))
        print("\nMulticlass model response:")
        print("Status code:", response.getcode())
        print("Response:", result)
except Exception as e:
    print("Multiclass model error:", e)