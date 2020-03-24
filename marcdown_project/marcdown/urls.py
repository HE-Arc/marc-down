from django.urls import path, include
from django.contrib import admin

from . import views
from . import api_views

from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

app_name = "marcdown"

router = routers.DefaultRouter()
router.register(r'user', api_views.UserViewSet, basename='user')
#router.register(r'tags', api_views.TagsViewSet, basename='tags')
#router.register(r'note', api_views.NoteViewSet, basename='note')

urlpatterns = [    
    path('', include(router.urls)),
]
