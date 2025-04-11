from django import forms
from .models import Appointment
from django.core.exceptions import ValidationError
from datetime import date, time
from dateutil.relativedelta import relativedelta  # Import this!

class AppointmentForm(forms.ModelForm):
    class Meta:
        model = Appointment
        fields = ['name', 'email', 'phone', 'service', 'date', 'time', 'notes']
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),
            'time': forms.TimeInput(attrs={'type': 'time'}),
            'notes': forms.Textarea(attrs={'rows': 4}),
        }
        labels = {
            'name': 'Full Name',
            'phone': 'Phone Number',
            'notes': 'Additional Notes'
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        today = date.today()
        self.fields['date'].widget.attrs['min'] = today
        self.fields['date'].widget.attrs['max'] = (today + relativedelta(months=3))

    def clean_date(self):
        data = self.cleaned_data['date']
        if data < date.today():
            raise ValidationError("You can't book an appointment in the past!")
        return data

    def clean_time(self):
        data = self.cleaned_data['time']
        if data < time(9, 0) or data >= time(17, 0):
            raise ValidationError("We're only open from 9:00 AM to 5:00 PM")
        return data

    def clean_email(self):
        data = self.cleaned_data['email'].lower()
        if Appointment.objects.filter(email=data, date=self.cleaned_data.get('date')).exists():
            raise ValidationError("You already have an appointment on this date")
        return data
