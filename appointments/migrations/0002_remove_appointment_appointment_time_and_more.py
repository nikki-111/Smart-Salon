# Generated by Django 5.1.7 on 2025-04-01 05:20

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='appointment_time',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='customer',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='staff',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='status',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='updated_at',
        ),
        migrations.AddField(
            model_name='appointment',
            name='date',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name='appointment',
            name='email',
            field=models.EmailField(default='example@example.com', max_length=254),
        ),
        migrations.AddField(
            model_name='appointment',
            name='name',
            field=models.CharField(default='Guest', max_length=100),
        ),
        migrations.AddField(
            model_name='appointment',
            name='notes',
            field=models.TextField(blank=True, default='No additional notes.'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='phone',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AddField(
            model_name='appointment',
            name='time',
            field=models.TimeField(default=datetime.time(9, 0)),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='service',
            field=models.CharField(choices=[('consultation', 'Consultation'), ('checkup', 'Regular Checkup'), ('emergency', 'Emergency'), ('other', 'Other')], default='consultation', max_length=50),
        ),
    ]
