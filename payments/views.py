from django.shortcuts import render, redirect
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from .models import Payment

def payment(request):
    selected_package = request.GET.get('package')
    context = {'package': selected_package}
    return render(request, 'payments/payment.html', context)
@csrf_exempt
def process_payment(request):
    if request.method == 'POST':
        amount = request.POST.get('amount')
        payment = Payment.objects.create(
            amount=amount,
            status='completed',
            payment_method=request.POST.get('payment_method', 'card')
        )
        return redirect('payments:payment_success')
    return redirect('payments:payment') #change to payment from payment_page

def payment_success(request):
    return render(request, 'payments/success.html')

def payment_cancel(request):
    messages.warning(request, 'Payment was cancelled.')
    return redirect('payments:payment') #change to payment from payment_page