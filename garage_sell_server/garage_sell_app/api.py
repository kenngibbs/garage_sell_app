from .models import GarageSellModel
from rest_framework import viewsets
from .serializer import GarageSellSerializer


class GarageSellViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = GarageSellModel.objects.all()
    serializer_class = GarageSellSerializer