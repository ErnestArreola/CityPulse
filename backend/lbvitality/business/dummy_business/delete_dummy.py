import os
import django
import sys

sys.path.append('/'.join((os.path.dirname(os.path.abspath(__file__)) +
                          '').split('/')[0:-5]) +
                '/Vitality/backend/lbvitality')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lbvitality.settings')
django.setup()

from business.models import Business

zipcode = "90804"
for i in range(0, 200):
    license_num = zipcode + "_DUMMY_" + str(i)
    Business.objects.filter(license_num=license_num).delete()

zipcode = "90805"
for i in range(0, 400):
    license_num = zipcode + "_DUMMY_" + str(i)
    Business.objects.filter(license_num=license_num).delete()

zipcode = "90806"
for i in range(0, 200):
    license_num = zipcode + "_DUMMY_" + str(i)
    Business.objects.filter(license_num=license_num).delete()

zipcode = "90808"
for i in range(0, 400):
    license_num = zipcode + "_DUMMY_" + str(i)
    Business.objects.filter(license_num=license_num).delete()

zipcode = "90813"
for i in range(0, 200):
    license_num = zipcode + "_DUMMY_" + str(i)
    Business.objects.filter(license_num=license_num).delete()

zipcode = "90815"
for i in range(0, 250):
    license_num = zipcode + "_DUMMY_" + str(i)
    Business.objects.filter(license_num=license_num).delete()

zipcode = "90831"
for i in range(0, 10):
    license_num = zipcode + "_DUMMY_" + str(i)
    Business.objects.filter(license_num=license_num).delete()