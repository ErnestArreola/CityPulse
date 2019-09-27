#adds business from yelp.csv to postgres database
import csv
import os
import django
import sys

sys.path.append('/'.join((os.path.dirname(os.path.abspath(__file__)) +
                          '').split('/')[0:-5]) +
                '/Vitality/backend/lbvitality')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lbvitality.settings')
django.setup()

from business.models import *

Yelp.objects.all().delete()
YelpHistory.objects.all().delete()

#yelp.csv
with open(
        '/'.join(
            (os.path.dirname(os.path.abspath(__file__)) + '').split('/')[0:-5])
        + '/Data/social_media/yelp_507_4435.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row.

    for row in reader:
        business = Business.objects.get(license_num=row[0])
        yelp = Yelp(yelp_name=row[2],
                    yelp_id=row[3],
                    image_url=row[4],
                    is_claimed=bool(row[5]),
                    is_closed=bool(row[6]),
                    address=row[7],
                    city=row[8],
                    state=row[9],
                    country=row[10],
                    zipcode=row[11],
                    transactions=row[15],
                    url=row[16],
                    business=business)
        # print(row[2])
        # print(row[3])
        # print(row[4])
        # print(row[5])
        # print(row[6])
        # print(row[7])
        # print(row[8])
        # print(row[9])
        # print(row[10])
        # print(row[11])
        # print(row[15])
        # print(row[16])
        # print(type(row[5]))
        # print(type(row[6]))
        yelp.save()
        #give a date of 2019-04-01 since it was wrong formatted
        date_temp = '2019-04-30'
        yelp_history = YelpHistory(date=date_temp,
                                   price=row[12],
                                   rating=row[13],
                                   review_count=row[14],
                                   yelp=yelp)
        try:
            yelp_history.save()
            print(yelp_history)
        except:
            print("")