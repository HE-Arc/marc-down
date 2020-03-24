from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer

from rest_framework.decorators import action

from marcdown.serializers import ProfileSerializer

class UserViewSet(viewsets.ViewSet):
    # get
    def list(self, request):
        user = request.user
        if user.is_authenticated:
            print("authenticated get on api/user")
            serializer = ProfileSerializer(data={
                "name" : user.username,
                # TODO: add info from user.profile once serializers exist
            })
            serializer.is_valid()
            return JsonResponse(serializer.data, safe=False)
        else:
            print("unauthenticated get on api/user")
            return JsonResponse({"salut": "lel"})

    # post
    def create(self, request):
        pass

    @action(detail=False, methods=['post', 'delete'])
    def favorites(self, request):
        pass