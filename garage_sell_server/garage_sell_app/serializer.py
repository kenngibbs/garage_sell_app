from rest_framework import serializers
from .models import GarageSellModel
# Create your models here.


class GarageSellSerializer(serializers.ModelSerializer):
    class Meta:
        model = GarageSellModel
        fields = '__all__'