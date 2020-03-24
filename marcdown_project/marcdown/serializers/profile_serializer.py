from rest_framework import serializers

class ProfileSerializer(serializers.Serializer):
    name = serializers.CharField()
    # own_notes = NoteBriefSerializer()
    # shared_notes = NoteBriefSerializer()
    # faved_notes = NoteBriefSerializer()
    # tags = TagSerializer()