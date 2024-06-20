from django.shortcuts import render

# Create your views here.
# users/views.py
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from brew.views import search_by_city, search_by_name, search_by_type, ReviewListCreate

# Your view definitions go here

#urlpatterns = [
    #path('api-token-auth/', obtain_jwt_token),
    #path('api/search/by_city/<str:city>/', search_by_city),
    #path('api/search/by_name/<str:name>/', search_by_name),
    #path('api/search/by_type/<str:type>/', search_by_type),
    #path('api/reviews/<str:brewery_id>/', ReviewListCreate.as_view())


