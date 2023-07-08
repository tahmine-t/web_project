import requests

# Set the base URL
base_url = 'http://localhost:8000'  # Update with your actual base URL

# Set the endpoint URL
endpoint = '/api/getairplane/'

# Set the query parameters
params = {
    'origin': 'mashhad',
    'destination': 'karaj',
    'departure_date': '2023-07-08',
}

# Send GET request with query parameters
url = 'http://127.0.0.1:8000/api/getairplane/'
response = requests.get(url, params=params)

# Check the response status code
if response.status_code == 200:
    # Print the response data
    data = response.json()
    print(data)
else:
    # Print the error message
    print(f"Error: {response.text}")
