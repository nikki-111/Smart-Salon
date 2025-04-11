from django.contrib import admin
from django.urls import path, include
from . import views
from appointments import views as appointment_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('services/', views.services, name='services'),
    path('package/', views.package, name='package'),
    path('Gallery/', views.Gallery, name='Gallery'),
    path('testimonial/', views.testimonial, name='testimonial'),
    path('footer/', views.footer, name='footer'),
    path('appointments/', include('appointments.urls')),
    path('payments/', include('payments.urls')),
     path('chatbot/', include('chatbot.urls')),
]