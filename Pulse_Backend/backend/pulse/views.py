from django.shortcuts import render
from rest_framework import generics, viewsets
from .models import *
from .serializers import *
from django.db import models
from django.db.models import Func
from django.db.models import Count, Avg
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action


from django.db.models import Count, Q
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.core import serializers

from django.shortcuts import get_object_or_404

class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = AllBusinessInfoSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['GET'])
    def get_rev_data(self, request, pk='reviewID'):
        reviews = YelpReviews.objects.filter(business=pk)
        serializer = YelpSerializer(reviews, many=True)
        response = {'message': 'Review Data', 'result': serializer.data}
        return Response(response, status=status.HTTP_200_OK)

    @action(detail=True, methods=['GET'])
    def get_avg_data(self, request, pk='reviewID'):
        data = []
        for count in range(11):
            reviews = YelpReviews.objects.filter(business=pk, date__month=count+1)
            sum = 0
            for x in reviews:
                sum = sum + x.rating
            listLength = len(reviews)
            if (listLength == 0):
                listLength = 1
            avg = sum / listLength
            data.append(avg)

        response = {'message': 'Review Data', 'result': data}
        return Response(response, status=status.HTTP_200_OK)

class YelpReviewViewSet(viewsets.ModelViewSet):
    queryset = YelpReviews.objects.all()
    serializer_class = YelpSerializer

    def get_queryset(self):
        req = self.request
        yelp_id = req.query_params['yelpid']
        self.queryset = YelpReviews.objects.filter(business__exact=yelp_id).order_by('date')
        return self.queryset



class YelpMonthlyReviewViewSet(viewsets.ModelViewSet):
    queryset = YelpReviews.objects.all()
    serializer_class = YelpSerializer

    def get_queryset(self):
        req = self.request
        yelp_id = req.query_params['yelpid']
        month = req.query_params['month']
        self.queryset = YelpReviews.objects.filter(business__exact=yelp_id).filter(date__month = month).order_by('-date')
        return self.queryset



class Month(Func):
    function = 'EXTRACT'
    template = '%(function)s(MONTH from %(expressions)s)'
    output_field = models.IntegerField()


class YelpMonthReviewSummaryViewSet(viewsets.ModelViewSet):
    queryset = YelpReviews.objects.all()
    serializer_class = YelpReviewSummarySerializer

    def get_queryset(self):
        req = self.request
        yelp_id = req.query_params['yelpid']
        self.queryset = (YelpReviews.objects.filter(business__exact=yelp_id)
            .annotate(month = Month('date'))
            .values('month')
            .annotate(reviewCount=Count('rating'))
            .annotate(rating=Avg('rating'))
        )
        return self.queryset



class OneMileRadiusViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessesInOneMileRadiusSerializer

    def get_queryset(self):
        req = self.request
        yelp_id = req.query_params['yelpid']
        biz = Business.objects.filter(businessID__exact=yelp_id).first()
        lat = float(biz.latitude)
        lng = float(biz.longitude)
        radius = float(1.609)

        query = """SELECT "businessID", "businessName", "businessURL", "reviewCount" FROM pulse_business
               GROUP BY "businessID", "businessName", "businessURL", "reviewCount"
               HAVING (6367*acos(cos(radians(%2f))
               *cos(radians("latitude"))*cos(radians("longitude")-radians(%2f))
               +sin(radians(%2f))*sin(radians("latitude")))) < %2f """ % (
        lat,
        lng,
        lat,
        radius
        )

        self.queryset = Business.objects.raw(query)
        return self.queryset



class TopInOneMileRadiusViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = TopBusinessSerializer

    def get_queryset(self):
        req = self.request
        yelp_id = req.query_params['yelpid']
        biz = Business.objects.filter(businessID__exact=yelp_id).first()
        lat = float(biz.latitude)
        lng = float(biz.longitude)
        radius = float(1.609)

        query = """ SELECT "businessID", "businessName", "businessURL", "reviewCount", COUNT(rating) as "ReviewCount_2019", AVG(rating) as "Rating_2019", (AVG(rating) * COUNT(rating)) as "Score"
        FROM pulse_yelpreviews re INNER JOIN
                (SELECT "businessID", "businessName", "businessURL", "reviewCount" FROM pulse_business
                WHERE "category" = 'Food'
                GROUP BY "businessID", "businessName", "businessURL", "reviewCount"
                HAVING (6367*acos(cos(radians(%2f))
                *cos(radians("latitude"))*cos(radians("longitude")-radians(%2f))
                +sin(radians(%2f))*sin(radians("latitude")))) < %2f)  ra
                ON re."business_id" = ra."businessID"
        GROUP BY "businessID", "businessName", "businessURL", "reviewCount"
        HAVING AVG(rating) > 4
        ORDER BY "ReviewCount_2019" DESC
        """ % (
        lat,
        lng,
        lat,
        radius
        )

        self.queryset = Business.objects.raw(query)[:1]
        return self.queryset



















