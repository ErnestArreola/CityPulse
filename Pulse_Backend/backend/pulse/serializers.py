from rest_framework import serializers
from .models import *



#These are for testing, these should be re-written !!!!

class YelpSerializer(serializers.ModelSerializer):
    class Meta:
        model = YelpReviews
        # business = BusinessSerializer(required=False)
        fields = '__all__'



class AllBusinessInfoSerializer(serializers.ModelSerializer):
    yelp = YelpSerializer()

    class Meta:
        model = Business
        fields = ('businessID')

