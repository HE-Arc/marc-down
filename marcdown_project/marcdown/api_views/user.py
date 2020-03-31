from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer

from rest_framework.decorators import action

from django.contrib.auth.models import User
from marcdown.serializers import ProfileSerializer

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
            # TODO: error : unauthenticated
            pass

    # post
    def create(self, request):
        # TODO: register new user using django.contrib.auth
        # or is it the other way around ?
        pass

    @action(detail=False, methods=['post'])
    def favorites(self, request):
        '''
        Adds the given note to the authenticated user's favorites
        '''
        user = request.user
        if user.is_authenticated:
            note_id = getattr(request.data, "noteId", -1)
            queryset = Note.objects.all()
            note = get_object_or_404(queryset, id=note_id)

            if note.allow_reading_by_user(profile):
                profile.favorites.add(note)
                # TODO: return updated user.get_tags() ??
        else:
            # TODO: error : unauthenticated
            pass
    
    @favorites.mapping.delete
    def remove_favorite(self, request):
        '''
        Removes the given note from the authenticated user's favorites
        '''
        user = request.user
        if user.is_authenticated:
            note_id = getattr(request.data, "noteId", -1)
            queryset = Note.objects.all()
            note = get_object_or_404(queryset, id=note_id)

            profile.favorites.remove(note)
            # TODO: return updated user.get_tags() ??
        else:
            # TODO: error : unauthenticated
            pass
