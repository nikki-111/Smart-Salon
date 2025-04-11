from django.db import models
from appointments.models import Appointment
from services.models import Service
from users.models import Customer

class DailyRevenue(models.Model):
    date = models.DateField(unique=True)
    revenue = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Revenue on {self.date}"

class PopularService(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    count = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.service.name} - {self.count}"

class CustomerRetention(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    last_appointment = models.DateField()

    def __str__(self):
        return f"Retention for {self.customer.user.username}"