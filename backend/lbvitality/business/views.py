from django.shortcuts import render
from .models import *
from rest_framework import viewsets, permissions, generics
from .serializers import *

from django.db.models import Count, Q

from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.core import serializers

from django.shortcuts import get_object_or_404


class SocialMediaScoreViewSet(viewsets.ModelViewSet):
    queryset = SocialMediaScore.objects.all()[0:10]
    permission_classes = [permissions.AllowAny]
    serializer_class = SocialMediaScoreSerializer

    lookup_field = 'business'

    def retrieve(self, request, business=None):
        queryset = SocialMediaScore.objects.filter(
            business=business).order_by('date')[0]
        serializer = SocialMediaScoreSerializer(queryset)
        return Response(serializer.data)


class YelpHistoryViewSet(viewsets.ModelViewSet):
    queryset = YelpHistory.objects.all()[0:10]
    permission_classes = [permissions.AllowAny]
    serializer_class = YelpHistorySerializer

    lookup_field = 'yelp'

    def retrieve(self, request, yelp=None):
        queryset = YelpHistory.objects.filter(yelp=yelp).order_by('-date')[0]
        serializer = YelpHistorySerializer(queryset)
        return Response(serializer.data)


class GoogleHistoryViewSet(viewsets.ModelViewSet):
    queryset = GoogleHistory.objects.all()[0:10]
    permission_classes = [permissions.AllowAny]
    serializer_class = GoogleHistorySerializer

    lookup_field = 'google'

    def retrieve(self, request, google=None):
        queryset = GoogleHistory.objects.filter(
            google=google).order_by('-date')[0]
        serializer = GoogleHistorySerializer(queryset)
        return Response(serializer.data)


class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = AllBusinessInfoSerializer


class ZipCodeRatioViewSet(viewsets.ModelViewSet):
    delinquent = Count('zipcode', filter=~Q(status='Active'))
    active = Count('zipcode', filter=Q(status='Active'))
    queryset = Business.objects.values('zipcode').annotate(
        business_count=Count('zipcode')).annotate(
            delinquent_count=delinquent).annotate(active_count=active)
    permission_classes = [permissions.AllowAny]
    serializer_class = ZipCodeRatioSerializer


class BusinessListViewSet(viewsets.ModelViewSet):
    queryset = SocialMediaScore.objects.all()
    serializer_class = SocialMediaScoreSerializer

    def get_queryset(self):
        req = self.request
        zipcode = req.query_params['zipcode']
        startindex = int(req.query_params['startindex'])
        endIndex = int(req.query_params['endindex'])

        # self.queryset = SocialMediaScore.objects.select_related(
        #     'business').filter(business__zipcode=zipcode).order_by(
        #         'score', '-date',
        #         'business__employee_num')[startindex:endIndex]
        self.queryset = SocialMediaScore.objects.select_related(
            'business').filter(business__zipcode=zipcode).exclude(
                business__yelp=None).order_by(
                    '-date', 'score',
                    '-business__start_date')[startindex:endIndex]
        return self.queryset
