from flask import Flask, request
from telegram import Update, ReplyKeyboardRemove
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext, ConversationHandler
from dotenv import load_dotenv
import requests
import os

# Load environment variables from .env file
load_dotenv()

SUPABASE_URL = os.getenv("EXPO_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("EXPO_PUBLIC_SUPABASE_ANON_KEY")

app = Flask(__name__)

# Get the API token from environment variable
API_TOKEN = os.getenv('TELEGRAM_API_TOKEN')

updater = Updater(API_TOKEN)
dispatcher = updater.dispatcher

# Define conversation states
ASK_EMAIL, ASK_PASSWORD = range(2)

def start(update: Update, context: CallbackContext) -> None:
    update.message.reply_text(
        "Let's start linking your Unibuds Account to this chat!\nIf you don't wish to continue, click /cancel\nPlease enter your email address:",
    )
    return ASK_EMAIL

def ask_email(update: Update, context: CallbackContext) -> None:
    context.user_data['email'] = update.message.text
    update.message.reply_text(
        "Email received. If you don't wish to continue, click /cancel\nNow, please enter your password:",
        reply_markup=ReplyKeyboardRemove()
    )
    return ASK_PASSWORD

def ask_password(update: Update, context: CallbackContext) -> None:
    password = update.message.text
    # Clear the password message
    context.bot.delete_message(chat_id=update.message.chat_id, message_id=update.message.message_id)
    email = context.user_data.get('email')
    update.message.reply_text(
        "Please hang on while we verify your account"
    )
    
    # Attempt to sign in with Supabase
    response = requests.post(
        f"{SUPABASE_URL}/auth/v1/token?grant_type=password",
        headers={
            "apikey": SUPABASE_KEY,
            "Content-Type": "application/json"
        },
        json={
            "email": email,
            "password": password
        }
    )

    if response.status_code == 200:
        data = response.json()
        access_token = data.get('access_token')
        user_id = data.get('user', {}).get('id')

        if access_token and user_id:
            telegram_id = update.message.from_user.id
            metadata_response = requests.put(
                f"{SUPABASE_URL}/auth/v1/user",
                headers={
                    "apikey": SUPABASE_KEY,
                    "Authorization": f"Bearer {access_token}",
                    "Content-Type": "application/json"
                },
                json={
                    "data": {"telegram_id": telegram_id}
                }
            )
            if metadata_response.status_code == 200:
                update.message.reply_text("Login successful! Your account has been linked.")
            else:
                update.message.reply_text("Failed to update user metadata.")
        else:
            update.message.reply_text("Failed to retrieve user data.")
    else:
        update.message.reply_text("Login failed. Please check your email and password. Click /link_account again once you are ready to link your account")

    return ConversationHandler.END

def cancel(update: Update, context: CallbackContext) -> None:
    update.message.reply_text('Linking process cancelled.', reply_markup=ReplyKeyboardRemove())
    return ConversationHandler.END

# Create a conversation handler with the states ASK_EMAIL and ASK_PASSWORD
conv_handler = ConversationHandler(
    entry_points=[CommandHandler('link_account', start)],
    states={
        ASK_EMAIL: [MessageHandler(Filters.text & ~Filters.command, ask_email)],
        ASK_PASSWORD: [MessageHandler(Filters.text & ~Filters.command, ask_password)]
    },
    fallbacks=[CommandHandler('cancel', cancel)]
)

dispatcher.add_handler(conv_handler)

@app.route('/webhook', methods=['POST'])
def webhook():
    json_str = request.get_data(as_text=True)
    update = Update.de_json(json_str, updater.bot)
    dispatcher.process_update(update)
    return 'ok'

if __name__ == '__main__':
    updater.start_polling()
    app.run(port=8443)
