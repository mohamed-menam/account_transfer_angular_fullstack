# accounts/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('accounts/', views.list_accounts),
    path('accounts/<str:account_number>/', views.get_account),
    path('transfer/', views.transfer_funds),
    path('import/', views.import_accounts),
]
