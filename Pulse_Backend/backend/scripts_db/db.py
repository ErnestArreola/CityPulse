import csv
import psycopg2
import os
import datetime
import django

import sys

sys.path.append('C:\\Users\\baraj\\Desktop\\csulb.fall19\\CityPulse\\Pulse_Backend\\backend')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from pulse.models import *

conn = psycopg2.connect("host=127.0.0.1 dbname=businessdb user=postgres password=password")
cur = conn.cursor()

#LOADIN BUSINESS MODEL DATASET
with open('C:\\Users\\baraj\\Desktop\\csulb.fall19\\CityPulse\\Pulse_Backend\\backend\\scripts_db\\YELP_API_Everything.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader) # Skip the header row.
    for row in reader:
        cur.execute(
        """INSERT INTO pulse_business ("businessID",  "businessName", "address", "longitude", "latitude", "businessURL", "pictureURL", "description", "reviewCount", "zipcode", "category") \
        VALUES (%s, %s, %s, %s,%s, %s,%s, %s,%s, %s, %s)""",
        (row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10]
        ))

        conn.commit()

#LOADIN YELPREVIEWS MODEL DATASET
with open('C:\\Users\\baraj\\Desktop\\csulb.fall19\\CityPulse\\Pulse_Backend\\backend\\scripts_db\\yelp_scrape_result.csv', 'r', encoding="UTF8") as f:
            reader = csv.reader(f)
            next(reader)  # Skip the header row.

            for row in reader:
                cur.execute(
                """INSERT INTO pulse_yelpreviews ("reviewID", "rating", "date", "review", "business_id") \
                VALUES (%s, %s, %s, %s,%s)""",
                (row[0], row[2], row[3], row[4], row[1]))

conn.commit()
