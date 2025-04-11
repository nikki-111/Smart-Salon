from django.shortcuts import render
from .models import Service

def services_view(request):
    services = Service.objects.all()  # Fetch all services
    return render(request, 'services.html', {'services': services})