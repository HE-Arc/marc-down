from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer

from rest_framework.decorators import action

from django.contrib.auth.models import User
from marcdown.serializers import TagSerializer

class TagsViewSet(viewsets.ViewSet):
    # get
    # requires auth
    def list(self, request):
        user = request.user
        if user.is_authenticated:
            tags = user.profile.get_tags() # {tag_name : count}
            return JsonResponse({tags : tags})
        else:
            # TODO: error : unauthenticated
            pass