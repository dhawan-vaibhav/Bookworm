from django.shortcuts import render


def index(request):
    return render(request, 'oauth_app\index.html')
