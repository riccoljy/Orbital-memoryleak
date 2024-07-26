from flask import Flask, request
from telegram import Update, ReplyKeyboardMarkup, ReplyKeyboardRemove
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext, ConversationHandler
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Get the API token from environment variable
API_TOKEN = os.getenv('TELEGRAM_API_TOKEN')

updater = Updater(API_TOKEN)
dispatcher = updater.dispatcher

# Define conversation states
ASK_EMAIL = 1
keyboard = [['/link_account']]

def start(update: Update, context: CallbackContext) -> None:
    # Define the keyboard layout
    keyboard = [['/cancel']]
    reply_markup = ReplyKeyboardMarkup(keyboard, one_time_keyboard=True)

    update.message.reply_text(
        "Let's start linking your Unibuds Account to this chat!\nPlease enter your email address:",
        reply_markup=reply_markup
    )
    return ASK_EMAIL

def ask_email(update: Update, context: CallbackContext) -> None:
    email = update.message.text
    # Here you can add logic to handle the email, e.g., save it or link it to the user's account
    update.message.reply_text(f"Email received: {email}. Thank you!", reply_markup=ReplyKeyboardRemove())
    return ConversationHandler.END

def cancel(update: Update, context: CallbackContext) -> None:
    update.message.reply_text('Linking process cancelled.', reply_markup=ReplyKeyboardRemove())
    return ConversationHandler.END

# Create a conversation handler with the states ASK_EMAIL
conv_handler = ConversationHandler(
    entry_points=[CommandHandler('link_account', start)],
    states={
        ASK_EMAIL: [MessageHandler(Filters.text & ~Filters.command, ask_email)]
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
