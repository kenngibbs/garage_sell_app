from rest_framework import routers
from .api import GarageSellViewSet

router = routers.DefaultRouter()
router.register('garage_sell', GarageSellViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = router.urls
