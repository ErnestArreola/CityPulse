import csv
import psycopg2
import os
import datetime

conn = psycopg2.connect(
    "host=127.0.0.1 dbname=businessdb user=postgres password=admin")
cur = conn.cursor()

license_type = "BU"
status = "CollcInBus"
employee_num = "3"
company_type = "LLC"
business_type = "Apartment House"
property_type = "COM"
address = "123 dummy business street"

processed_date = datetime.datetime.fromtimestamp(
    float("1435540000000") / 1000).strftime('%Y-%m-%d')
start_date = datetime.datetime.fromtimestamp(float("1435540000000") /
                                             1000).strftime('%Y-%m-%d')
expired_date = None
try:
    e_date = datetime.datetime.fromtimestamp(float("1530400000000") /
                                             1000).strftime('%Y-%m-%d')
except:
    e_date = None

zipcode = "90804"
for i in range(0, 200):
    license_num = zipcode + "_DUMMY_" + str(i)
    name = zipcode + "_Dummy_Name_" + str(i)
    dba_name = zipcode + "_Dummy_DBA_Name_" + str(i)
    cur.execute(
        """INSERT INTO business_business ("license_num","name","dba_name","license_type","status","processed_date","start_date", \
            "expire_date","employee_num","company_type","business_type","property_type","address","zipcode") \
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
        (license_num, name, dba_name, license_type, status, processed_date,
         start_date, expired_date, employee_num, company_type, business_type,
         property_type, address, zipcode))

zipcode = "90805"
for i in range(0, 400):
    license_num = zipcode + "_DUMMY_" + str(i)
    name = zipcode + "_Dummy_Name_" + str(i)
    dba_name = zipcode + "_Dummy_DBA_Name_" + str(i)
    cur.execute(
        """INSERT INTO business_business ("license_num","name","dba_name","license_type","status","processed_date","start_date", \
            "expire_date","employee_num","company_type","business_type","property_type","address","zipcode") \
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
        (license_num, name, dba_name, license_type, status, processed_date,
         start_date, expired_date, employee_num, company_type, business_type,
         property_type, address, zipcode))

zipcode = "90806"
for i in range(0, 200):
    license_num = zipcode + "_DUMMY_" + str(i)
    name = zipcode + "_Dummy_Name_" + str(i)
    dba_name = zipcode + "_Dummy_DBA_Name_" + str(i)
    cur.execute(
        """INSERT INTO business_business ("license_num","name","dba_name","license_type","status","processed_date","start_date", \
            "expire_date","employee_num","company_type","business_type","property_type","address","zipcode") \
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
        (license_num, name, dba_name, license_type, status, processed_date,
         start_date, expired_date, employee_num, company_type, business_type,
         property_type, address, zipcode))


zipcode = "90808"
for i in range(0, 400):
    license_num = zipcode + "_DUMMY_" + str(i)
    name = zipcode + "_Dummy_Name_" + str(i)
    dba_name = zipcode + "_Dummy_DBA_Name_" + str(i)
    cur.execute(
        """INSERT INTO business_business ("license_num","name","dba_name","license_type","status","processed_date","start_date", \
            "expire_date","employee_num","company_type","business_type","property_type","address","zipcode") \
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
        (license_num, name, dba_name, license_type, status, processed_date,
         start_date, expired_date, employee_num, company_type, business_type,
         property_type, address, zipcode))

zipcode = "90813"
for i in range(0, 200):
    license_num = zipcode + "_DUMMY_" + str(i)
    name = zipcode + "_Dummy_Name_" + str(i)
    dba_name = zipcode + "_Dummy_DBA_Name_" + str(i)
    cur.execute(
        """INSERT INTO business_business ("license_num","name","dba_name","license_type","status","processed_date","start_date", \
            "expire_date","employee_num","company_type","business_type","property_type","address","zipcode") \
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
        (license_num, name, dba_name, license_type, status, processed_date,
         start_date, expired_date, employee_num, company_type, business_type,
         property_type, address, zipcode))

zipcode = "90815"
for i in range(0, 250):
    license_num = zipcode + "_DUMMY_" + str(i)
    name = zipcode + "_Dummy_Name_" + str(i)
    dba_name = zipcode + "_Dummy_DBA_Name_" + str(i)
    cur.execute(
        """INSERT INTO business_business ("license_num","name","dba_name","license_type","status","processed_date","start_date", \
            "expire_date","employee_num","company_type","business_type","property_type","address","zipcode") \
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
        (license_num, name, dba_name, license_type, status, processed_date,
         start_date, expired_date, employee_num, company_type, business_type,
         property_type, address, zipcode))

zipcode = "90831"
for i in range(0, 10):
    license_num = zipcode + "_DUMMY_" + str(i)
    name = zipcode + "_Dummy_Name_" + str(i)
    dba_name = zipcode + "_Dummy_DBA_Name_" + str(i)
    cur.execute(
        """INSERT INTO business_business ("license_num","name","dba_name","license_type","status","processed_date","start_date", \
            "expire_date","employee_num","company_type","business_type","property_type","address","zipcode") \
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
        (license_num, name, dba_name, license_type, status, processed_date,
         start_date, expired_date, employee_num, company_type, business_type,
         property_type, address, zipcode))

conn.commit()
