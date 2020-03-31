from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer

from rest_framework.decorators import action
from rest_framework import status

from django.contrib.auth.models import User
from marcdown.serializers import TagSerializer

class TagsViewSet(viewsets.ViewSet):
    # get
    # requires auth
    def list(self, request):
        '''
        Reponds with all the tags that can be found among the
        authenticated user's own notes, shared notes, and fav'd notes,
        along with the corresponding number of notes having each tag
        '''
        user = request.user
        if user.is_authenticated:
            tags = user.profile.get_tags() # {tag_name : count}
            return JsonResponse({"tags" : tags})
        else:
            return JsonResponse(status=status.HTTP_401_UNAUTHORIZED, data={"status" : "false", "message" : "Authentication is required"})
            pass