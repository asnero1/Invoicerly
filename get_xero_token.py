import requests

client_id = "5E17E893CC744E6D93A1B1B139BECEDD"
client_secret = "8l2lZUbM6r6jA3h7rImE8GqzyLi0TA-TgJVGVy-Pxxwa4wua"  # Replace with actual secret
redirect_uri = "https://localhost"
auth_code = "0hKEN7MwqDtLUwChRQa8RwM4iayNKRgn8pOcmPdT_Nc"  # Replace with fresh authorization code

token_url = "https://identity.xero.com/connect/token"

# Prepare the data payload correctly
data = {
    "grant_type": "authorization_code",
    "code": auth_code,
    "redirect_uri": redirect_uri,
    "client_id": client_id,
    "client_secret": client_secret
}

# Correct headers
headers = {
    "Content-Type": "application/x-www-form-urlencoded"
}

# Make the POST request to get the token
response = requests.post(token_url, data=data, headers=headers)

# Print the response
print("Response Status Code:", response.status_code)

try:
    print("Response JSON:", response.json())  # This should contain the access token
except Exception as e:
    print("Failed to parse JSON response. Raw response text:", response.text)
