let CanSend = true; // Flag to determine if user can send message
    
// Function to handle animations when message is sent
function HandleButtonClick() {
      if (CanSend) {
        const sendButton = document.querySelector('button');

        sendButton.style.transform = 'scale(0.95)';
        sendButton.style.backgroundColor = 'aquamarine';

        setTimeout(() => {
          sendButton.style.transform = '';
          sendButton.style.backgroundColor = 'aqua';
        }, 100);

        SendMessage(); // Send message to server
      }
    }
    
// Function to handle behaviour of the "Enter" key
document.getElementById('user-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        HandleButtonClick();
    }
});


// Function to communicate with the server
async function SendMessage() {
      const userInput = document.getElementById('user-input').value.trim();
      const responseStatus = document.getElementById('response-status');

      if (userInput !== '') { // Check if user input is valid
        DisplayMessages(userInput, 'user');
        CanSend = false; // Temporarily disable sending messages

        responseStatus.style.display = 'block'; // Display the "Generating response..." message
        
        // Communicate with server via fetch API
        try {
          const response = await fetch('/api/receive_message', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
          });

          const data = await response.json();
          const aiResponse = data.response;
          DisplayMessages(aiResponse, 'AI'); 
        } 

        catch (error) {
          console.error('Error sending/receiving message:', error);
        }
        
        document.getElementById('user-input').value = '';
        AdjustTextArea();
        responseStatus.style.display = 'none'; // Hide the "Generating response..." message after receiving response
        CanSend = true;
      }
}
    

// Function to render messages on a new line on the chatbox
function DisplayMessages(message, sender) {
      const ChatBox = document.getElementById('chat-box');
      const newMessage = document.createElement('div');

      newMessage.classList.add('message');
      newMessage.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
      newMessage.textContent = (sender === 'user' ? 'You' : 'AI') + ': ' + message;
      ChatBox.appendChild(newMessage);

      ChatBox.scrollTop = ChatBox.scrollHeight;
}


// Function to change display accordingly
function AdjustTextArea() {
      const textarea = document.getElementById('user-input');
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
}
