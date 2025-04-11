from django.shortcuts import render, redirect

def home(request):
    return render(request, 'home.html')
def about(request):
    return render(request, 'about.html')
def services(request):
    return render(request, 'services.html')
def package(request):
    return render(request, 'package.html')
def Gallery(request):
    return render(request, 'Gallery.html')
def testimonial(request):
    return render(request, 'testimonial.html')
def footer(request):
    return render(request, 'footer.html')


