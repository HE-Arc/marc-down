from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer

from rest_framework.decorators import action

from django.contrib.auth.models import User
from marcdown.serializers import ProfileSerializer

class UserViewSet(viewsets.ViewSet):
    # get
    def list(self, request):
        user = request.user
        if user.is_authenticated:
            serializer = ProfileSerializer(user.profile)
            return JsonResponse(serializer.data)
        else:
            # TODO: actual error
            return JsonResponse({"error" : "no auth"})

    # post
    def create(self, request):
        # TODO: register new user using django.contrib.auth
        # or is it the other way around ?
        pass

    @action(detail=False, methods=['post', 'delete'])
    def favorites(self, request):
        # TODO: read note id from request and add / remove it to / from favorites
        pass