from django.http import JsonResponse
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework.renderers import JSONRenderer

from rest_framework.decorators import action

from django.contrib.auth.models import User
from marcdown.models import Note, Profile
from marcdown.serializers import NoteSerializer

class NoteViewSet(viewsets.ViewSet):
    # get
    def retrieve(self, request, pk=None):
        queryset = Note.objects.all()
        note = get_object_or_404(queryset, id=pk)
        serializer = NoteSerializer(note)
        return JsonResponse(serializer.data)
    
    # post (public = True, readonly = False, sharers = [])
    # needs auth
    def create(self, request):
        user = request.user
        if user.is_authenticated:
            data = request.data
            note = Note(
                owner=user.profile,
                public=getattr(data, "public", True),
                read_only=getattr(data, "readOnly", False),
                title="Blank",
                content="",
            )
            for sharer_name in getattr(data, "sharedWith", []):
                try:
                    sharer = User.objects.get(username=sharer_name).profile
                    note.sharers.add(sharer)
                except:
                    # TODO: error when sharer not found ?
                    pass
            note.save()
        else:
            # TODO: error ?
            pass
    
    # update (public, readonly, sharers)
    # needs auth
    def update(self, request, pk=None):
        user = request.user
        if user.is_authenticated:
            data = request.data
            queryset = Note.objects.all()
            note = get_object_or_404(queryset, id=pk)

            if note.allow_update_from_user(user.profile):
                note.public = getattr(data, "public", note.public)
                note.read_only = getattr(data, "readOnly", note.read_only)
                new_sharers_names = getattr(data, "sharedWith", None)
                if new_sharers_names:
                    note.sharers.set([])
                    for sharer_name in new_sharers_names:
                        try:
                            sharer = User.objects.get(username=sharer_name).profile
                            note.sharers.add(sharer)
                        except:
                            # TODO: error when sharer not found ?
                            pass
                note.save()
            else:
                # TODO: error : not allowed
                pass
        else:
            # TODO: error : unauthenticated
            pass

    # patch (diff)
    # needs auth
    def partial_update(self, request, pk=None):
        user = request.user
        if user.is_authenticated:
            data = request.data
            queryset = Note.objects.all()
            note = get_object_or_404(queryset, id=pk)

            if note.allow_update_from_user(user.profile):
                diff = getattr(data, "diff", None)
                if diff:
                    note.update(diff)
                else:
                    # TODO: error : bad args
                    pass
            else:
                # TODO: error : not allowed
                pass
        else:
            # TODO: error : unauthenticated
            pass