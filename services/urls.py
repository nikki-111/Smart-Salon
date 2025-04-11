from django.urls import path
from services import views

urlpatterns = [
    # ... other URLs
    path('services/', views.services_view, name='services'),
]