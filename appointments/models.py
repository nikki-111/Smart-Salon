from django.db import models
import datetime

class Appointment(models.Model):
    SERVICE_CHOICES = [
        ('consultation', 'Consultation'),
        ('checkup', 'Regular Checkup'),
        ('emergency', 'Emergency'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100, default="Guest")  # Default name
    email = models.EmailField(default="example@example.com")  # Default email
    phone = models.CharField(max_length=20, blank=True)
    service = models.CharField(max_length=50, choices=SERVICE_CHOICES, default='consultation')  # Default service
    date = models.DateField(default=datetime.date.today)  # Default date
    time = models.TimeField(default=datetime.time(9, 0))  # Default time (9:00 AM)
    notes = models.TextField(blank=True, default="No additional notes.")  # Default notes
    created_at = models.DateTimeField(auto_now_add=True)  # Auto timestamp

    def __str__(self):
        return f"{self.name} - {self.date} {self.time}"
