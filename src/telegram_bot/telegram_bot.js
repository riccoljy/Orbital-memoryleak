const TELEGRAM_BOT_TOKEN = process.env.EXPO_PUBLIC_TELEGRAM_API_TOKEN;
console.log("Token = ", TELEGRAM_BOT_TOKEN);
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export const sendTeleMessage = async (chatId, text) => {
  const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
    }),
  });

  const data = await response.json();
  return data;
};