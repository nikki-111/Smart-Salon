from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import AppointmentForm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.urls import reverse

def appointments(request):
    if request.method == 'POST':
        form = AppointmentForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Appointment booked successfully!')
            return redirect('home')  # Redirect to home page in main app
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f"{field}: {error}")
    else:
        form = AppointmentForm()
    
    return render(request, 'appointments/appointments.html', {'form': form})

@csrf_exempt
def api_book_appointment(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            form = AppointmentForm(data)
            
            if form.is_valid():
                appointment = form.save()
                return JsonResponse({
                    'status': 'success',
                    'message': 'Appointment booked successfully!',
                    'redirect_url': reverse('home'),  # Or use reverse('home')
                })
            else:
                errors = {}
                for field, error_list in form.errors.get_json_data().items():
                    errors[field] = [{'message': error['message']} for error in error_list]
                
                return JsonResponse({
                    'status': 'error',
                    'errors': errors
                }, status=400)
                
        except json.JSONDecodeError:
            return JsonResponse({
                'status': 'error',
                'message': 'Invalid JSON data'
            }, status=400)
    
    return JsonResponse({
        'status': 'error',
        'message': 'Invalid request method'
    }, status=405)
