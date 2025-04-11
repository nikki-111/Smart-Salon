from django.urls import path
from . import views

urlpatterns = [
    path('', views.appointments, name='appointments'),  # Changed from appointment_view to appointments
    path('api/appointments/', views.api_book_appointment, name='api_book_appointment'),
]