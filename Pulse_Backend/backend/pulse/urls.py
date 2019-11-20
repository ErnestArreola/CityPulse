from django.urls import path
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

router.register('business', BusinessViewSet, 'business')
router.register('yelpreview', YelpReviewViewSet, 'yelpreview')
router.register('yelpmonthlyreview', YelpMonthlyReviewViewSet, 'yelpMonthlyReview')
router.register('yelpmonthlyreviewsummary', YelpMonthReviewSummaryViewSet, 'yelpMonthlyReviewSummary')
router.register('businessinonemileradius', OneMileRadiusViewSet, 'onemileradius')
router.register('topbusinessinonemileradius', TopInOneMileRadiusViewSet, 'toponemileradius')


urlpatterns = router.urls