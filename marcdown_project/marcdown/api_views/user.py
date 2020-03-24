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
            serializer = ProfileSerializer(user.profile)
            return JsonResponse(serializer.data, safe=False)
        else:
            # TODO: actual error
            return JsonResponse({"error" : "no auth"})

    # post
    def create(self, request):
        pass

    @action(detail=False, methods=['post', 'delete'])
    def favorites(self, request):
        pass