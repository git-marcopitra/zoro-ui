from django.urls import path
from .views import LatestBlockView

urlpatterns = [
    path('latest-block/', LatestBlockView.as_view(), name='latest-block'),
]