from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
import csv
import os
import django
import sys
from datetime import datetime

sys.path.append('/'.join((os.path.dirname(os.path.abspath(__file__)) +
                          '').split('/')[0:-5]) +
                '/Vitality/backend/lbvitality')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lbvitality.settings')
django.setup()

from business.models import *


def get_weights():
    colnames = ['target']
    colnames1 = ['yelp_review_count', 'yelp_rating', 'google_rating']

    df = pd.read_csv('/'.join(
        (os.path.dirname(os.path.abspath(__file__)) + '').split('/')[0:-5]) +
                     '/LogReg/new_tar.csv',
                     names=colnames)
    df1 = pd.read_csv('/'.join(
        (os.path.dirname(os.path.abspath(__file__)) + '').split('/')[0:-5]) +
                      '/LogReg/new_standardized_data.csv',
                      names=colnames1)

    y = np.array(df.target.tolist())
    X = np.array(df1)

    X_train, X_test, y_train, y_test = train_test_split(X,
                                                        y,
                                                        test_size=0,
                                                        random_state=0)
    logreg = LogisticRegression()
    logreg.fit(X_train, y_train)

    return logreg.coef_  # returns a matrix of weights (coefficients)


def get_target(features, weights):

    max = 0
    target = 0

    for i in range(len(weights)):
        dot_prod = np.dot(weights[i], features)
        if dot_prod > max:
            max = dot_prod
            target = i

    return target


def predict(features, weights):
    # features is an array that consists of num of days business has been
    # in business, the number of yelp review, yelp rating, and google rating

    # features = []

    # array of arrays that contains weights for every class
    # weights = []

    # the features array needs to be in numpy format
    features = np.array(features)
    # the weights array needs to be in numpy format
    weights = np.array(weights)

    #target 3 classes
    # 0 = bad
    # 1 = mediocre
    # 2 = good

    score = get_target(features, weights)
    print(score)
    return score


if __name__ == "__main__":

    #delete all previous tables(we had dummy scores)
    SocialMediaScore.objects.all().delete()
    # get the weights
    weights = get_weights()

    #get latest date
    yelp = YelpHistory.objects.latest('date')
    date = yelp.date

    businesses = Business.objects.all()

    #loop through all businesses
    for b in businesses:

        #see if it has yelp (socialmedia)
        try:
            yelp_history = YelpHistory.objects.get(yelp=b.yelp, date=date)
            temp_days_in_business = datetime.today().date() - b.start_date

            #see if it has google too
            try:

                google_history = GoogleHistory.objects.get(date=date,
                                                           google=b.google)

                features = [
                    (yelp_history.review_count - 121.4111111) / 252.1274822,
                    (yelp_history.rating - 4.027777778) / 0.9521150645,
                    (google_history.rating - 3.915555556) / 1.436358622
                ]
                print(features)
                score = predict(features, weights)
                social_media_score = SocialMediaScore(score=score,
                                                      date=date,
                                                      business=b)
                print(social_media_score)
                print(score)
                social_media_score.save()

            #no google, make the google features 0
            except:
                features = [
                    (yelp_history.review_count - 121.4111111) / 252.1274822,
                    (yelp_history.rating - 4.027777778) / 0.9521150645, 0
                ]
                print(features)
                score = predict(features, weights)
                social_media_score = SocialMediaScore(score=score,
                                                      date=date,
                                                      business=b)
                print(social_media_score)
                print(score)
                social_media_score.save()
        #assign all businesses without socialmedia with a 0
        except:
            social_media_score = SocialMediaScore(score=0,
                                                  date=date,
                                                  business=b)
            print(social_media_score)
            social_media_score.save()

    # #find the latest date in database based on yellp
    # yelp = YelpHistory.objects.latest('date')
    # date = yelp.date

    # #find all the yelp histories on that date
    # yelps_history = YelpHistory.objects.filter(date=date)

    # #for each yelp data, find the google data
    # for i in yelps_history:
    #     temp_business = i.yelp.business
    #     temp_days_in_business = datetime.today().date(
    #     ) - temp_business.start_date

    #     # change days in business after it is fixed
    #     # google ratings for that business
    #     try:
    #         google_history = GoogleHistory.objects.get(
    #             date=date, google__business=temp_business)

    #         features = [
    #             (temp_days_in_business.days - 6751.322222) / 3478.709033,
    #             (i.review_count - 121.4111111) / 252.1274822,
    #             (i.rating - 4.027777778) / 0.9521150645,
    #             (google_history.rating - 3.915555556) / 1.436358622
    #         ]
    #         print(features)
    #         score = predict(features, weights)
    #         social_media_score = SocialMediaScore(score=score,
    #                                               date=date,
    #                                               business=temp_business)
    #         print(social_media_score)
    #         print(score)
    #         social_media_score.save()

    #     # no google ratings for that business
    #     except:
    #         features = [
    #             (temp_days_in_business.days - 6751.322222) / 3478.709033,
    #             (i.review_count - 121.4111111) / 252.1274822,
    #             (i.rating - 4.027777778) / 0.9521150645, 0
    #         ]
    #         print(features)
    #         score = predict(features, weights)
    #         social_media_score = SocialMediaScore(score=score,
    #                                               date=date,
    #                                               business=temp_business)
    #         print(social_media_score)
    #         print(score)
    #         social_media_score.save()
