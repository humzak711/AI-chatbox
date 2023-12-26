from flask import Flask, request, jsonify, render_template
import openai

# configurations
openai.api_key = input('input openAI API key:\n')
app = Flask(__name__) # Initialise flask web application


# Home
@app.route("/", methods=["GET","POST"])
def index():
    return render_template("chatbox.html")

# Flask API
@app.route('/api/receive_message', methods=['POST'])
def receive_message():
    
    # receive user input
    data = request.get_json()
    message = data.get('message')

    # Use OpenAI's API to generate a response based on the received message
    prompt = "You are a helpful assistant.\nUser: " + message + "\nAI:"
    
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",  # chat-gpt engine
            prompt=prompt,
            max_tokens=1500  # Specify the maximum number of tokens for the response
        )

        ai_response = response['choices'][0]['text'].strip()
        return jsonify({'response': ai_response})
    
    except openai.error.OpenAIError as e:
        return jsonify({'error': str(e)})
    

# run the app
if __name__ == "__main__":
    app.run()