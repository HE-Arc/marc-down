from django.urls import path
from django.contrib import admin

from . import views
from . import api_views

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'session', api_views.SessionViewSet)
router.register(r'user', api_views.UserViewSet)
router.register(r'tags', api_views.TagsViewSet)
router.register(r'note', api_views.NoteViewSet)

urlpatterns = [
    # path('', views.index, name='home'),

    path('api/', include('rest_framework.urls', namespace='rest_framework'))
]