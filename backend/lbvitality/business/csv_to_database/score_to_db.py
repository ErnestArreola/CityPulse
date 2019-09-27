import csv
import os
import django
import sys

sys.path.append('/'.join((os.path.dirname(os.path.abspath(__file__)) +
                          '').split('/')[0:-5]) +
                '/Vitality/backend/lbvitality')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lbvitality.settings')
django.setup()
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lbvitality.settings')
django.setup()

from business.models import *

with open(
        '/'.join(
            (os.path.dirname(os.path.abspath(__file__)) + '').split('/')[0:-5])
        + '/Data/social_media/dummy_score.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row.
    for row in reader:
        business = Business.objects.get(license_num=row[0])
        score = SocialMediaScore(date=row[1], score=row[2], business=business)
        score.save()
