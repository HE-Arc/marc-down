from rest_framework import serializers

from marcdown.models import Profile

class SimpleProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.username')

    class Meta:
        model = Profile
        fields = ['id', 'name']

from .note_serializers import NoteBriefSerializer

class ProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.username')
    own_notes = NoteBriefSerializer(many=True)
    shared_notes = NoteBriefSerializer(many=True)
    favorites = NoteBriefSerializer(many=True)
    # tags = TagSerializer(many=True)

    class Meta:
        model = Profile
        fields = ['id', 'name', 'own_notes', 'shared_notes', 'favorites']