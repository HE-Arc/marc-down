from rest_framework import serializers

from marcdown.models import Note

from .profile_serializer import SimpleProfileSerializer
from .tag_serializer import TagSerializer

class NoteBriefSerializer(serializers.ModelSerializer):
    owner = SimpleProfileSerializer()
    sharers = SimpleProfileSerializer(many=True)
    tags = TagSerializer(many=True)

    class Meta:
        model = Note
        fields = ['id', 'title', 'owner', 'public', 'read_only', 'sharers', 'tags']


class NoteSerializer(serializers.ModelSerializer):
    owner = SimpleProfileSerializer()
    sharers = SimpleProfileSerializer(many=True)
    tags = TagSerializer(many=True)

    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'owner', 'public', 'read_only', 'sharers', 'tags', 'is_owner']
