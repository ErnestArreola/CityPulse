import csv
import psycopg2
import os
import datetime
import django

import sys 

sys.path.insert(0, '/Users/AppleSauce/Desktop/Pulse_Backend/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()


from pulse.models import *


conn = psycopg2.connect("host=127.0.0.1 dbname=pulseDB user=postgres password=admin")
cur = conn.cursor()



# with open('Category.csv', 'r') as f:
#     reader = csv.reader(f)
#     for row in reader:
#         cur.execute(
#         """INSERT INTO pulse_category ("category") VALUES (%s)""", 
#         (
#             row[0]
#         )
#         )





with open('YELP_API_Everything.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader) # Skip the header row.
    for row in reader:
        cur.execute(
        """INSERT INTO pulse_business ("businessID",  "businessName", "address", "longitude", "latitude", "businessURL", "pictureURL", "description", "reviewCount", "zipcode", "category") \
        VALUES (%s, %s, %s, %s,%s, %s,%s, %s,%s, %s, %s)""",
        (row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10]
                
        ))



        conn.commit()



with open('yelp_scrape_result.csv', 'r') as f:
            reader = csv.reader(f)
            next(reader)  # Skip the header row.

            for row in reader:
                

                # review_date = datetime.datetime.fromtimestamp(float(row[3]) /
                #                                  1000).strftime('%d-%m-%Y')


                # print(row[0], row[2], review_date, row[4], row[1])

                cur.execute(
                """INSERT INTO pulse_yelpreviews ("reviewID", "rating", "date", "review", "business_id") \
                VALUES (%s, %s, %s, %s,%s)""",
                (row[0], row[2], row[3], row[4], row[1]))

conn.commit()
