from flask import Flask, request, jsonify
import hashlib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Create a dictionary to store the URL data with short URLs as keys
url_data = {}

@app.route('/')
def home():
    return "Welcome to the URL Shortener Service!"

@app.route('/shorten', methods=['POST'])
def shorten_url():
    long_url = request.json.get('url')

    # Generate a short URL based on the content of the long URL
    short_url = generate_short_url(long_url)

    # Store the URL and its metadata (e.g., hit count)
    url_data[short_url] = {'url': long_url, 'hits': 0}

    return jsonify({'short_url': short_url})

def generate_short_url(long_url):
    # Generate a short URL based on the content of the long URL using a hash
    sha1_hash = hashlib.sha1(long_url.encode()).hexdigest()[:8]  # Take the first 8 characters of the hash
    return sha1_hash

@app.route('/search', methods=['GET'])
def search_urls():
    term = request.args.get('term')

    # Search for URLs matching the provided term in the title
    results = {}
    for short_url, data in url_data.items():
        if term in data['url']:
            results[short_url] = data

    return jsonify(results)

@app.route('/<short_url>', methods=['GET'])
def get_url_metadata(short_url):
    if short_url in url_data:
        url_data[short_url]['hits'] += 1
        return jsonify(url_data[short_url])
    else:
        return "URL not found", 404

if __name__ == '__main__':
    app.run(debug=True)
