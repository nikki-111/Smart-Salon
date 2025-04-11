from django.db import models

class Review(models.Model):
    customer = models.ForeignKey('users.Customer', on_delete=models.CASCADE)
    staff = models.ForeignKey('staff.Staff', on_delete=models.CASCADE)
    service = models.ForeignKey('services.Service', on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.user.username} - {self.service.name} - {self.rating}"