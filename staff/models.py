from django.db import models
from django.contrib.auth.models import User

class Staff(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    services = models.ManyToManyField('services.Service')
    working_hours = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.username