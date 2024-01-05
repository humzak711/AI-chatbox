from flask import Flask, request, jsonify, render_template
import openai

# Configurations
openai.api_key = input('input openAI API key:\n')
app = Flask(__name__) # Initialise flask web application


# Home
@app.route("/", methods=["GET"])
def index():
    return render_template("chatbox.html")

# API to generate response
@app.route('/api/receive_message', methods=['POST'])
def receive_message():
    
    # Receive user input
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

        # Process and return the AI's response
        ai_response = response['choices'][0]['text'].strip()
        return jsonify({'response': ai_response})
    
    except openai.error.OpenAIError as error: 
        return jsonify({'error': str(error)})
    

# Run the app
if __name__ == "__main__":
    app.run()
