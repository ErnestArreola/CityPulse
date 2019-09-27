#adds business from yelpToGoogle.csv to postgres database
import csv
import psycopg2
import os
import django
import sys

sys.path.append('/'.join((os.path.dirname(os.path.abspath(__file__)) +
                          '').split('/')[0:-5]) +
                '/Vitality/backend/lbvitality')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lbvitality.settings')
django.setup()

from business.models import *
Google.objects.all().delete()
GoogleHistory.objects.all().delete()

with open(
        '/'.join(
            (os.path.dirname(os.path.abspath(__file__)) + '').split('/')[0:-5])
        + '/Data/social_media/yelpToGoogle2.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row.

    for row in reader:
        business = Business.objects.get(license_num=row[0])
        google = Google(google_name=row[2],
                        google_id=row[3],
                        formatted_address=row[4],
                        latitude=row[5],
                        longtitude=row[6],
                        business=business)
        google.save()

        #give a date of 2019-04-01 since it was wrong formatted
        date_temp = '2019-04-30'
        google_history = GoogleHistory(date=date_temp,
                                       price=row[7],
                                       rating=row[8],
                                       google=google)
        print(google_history)
        try:
            google_history.save()
        except:
            print("")