# class Rating(viewsets.ModelViewSet):
#     reviewCount = Count('business_id')

#     queryset = YelpReviews.objects.all()
#     serializer_class = YelpRatingSerializer
#     # biz = YelpReviews.objects.filter(businessID__exact=yelp_id).first()
#     def get_queryset(self):
#         req = self.request
#         yelp_id = req.query_params['yelpid']
#         query = """SELECT "business_id", "reviewID", AVG(rating) FROM pulse_yelpreviews
#                 WHERE "business_id" = '%s'
#                 GROUP BY "business_id", "reviewID"
#                 """ % (yelp_id)

#         self.queryset = YelpReviews.objects.raw(query)
#         return self.queryset


# class ZipCodeRatioViewSet(viewsets.ModelViewSet):
#     delinquent = Count('zipcode', filter=~Q(status='Active'))
#     active = Count('zipcode', filter=Q(status='Active'))
#     queryset = Business.objects.values('zipcode').annotate(
#         business_count=Count('zipcode')).annotate(
#             delinquent_count=delinquent).annotate(active_count=active)
#     permission_classes = [permissions.AllowAny]
#     serializer_class = ZipCodeRatioSerializer





# query = """SELECT "businessID", "businessName", "businessURL", "reviewCount", ("reviewCount" * ) AS "weight"
#                 FROM pulse_business INNER JOIN pulse_yelpreviews
#                GROUP BY "businessID", "businessName", "businessURL", "reviewCount",
#                HAVING (6367*acos(cos(radians(%2f))
#                *cos(radians("latitude"))*cos(radians("longitude")-radians(%2f))
#                +sin(radians(%2f))*sin(radians("latitude")))) < %2f ORDER BY "reviewCount" DESC """ % (
#         lat,
#         lng,
#         lat,
#         radius
#         )






# SELECT "business_id", AVG(rating) as "Rating" FROM pulse_yelpreviews
# GROUP BY "business_id"
# ORDER BY "Rating" DESC


#highest rating in 2019
# SELECT "business_id", AVG(rating) as "Rating", "businessURL" FROM pulse_yelpreviews re INNER JOIN
#         (SELECT "businessID", "businessName", "businessURL", "reviewCount" FROM pulse_business
#         GROUP BY "businessID", "businessName", "businessURL", "reviewCount"
#         HAVING (6367*acos(cos(radians(33.8549099))
#         *cos(radians("latitude"))*cos(radians("longitude")-radians(-118.19651))
#         +sin(radians(33.8549099))*sin(radians("latitude")))) < 1.609)  ra
#         ON re."business_id" = ra."businessID"
#         GROUP BY "business_id", "businessURL"
#         ORDER BY "Rating" DESC



# Highest rating * review count
# SELECT "business_id", "businessURL", AVG(rating) as "Rating", COUNT(rating) as "Review_Count", (AVG(rating) * COUNT(rating)) as "Score"
# FROM pulse_yelpreviews re INNER JOIN
#         (SELECT "businessID", "businessName", "businessURL", "reviewCount" FROM pulse_business
#         WHERE "cate"
# 		GROUP BY "businessID", "businessName", "businessURL", "reviewCount"
#         HAVING (6367*acos(cos(radians(33.8549099))
#         *cos(radians("latitude"))*cos(radians("longitude")-radians(-118.19651))
#         +sin(radians(33.8549099))*sin(radians("latitude")))) < 1.609)  ra
#         ON re."business_id" = ra."businessID"
# GROUP BY "business_id", "businessURL"
# ORDER BY "Score" DESC


#Food category only, rating above 4 stars only, ordy by count of 2019 reviews
# SELECT "business_id", "businessName", "businessURL", "reviewCount", COUNT(rating) as "2019_Review_Count", AVG(rating) as "Rating", (AVG(rating) * COUNT(rating)) as "Score"
# FROM pulse_yelpreviews re INNER JOIN
#         (SELECT "businessID", "businessName", "businessURL", "reviewCount" FROM pulse_business
#         WHERE "category" = 'Food'
# 		GROUP BY "businessID", "businessName", "businessURL", "reviewCount"
#         HAVING (6367*acos(cos(radians(33.8549099))
#         *cos(radians("latitude"))*cos(radians("longitude")-radians(-118.19651))
#         +sin(radians(33.8549099))*sin(radians("latitude")))) < 1.609)  ra
#         ON re."business_id" = ra."businessID"
# GROUP BY "business_id", "businessName", "businessURL", "reviewCount"
# HAVING AVG(rating) > 4
# ORDER BY "2019_Review_Count" DESC
