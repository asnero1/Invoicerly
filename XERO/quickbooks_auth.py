import requests
import base64

# Your QuickBooks API Credentials
client_id = "ABIWI0TPdDYl0zbzKzK8JhZxDcSokocOlEEBe27uzMQnW3fQ3O"
client_secret = "pE6jeN4GKkwBzPaB8H20uLo0JX42AkINvBSZF4hF"
redirect_uri = "https://localhost"
auth_code = "AB11741146108Qqo0wkjHjmHhtPJql639okwELTVAtvumJEPwe"  # Use new auth code

token_url = "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer"

# Encode Client ID and Secret for Basic Auth
credentials = f"{client_id}:{client_secret}"
encoded_credentials = base64.b64encode(credentials.encode()).decode()

# Set Headers
headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": f"Basic {encoded_credentials}"
}

# Set POST Data
data = {
    "grant_type": "authorization_code",
    "code": auth_code,
    "redirect_uri": redirect_uri
}

# Send Token Request
response = requests.post(token_url, headers=headers, data=data)

# Print Response
print("Response Status Code:", response.status_code)
print("Response JSON:", response.json())











