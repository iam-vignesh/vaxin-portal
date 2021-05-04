import requests
import csv
from requests.auth import HTTPBasicAuth
url = "https://cdn-api.co-vin.in/api/v2/admin/location/states"
#auth = HTTPBasicAuth('email address', 'password')    
headers = {"Content-Type": "application/json"}

site = requests.get(url,headers=headers)
site_json = site.json()
print(site_json)

for state in site_json["states"]:
    print (state["state_name"])
    print (state["state_id"])