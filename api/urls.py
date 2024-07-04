
from . import views
from .views import *

from django.urls import path, re_path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
path('',views.index, name="index"),
 path('api/login/', views.login_view, name='login'),
  path('api/logout/', views.logout_view, name='logout'),
  path('api/hello/', HelloAPIView.as_view(), name='hello-api'),
  path('api/entries/', EntryListCreateAPIView.as_view(), name='entry-list-create'),
  path('api/register/', views.register, name='register'),
   path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  re_path(r'^(?:.*)/?$', views.index),
   
] 