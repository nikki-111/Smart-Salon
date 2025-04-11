from django.shortcuts import render
from django.http import JsonResponse
from rapidfuzz import fuzz

def chatbot_view(request):
    return render(request, 'chatbot.html')

def get_response(request):
    user_message = request.GET.get('message', '').lower()

    if fuzz.partial_ratio(user_message, "hello") > 70 or \
       fuzz.partial_ratio(user_message, "hi") > 70 or \
       fuzz.partial_ratio(user_message, "hey") > 70:
        bot_response = 'Hi there! 👋 Welcome to Smart Salon. How can I assist you today?'

    elif any(word in user_message for word in ['services', 'what do you offer', 'treatments']):
        bot_response = (
            "We offer a wide range of services including:\n"
            "- 💅 Manicure & Pedicure\n"
            "- 💇 Hairstyling & Haircuts\n"
            "- 💄 Makeup & Bridal Makeup\n"
            "- 🧖‍♀️ Facials & Skin Treatments\n"
            "- 🧵 Eyebrow Design\n"
            "- ✨ Nail Art & Waxing\n"
            "Feel free to ask about any specific service!"
        )

    elif any(word in user_message for word in ['bridal', 'packages', 'plans', 'deals']):
        bot_response = (
            "Our bridal packages include:\n"
            "👑 Bronze: Hairstyle, Makeup, Nails\n"
            "🥈 Silver: + Hair Removal, Eyebrow Design\n"
            "🥇 Gold: + Reserved Bridal Room\n"
            "💎 Diamond: All services + Skin Cleansing + Fruit Table\n"
            "You can view & book them on the Packages page! Do you want to know more details about a specific package?"
        )

    elif any(word in user_message for word in ['price', 'cost', 'how much', 'rate']):
        bot_response = (
            "Prices vary by service:\n"
            "- Haircuts from ₹200\n"
            "- Facials from ₹500\n"
            "- Bridal Packages from ₹2500\n"
            "Want exact pricing for a specific service or package?"
        )

    elif any(word in user_message for word in ['timing', 'time','open', 'close','closing','hours']):
        bot_response = 'We’re open every day from 9 AM to 9 PM 🕘. Walk-ins welcome! Do you want to know if we are open on a specific date?'

    elif any(word in user_message for word in ['book', 'appointment', 'schedule']):
        bot_response = 'You can book an appointment online or call us at 📞 +91-9827839841. What service and time are you interested in?'

    elif any(word in user_message for word in ['location', 'where', 'address']):
        bot_response = 'We are on the 2nd Floor of City Center Mall 📍 Main Road. Need directions?'

    elif any(word in user_message for word in ['contact', 'call', 'phone', 'number']):
        bot_response = 'Reach us at 📞 +91-9827839841 for any queries or bookings. How can I help you further?'

    elif any(word in user_message for word in ['haircut', 'hairstyle']):
        bot_response = "We offer various haircuts and hairstyling services. Are you interested in a specific style or want to know more about our stylists?"

    elif any(word in user_message for word in ['facial', 'skin treatment']):
        bot_response = "We have a range of facials and skin treatments to suit different skin types. Are you looking for something specific like a glow facial or anti-aging treatment?"

    elif any(word in user_message for word in ['manicure', 'pedicure', 'nails']):
        bot_response = "Our nail services include manicures, pedicures, and nail art. Are you interested in a classic manicure or something more elaborate?"

    elif any(word in user_message for word in ['makeup', 'bridal makeup']):
        bot_response = "We offer professional makeup services for all occasions, including bridal makeup. Do you have a specific event in mind?"

    elif any(word in user_message for word in ['waxing', 'hair removal']):
        bot_response = "We provide waxing and other hair removal services. Do you have any specific areas you're interested in?"

    elif any(word in user_message for word in ['eyebrow', 'threading', 'shaping']):
        bot_response = "We offer eyebrow shaping and design services. Would you like to know more about our techniques?"

    elif any(word in user_message for word in ['offers', 'discounts', 'deals']):
        bot_response = "We occasionally have special offers and discounts. Please check our website or ask us directly for current promotions!"

    elif any(word in user_message for word in ['stylist', 'staff', 'experts']):
        bot_response = "Our team consists of experienced and skilled stylists and beauty experts. Are you interested in a specific stylist or service?"

    elif any(word in user_message for word in ['feedback', 'review', 'experience']):
        bot_response = "We value your feedback! You can leave a review on our website or social media pages. How was your experience with us?"

    elif any(word in user_message for word in ['parking']):
        bot_response = "Yes, City Center Mall has ample parking available for visitors."

    elif any(word in user_message for word in ['payment', 'methods']):
        bot_response = "We accept various payment methods including cash, credit/debit cards, and UPI."

    else:
        bot_response = "Sorry, I didn’t understand that 🤔. Try asking about services, pricing, timing, booking, or our location. How else can I help you?"

    return JsonResponse({'response': bot_response})