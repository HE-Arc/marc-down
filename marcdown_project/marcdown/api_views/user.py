from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer

from rest_framework.decorators import action
from rest_framework import status

from django.contrib.auth.models import User
from marcdown.models import Note, Profile
from marcdown.serializers import ProfileSerializer
from django.shortcuts import get_object_or_404

class UserViewSet(viewsets.ViewSet):
    # get
    def list(self, request):
        '''
        Gives all the information pertaining to the authenticated user
        '''
        user = request.user
        if user.is_authenticated:
            serializer = ProfileSerializer(user.profile)
            return JsonResponse(serializer.data)
        else:
            return JsonResponse(status=status.HTTP_401_UNAUTHORIZED, data={"status" : False, "message" : "Authentication is required"})
            pass

    @action(detail=False, methods=['post'])
    def favorites(self, request):
        '''
        Adds the given note to the authenticated user's favorites
        '''
        user = request.user
        if user.is_authenticated:
            note_id = request.data.get("noteId", -1)
            queryset = Note.objects.all()
            note = get_object_or_404(queryset, id=note_id)

            if note.allow_reading_by_user(profile):
                profile.favorites.add(note)
                # TODO: return updated user.get_tags() ??
        else:
            return JsonResponse(status=status.HTTP_401_UNAUTHORIZED, data={"status" : False, "message" : "Authentication is required"})
    
    @favorites.mapping.delete
    def remove_favorite(self, request):
        '''
        Removes the given note from the authenticated user's favorites
        '''
        user = request.user
        if user.is_authenticated:
            note_id = request.data.get("noteId", -1)
            queryset = Note.objects.all()
            note = get_object_or_404(queryset, id=note_id)

            profile.favorites.remove(note)
            # TODO: return updated user.get_tags() ??
        else:
            return JsonResponse(status=status.HTTP_401_UNAUTHORIZED, data={"status" : False, "message" : "Authentication is required"})
