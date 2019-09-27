from rest_framework import routers
from .views import *
from django.urls import path

router = routers.DefaultRouter()
router.register(r'business', BusinessViewSet, 'business')
router.register('businesslist', BusinessListViewSet, 'businesslist')
router.register('zipcoderatio', ZipCodeRatioViewSet, 'zipcoderatio')
router.register('socialmediascore', SocialMediaScoreViewSet,
                'socialmediascore')
router.register('yelphistory', YelpHistoryViewSet, 'yelphistory')
router.register('googlehistory', GoogleHistoryViewSet, 'googlehistory')

urlpatterns = router.urls
