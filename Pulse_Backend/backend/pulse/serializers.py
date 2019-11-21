from rest_framework import serializers
from .models import *

class YelpSerializer(serializers.ModelSerializer):
    class Meta:
        model = YelpReviews
        # business = BusinessSerializer(required=False)
        fields = '__all__'

class AllBusinessInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = '__all__'

class BusinessesInOneMileRadiusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        # fields = ('businessID', 'businessName', 'businessURL', 'reviewCount')
        fields = '__all__'

class WordCloudPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = WordCloudPhoto
        fields = '__all__'

class TopBusinessSerializer(serializers.ModelSerializer):
    rating_2019 = serializers.FloatField(read_only=True)
    reviewCount_2019 = serializers.IntegerField(read_only=True)
    class Meta:
        model = Business
        fields = ('businessID', 'businessName', 'businessURL', 'reviewCount',
        'rating_2019', 'reviewCount_2019','longitude','latitude', 'zipcode', 'category')


class YelpReviewSummarySerializer(serializers.ModelSerializer):
    month = serializers.IntegerField(read_only=True)
    reviewCount = serializers.IntegerField(read_only=True)
    rating = serializers.DecimalField(read_only=True,max_digits=2, decimal_places = 1)
    class Meta:
        model = Business
        fields = ('month', 'reviewCount', 'rating')

class MonthReviewAvgSerializer(serializers.ModelSerializer):
    rating = serializers.DecimalField(read_only=True,max_digits=2, decimal_places = 1)
    class Meta:
        model = YelpReviews
        fields = ('rating')
