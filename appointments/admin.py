from django.contrib import admin
from .models import Appointment

class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'service', 'date', 'time', 'created_at')
    list_filter = ('service', 'date', 'created_at')
    search_fields = ('name', 'email', 'phone')
    ordering = ('-date', '-time')
    date_hierarchy = 'date'
    readonly_fields = ('created_at',)
    
    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Appointment Details', {
            'fields': ('service', 'date', 'time', 'notes')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

admin.site.register(Appointment, AppointmentAdmin)