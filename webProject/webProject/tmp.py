# import requests

# # Set the base URL
# base_url = 'http://localhost:8000'  # Update with your actual base URL

# # Set the endpoint URL
# endpoint = '/api/getairplane/'

# # Set the query parameters
# params = {
#     'origin': 'mashhad',
#     'destination': 'karaj',
#     'departure_date': '2023-07-08',
# }

# # Send GET request with query parameters
# url = 'http://127.0.0.1:8000/api/getairplane/'
# response = requests.get(url, params=params)

# # Check the response status code
# if response.status_code == 200:
#     # Print the response data
#     data = response.json()
#     print(data)
# else:
#     # Print the error message
#     print(f"Error: {response.text}")

import requests

url = 'http://127.0.0.1:8000/api/viewreserves/'
access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4ODI3MTE4LCJpYXQiOjE2ODg4MjY4MTgsImp0aSI6IjQ0NGY1ZmUxOTMwNDRlZGY5ODQ1OTQ5MjdmOTBhMGZjIiwidXNlcl9pZCI6MX0.9CTBjU8Y4c7OThQ_LpOYTCVD61-3NCjSDD1Jvg8V2W8'  # Replace with your actual access token

headers = {
    'Authorization': f'Bearer {access_token}'
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Request failed with status code {response.status_code}")



