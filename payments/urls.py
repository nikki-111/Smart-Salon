from django.urls import path
from . import views

app_name = 'payments'

urlpatterns = [
    path('payment/', views.payment, name='payment'), #changed to payment
    path('process/', views.process_payment, name='process_payment'),
    path('success/', views.payment_success, name='payment_success'),
    path('cancel/', views.payment_cancel, name='payment_cancel'),
]